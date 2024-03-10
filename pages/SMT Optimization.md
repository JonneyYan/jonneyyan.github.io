- # Background
- SMT is widely used in zkbnb project, is a data structure used for AccountTree, NftTree, AccountAssetTrees, according to this [test plan](https://docs.google.com/document/d/18HV8XjnEiqUuCrRp2GFVaUbaV7c1nLx5mvVbGJtsV-g/edit): for now, optimizing the part of the statedb submission SMT tree would be the most beneficial part.
- We will focus on MultiSet operation in zkbnb-smt, because in a multi set, we need to re-compute hashes of corresponding subtrees from bottom to top, therefore, this is a heavy operation, eg:
- In a 4 depth SMT, if we MultiSet leaves [0, 15], to get the latest root hash, hashes of yellow nodes and hashes of red nodes will be re-compute from bottom to top.
- ![Figure 1](https://confluence.toolsfdg.net/download/attachments/209220736/image-2022-11-7_12-58-58.png?version=1&modificationDate=1667797155000&api=v2)
- Figure 1-1
- # Known Issue
- Fortunately, we already have our MultiSet function being implemented, but there still issues:
- **May re-compute hash of a node multiple times**
- By the implementation:
- |
- `wg.Add(``1``)`
- `func(child *TreeNode) {`
- `    ``tree.goroutinePool.Submit(func() {`
- `        ``defer wg.Done()`
- `        ``for` `child != nil {`
  `            ``parentKey := journalKey{depth: child.depth - ``4``, path: child.path >> ``4``}`
- `            ``parent, exist := tmpJournal.get(parentKey)`
- `            ``if` `!exist {`
- `                ``// skip if the parent is not exist`
- `                ``return`
- `            ``}`
-
- `            ``// update child to parent node`
- `            ``parent.SetChildren(child, ``int``(child.path&``0x000000000000000f``), newVersion)`
- `            ``child = parent`
- `        ``}`
- `    ``})`
- `}(targetNode)`
- |
- As Figure 1-1, we can see if we multi set [0, 15], two target nodes [0, 15] will be submit to goroutine pool to re-compute hash from bottom to top of a whole tree, this will cause **two computation of root node.**
- Even worse, if multi set more keys in operation: Still in a 4-depth SMT, if we multi set [0,1,2,4,8], more duplicated computation will happen:
- root: 5 times;
- internal node 0: 4 times;
- internal node 2: 3 times;
- internal node 6: 2 times;
- And this is in a 4-depth SMT, the higher the tree, the more keys, the more repeated computations.
- ![](https://confluence.toolsfdg.net/download/attachments/209220736/image-2022-11-7_13-20-1.png?version=1&modificationDate=1667798419000&api=v2)
- Figure 1-2
- **May compute hash of a previous version of children**
- Since it's parallel computation of different target nodes, we don't know the execution order, let's say key 0 execute before key 1, when calc internal node 6, we need children 0 and 1, at the moment, we may get previous hash of child 1.
- It's parallel computation, but it do a lot repeated computations and imprecise computations.
- # Solution
- To get the latest root of SMT, we should start computation after all leaves node being set, once we have all latest leaves, our computation will be precise.
- Besides, parallel computation can be improved based on these observations:
- When compute internal node 6, we can compute internal node 7, 8, 10 simultaneously, because they don't have a close relationships.
- More macro view, let's say we have a higher SMT, 8-depth SMT:
- Since the physical implementation is a 16-ary tree, called treeNode, we can do parallel computations among treeNodes.
- **We can do these parallel computation by depth, in the same depth, all the hashes need to be computed can be computed in parallel, both among treeNodes and in a treeNode.**
- ![](https://confluence.toolsfdg.net/download/attachments/209220736/image-2022-11-7_13-50-44.png?version=1&modificationDate=1667800262000&api=v2)
- Figure 1-3
- Thus we have two major optimization can be done:
- Parallel computation among treeNodes from bottom to top
- Parallel computation in a treeNode from bottom to top
- **Key steps:**
- Set child without hash computations from bottom to top:
	- ```
	  if !exist {
	      // skip if the parent is not exist
	      return
	  }
	  parent.SetChildrenOnly(child, int(child.path&0x000000000000000f), newVersion)
	  ```
- Parallel compute hashes among treeNodes:
	- ```
	  for i := int(tree.maxDepth - 4); i >= 0; i -= 4 {
	      depthWg := sync.WaitGroup{}
	      depthWg.Add(len(depthInter[uint8(i)]))
	      for _, node := range depthInter[uint8(i)] {
	          func(n *TreeNode) {
	              _ = tree.goroutinePool.Submit(func() {
	                  defer depthWg.Done()
	                  n.computeInternal(targets.getNibbles(journalKey{
	                      depth: n.depth,
	                      path:  n.path,
	                  }), tree.goroutinePool)
	              })
	          }(node)
	      }
	      depthWg.Wait()
	  }
	  ```
- Parallel compute hashes in a treeNode:
	- ```
	  func (node *TreeNode) computeInternal(nibbles map[uint64]struct{}, pool *ants.Pool) {
	      if nibbles == nil {
	          return
	      }
	      node.mu.Lock()
	      defer node.mu.Unlock()
	      nbArray := make([]uint64, 0, len(nibbles))
	      for nibble := range nibbles {
	          nbArray = append(nbArray, nibble)
	      }
	      sort.Slice(nbArray, func(i, j int) bool { return nbArray[i] > nbArray[j] })
	   
	      prefix := 6
	      for i := 4; i >= 1; i >>= 1 {
	          wg := sync.WaitGroup{}
	          for _, n := range nbArray {
	              if int(n) >= prefix && int(n) <= prefix<<1+1 {
	                  wg.Add(1)
	                  func(ni uint64) {
	                      _ = pool.Submit(func() {
	                          defer wg.Done()
	                          left, right := node.childrenHash(ni)
	                          node.Internals[ni] = node.hasher.Hash(left, right)
	                      })
	                  }(n)
	              }
	          }
	          wg.Wait()
	          prefix = prefix - i
	      }
	   
	      // update current root node
	      node.newVersion(&VersionInfo{
	          Ver:  node.latestVersion(),
	          Hash: node.hasher.Hash(node.Internals[0], node.Internals[1]),
	      })
	  }
	  ```