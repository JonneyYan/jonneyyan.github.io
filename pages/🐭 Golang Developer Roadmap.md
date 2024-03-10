# 语言
	- 特性
		- 简洁而清晰的语法
		- 并发支持
		- 编译型语言
		- 静态类型
		- 内建工具和标准库
		- 交叉编译
		- 简单的依赖管理
		- 面向接口编程
	- 基础语法
		- 数据类型
			- 基础类型
				- 整型：int8/int16/int32(uint...)
				- 浮点数：float32
				- 字符串：不可修改，赋值时会创建内存区域
				- 常量：const、iota
			- 复合类型
				- 数组：长度是固定的，通常使用 slice
				- 切片：变长的数组，append(slice, item)
				- Map：map [K] V，delete(map, "key")
					- ⚠️ 禁止对 map 元素取址（&），因为map 会随着元素数量的增长分配更大的空间，从而导致之前的地址无效
				- 结构体
					- 可以对成员取址
					- 嵌入
					- 匿名成员（继承）
				- JSON
					- tag：name 、 omitempty
			- make
				- 只能用于创建 slices、map、channel，返回非零值的类型（不是指针）
				- ```go
				  // make(T, args)
				  make([]int, 10, 100)  // make([]T), length, capacity)
				  
				  // new 会返回指针，make 会返回结构体
				  make(map[string]int)
				  
				  make(chan string, 3)
				  
				  ```
			- new
				- 用于创建指针
		- 函数
			- 可变参数
				- ```go
				  func sum(vals ...int) int {}
				  ```
			- Deferred：经常被用于处理成对的操作，如打开、关闭、连接、断开连接、加锁、释放锁
			- painc
				- 立即执行该线程下（或者 goroutine）的 defer 函数，程序崩溃，并输出日志
				- 一般用在程序错误
			- recover
				- 用于恢复 panic
			- 泛型
				- golang v1.18发布
				- 基本特性
					- 类型参数：
						- ```go
						  func MyFunc[T any](a T) {}
						  ```
					- 约束
						- ```go
						  // T类型的约束被设置成 int | float32 | float64
						  func Add[T int | float32 | float64](a, b T) T {
						      return a + b
						  }
						  // 定义类型集 
						  type number interface {
						      int | int32 | uint32 | int64 | uint64 | float32 | float64
						  }
						  
						  // 约束T可为number类型集中的任一元素
						  func add[T number](a, b T) T {
						      return a + b
						  }
						  
						  // * 近似约束元素
						  type AnyStatus interface{ ~int32 }
						  
						  ```
						- 预定义约束 `any` `comparable`
					- 泛型函数
						- 匿名函数不支持泛型
							- 泛型是在编译时实现的，匿名函数在编译时无法得知类型，所以匿名函数不支持泛型
					- 泛型类型
						- ```go
						  // 先定义个泛型类型 Slice[T]
						  type Slice[T int|string|float32|float64] []T
						  
						  // ✗ 错误。泛型类型Slice[T]的类型约束中不包含uint, uint8
						  type UintSlice[T uint|uint8] Slice[T]  
						  
						  // ✓ 正确。基于泛型类型Slice[T]定义的新泛型类型 IntAndStringSlice[T]
						  type IntAndStringSlice[T int|string] Slice[T]  
						  // ✓ 正确 基于IntAndStringSlice[T]套娃定义出的新泛型类型
						  type IntSlice[T int] IntAndStringSlice[T] 
						  ```
		- 方法
			- 函数名称前放一个变量，即是方法。
				- ```go
				  // 会进行参数拷贝，类似于 Distance(p, q);
				  func (p Point) Distance(q Point) float64 {
				      return math.Hypot(q.X-p.X, q.Y-p.Y)
				  }
				  // 如果接收器是指针，可以避免方法调用时的参数拷贝
				  func (p *Point) ScaleBy(factor float64) {
				      p.X *= factor
				      p.Y *= factor
				  }
				  ```
			- 方法值：可以将方法绑定到一个变量，相当于匿名函数
				- ```go
				  distanceFromP := p.Distance        // method value
				  fmt.Println(distanceFromP(q))   
				  ```
			- 方法表达式
				- ```
				  distance := Point.Distance   // method expression
				  fmt.Println(distance(p, q))  // "5"
				  ```
		- 接口
			- 对其他类型行为的抽象和概括
				- 接口声明、内嵌、组合
				- ```go
				  type Reader interface {
				      Read(p []byte) (n int, err error)
				  }
				  type ReadWriter interface {
				      Reader
				      Writer
				  }
				  ```
		- Goroutines
	-
- # RPC
	- 远程过程调用的简称，是分布式系统中节点之间的通讯方式
	- Protobuf
	  collapsed:: true
		- Protocol Buffers，Google开发的数据描述语言
		- 例子
			- ```proto
			  syntax = "proto3";
			  
			  message SearchRequest {
			    string query = 1;
			    int32 page_number = 2;
			    int32 results_per_page = 3;
			  }
			  ```
		- 字段类型
			- 标量（Scalas）
			  collapsed:: true
				- | .proto Type | Notes | C++ Type | Java/Kotlin Type[1] | Python Type[3] | Go Type | Ruby Type | C# Type | PHP Type | Dart Type |
				  | double |  | double | double | float | float64 | Float | double | float | double |
				  | float |  | float | float | float | float32 | Float | float | float | double |
				  | int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int |
				  | int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long[4] | int64 | Bignum | long | integer/string[6] | Int64 |
				  | uint32 | Uses variable-length encoding. | uint32 | int[2] | int/long[4] | uint32 | Fixnum or Bignum (as required) | uint | integer | int |
				  | uint64 | Uses variable-length encoding. | uint64 | long[2] | int/long[4] | uint64 | Bignum | ulong | integer/string[6] | Int64 |
				  | sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int |
				  | sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long[4] | int64 | Bignum | long | integer/string[6] | Int64 |
				  | fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 228. | uint32 | int[2] | int/long[4] | uint32 | Fixnum or Bignum (as required) | uint | integer | int |
				  | fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 256. | uint64 | long[2] | int/long[4] | uint64 | Bignum | ulong | integer/string[6] | Int64 |
				  | sfixed32 | Always four bytes. | int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int |
				  | sfixed64 | Always eight bytes. | int64 | long | int/long[4] | int64 | Bignum | long | integer/string[6] | Int64 |
				  | bool |  | bool | boolean | bool | bool | TrueClass/FalseClass | bool | boolean | bool |
				  | string | A string must always contain UTF-8 encoded or 7-bit ASCII text, and cannot be longer than 232. | string | String | str/unicode[5] | string | String (UTF-8) | string | string | String |
				  | bytes | May contain any arbitrary sequence of bytes no longer than 232. | string | ByteString | str (Python 2)
				  bytes (Python 3) | []byte | String (ASCII-8BIT) | ByteString | string |
			- 枚举
			  collapsed:: true
				- ```proto
				  enum Corpus {
				    CORPUS_UNSPECIFIED = 0;
				    CORPUS_UNIVERSAL = 1;
				    CORPUS_WEB = 2;
				    CORPUS_IMAGES = 3;
				    CORPUS_LOCAL = 4;
				    CORPUS_NEWS = 5;
				    CORPUS_PRODUCTS = 6;
				    CORPUS_VIDEO = 7;
				  }
				  
				  message SearchRequest {
				    string query = 1;
				    int32 page_number = 2;
				    int32 results_per_page = 3;
				    Corpus corpus = 4;
				  }
				  ```
		- 字段号
			- 每个字段都需要定义一个字段号，范围在[1,536879991]，但是有如下限制
				- 字段号必须唯一
				- 19000 - 19999 是协议保留字段，不能使用
				- 不能重复使用字段号，
		- 字段标签
			- optional
			- repeated： 字段可以重复，将会与数组的形式序列化消息
			- map：同map
- 错误处理
	-