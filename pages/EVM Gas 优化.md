- 权衡：复杂性和可读性
- # Runtime
	- ## 存储
		- 避免0 到 1 的存储写入
		  collapsed:: true
			- 变量从零值变为非零时，消耗 22,100 Gas，而从非零变为零 也需要 20,000。但是非零值修改只需要 5000gas。 所以当一个变量用于表示bool 值时，可以用 1 和2代替，例如 Openzeppelin 的重入合约
			  collapsed:: true
				- ```solidity
				  abstract contract ReentrancyGuard {
				     
				      uint256 private constant NOT_ENTERED = 1;
				      uint256 private constant ENTERED = 2;
				  
				      uint256 private _status;
				  
				      /**
				       * @dev Unauthorized reentrant call.
				       */
				      error ReentrancyGuardReentrantCall();
				  
				      constructor() {
				          _status = NOT_ENTERED;
				      }
				    }
				  ```
			- ⚠️如果一个合约会大批量清空一个 ERC20 账户余额，应该保留少量的余额，避免 0 1写入
		- 缓存存储变量：只写入和读取存储变量一次
		  collapsed:: true
			- ```
			  // bad 读取2次
			  require(number < 10);
			  number = number + 1;
			  
			  // good 读取一次，虽然会多一个 memory，但是开销很小
			  uint256 _number = number;
			  require(_number < 10);
			  number = _number + 1;
			  
			  ```
		- 存储插槽合并或打包
		  collapsed:: true
			- 打包相关变量
				- 人工打包：效率高
					- 存储：`packedVariables = uint160(x) << 80 | uint160(y);`
					- 读取：`uint80 x = uint80(packedVariables >> 80);`
				- EVM 打包：编译器内部打包，稍微高一点
					- ```
					  uint80 public var1;
					  uint80 public var2;
					  ```
			- 打包结构体
				- ```
				   struct packedStruct {
				      uint64 time; // In this case, both `time` (64 bits) and `person` (160 bits) are packed in the same slot since they can both fit into 256 bits (32 bytes)
				      address person; // Same slot as `time`. Together they occupy 224 bits (28 bytes) out of 256 bits (32 bytes).
				      uint256 money; // This will take a new slot because it is a complete 256 bits (32 bytes) value and thus cannot be packed with the previous value.
				  }
				  ```
		- 字符串尽量小于 30 bytes
		  collapsed:: true
			- 在 Solidity 中，字符串是可变长的动态类型，
				- 如果字符串长度超过 32bytes，则插槽布局为 1个保存长度，其他 len * 2 个插槽保存 hex 后的字符串
				- 如果不超过 30bytes，则只需要一个插槽，如下所示
				- ```
				  "This is a string that is slightly over 32 bytes! This is a string that is slightly over 32 bytes!!";
				  
				  0x00000 -> c5(字符串长度 * 2)
				  0x(hex"hello")1 -> 第1段
				  0x(hex"hello")2 -> 第2段
				  0x(hex"hello")3 -> 第3段
				  0x(hex"hello")4 -> 第4段
				  
				  "hello"
				  0x0000 -> 68656c6c6f(hex"hello")00000000000000000000000000000000000000000000000000000a(长度)
				  ```
		- 不可变的变量，尽量用 constant ，保存在字节码，immutable 会保存 storage
	- ## 变量类型的选择
		- blockNumber 和timestamp 只需要 uint48 就能存储，不需要 uint256
		- 如果是固定长度或者特定顺序的列表，使用 mapping  可以减少每次读取 2000 gas，因为数组会增加检查索引溢出的字节码
		- 或者使用 OZ 的 Arrays.sol 库 的unsafeAccess 方法，通过汇编直接读取给定 index 的值
		- 如果才保存大量的bool 值，可以用位图的方式，一个插槽可以存储 256 个bool，例如空投
		- 用合约存储数据 CodeAsStorage
			- [SSTORE2](https://github.com/Vectorized/solady/blob/main/src/utils/SSTORE2.sol)：
			- [SSTORE3](https://twitter.com/real_philogy/status/1677811731962245120)：
		- 直接使用 storage 而不是 memory，操作 array 都时候需要注意[悬空指针](https://docs.soliditylang.org/en/v0.8.21/types.html#dangling-references-%20to-storage-array-elements)问题
		  collapsed:: true
			- ```
			  User memory _user = users[_id]; // 会多几个 SLOAD 和 MSTORE
			  User storage _user = users[_id];  // 直接 SLOAD 到堆栈，减少创建内存的过程
			  
			  悬空指针：
			  如果通过 storage 获取array的某个成员后，如果对 array 删除这个成员，这个成员的引用就是悬空都，此时会影响整个数组
			  function f() public {
			      // Stores a pointer to the last array element of s.
			      uint[] storage ptr = s[s.length - 1];
			      // Removes the last array element of s.
			      s.pop();
			      // Writes to the array element that is no longer within the array.
			      ptr.push(0x42);
			      // Adding a new element to ``s`` now will not add an empty array, but
			      // will result in an array of length 1 with ``0x42`` as element.
			      s.push();
			      assert(s[s.length - 1][0] == 0x42);
			  }
			  ```
			-
			-
	- ## 合约调用
		- 使用 access list ，一次支付 2600 gas，预热插槽，获得200gas 的节省，使用于批量提现
		- 如何用户需要进行一系列合约调用，可以使用 multicall 进行批处理
- # Deployment
	- 部署多个相似合约，可以使用 clone 或者 元代理实现
	- error 比 require 节省gas
- # Design Pattern
	- ECDSA 签名替代 Merkle tree 进行白名单和空投校验
	- ERC20Permit
	- UUPS 比 透明代理更节省 gas
	- 使用 [Solmate](https://github.com/transmissions11/solmate) 和 [Solady](https://github.com/Vectorized/solady).
- # Calldata  编码
	- calldata 中，0字节收取4gas 非0 收取16gas，所以尽可能使用 0
	- 使用前导零的合约地址，通过 create2 实现
	- 尽可能避免使用有符号整数，因为 solidity 使用二进制补码实现有符合整数，如 -1 是 0xfff...fff
	- calldata比 memory 便宜
- # 内联汇编
- # 编译器
	- 在非变量打包的情况下，整数最好用 uint256，转换过程会增加 gas 成本
	- 短路布尔值