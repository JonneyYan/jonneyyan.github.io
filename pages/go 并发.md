### atomic.Value
	- 是 标准库 `sync/atomic` 中的一个数据结构，用户实现在并发环境下，确保多个 goroutine 能安全的访问和修改一个值
	- 主要方法
		- Load()
		- Store(interface{})
		- Swap(interface{}) 存储新值，返回旧值
	- 案例
	  collapsed:: true
		- ```go
		  package main
		  
		  import (
		      "errors"
		      "fmt"
		      "sync"
		      "sync/atomic"
		  )
		  
		  func main() {
		      var threadSafeError atomic.Value
		  
		      // 启动多个 goroutine
		      var wg sync.WaitGroup
		      for i := 0; i < 5; i++ {
		          wg.Add(1)
		          go func() {
		              defer wg.Done()
		              
		              // 模拟一些工作
		              // ...
		              
		              // 存储错误到 threadSafeError
		              err := errors.New("example error")
		              threadSafeError.Store(err)
		          }()
		      }
		  
		      // 等待所有 goroutine 完成
		      wg.Wait()
		  
		      // 获取存储在 threadSafeError 中的错误
		      loadedError := threadSafeError.Load()
		      if loadedError != nil {
		          fmt.Println("Loaded error:", loadedError.(error).Error())
		      } else {
		          fmt.Println("No error loaded.")
		      }
		  }
		  
		  ```
- ### sync.Mutex
	- 互斥锁，共享资源互斥访问，确保只有一个 goroutine 能访问共享资源，避免`竞态条件` 和`数据竞争`.是 Go 中常用的同步原语之一，但是需要谨慎使用，避免死锁
	- 主要方法
		- Lock()
		- Unlock()
	-
-