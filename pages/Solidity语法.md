# 错误处理
	- [Custom Errors in Solidity | Solidity Programming Language (soliditylang.org)](https://soliditylang.org/blog/2021/04/21/custom-errors/)
	- [Expressions and Control Structures — Solidity 0.8.22 documentation (soliditylang.org)](https://docs.soliditylang.org/en/latest/control-structures.html#revert-statement)
	- require 可以加 string 的错误消息
	- revert("") 直接加错误消息
	- revert + error
		- v0.8.4 新增自定义错误（CustomErrors）支持错误参数
		- ```sodliity
		  error Unauthorized();
		  error InsufficientBalance(uint256 available, uint256 required);
		  
		  revert Unauthorized();
		  ```
		- 深入研究
			- ```solidity
			  revert Unauthorized()
			  // 上面语句的汇编代码如下
			  let free_mem_ptr := mload(64)
			  mstore(free_mem_ptr, 0x82b4290000000000000000000000000000000000000000000000000000000000)
			  revert(free_mem_ptr, 4)
			  // 0x82b429 对应的就是 Unauthorized() 的选择器
			  
			  revert("Unauthorized");
			  // 上面语句的汇编代码如下
			  let free_mem_ptr := mload(64)
			  mstore(free_mem_ptr, 0x08c379a000000000000000000000000000000000000000000000000000000000)
			  mstore(add(free_mem_ptr, 4), 32)
			  mstore(add(free_mem_ptr, 36), 12)
			  mstore(add(free_mem_ptr, 68), "Unauthorized")
			  revert(free_mem_ptr, 100)
			  
			  ```