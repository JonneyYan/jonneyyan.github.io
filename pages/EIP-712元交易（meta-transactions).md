tags:: EIP 签名

- EIP-712 的主要目标是提供一种更加结构化和安全的方式进行消息签名和验证。在以太坊中，通常使用`eth_sign` 方法签名消息，但这种方法会导致安全问题（例如签名重放）。EIP-712 提供了一种标准的消息结构， [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/EIP712.sol) 提供了一个标准的实现，对应metamask v4，其中签名消息的结构如下：
	- "\x19\x01" ‖ domainSeparator ‖ hashStruct(message), 总共0x42 bytes = 2 + 32 +32
		- `\x19\x01` 表明
		  logseq.order-list-type:: number
		- 域分隔符（Domain Separator）
		  logseq.order-list-type:: number
			- `keccak256(abi.encode(TYPE_HASH, _hashedName, _hashedVersion, block.chainid, address(this)));`
			  logseq.order-list-type:: number
		- 哈希之后的结构化数据
		  logseq.order-list-type:: number
	- 案例
		- ```solidity
		  /*********************/ 合约部分
		  // 定义结构化数据的 type hash
		  bytes32 constant public ORDER_TYPEHASH = keccak256(
		      "Order(address trader,uint8 side,address matchingPolicy,address collection,uint256 tokenId,uint256 amount,address paymentToken,uint256 price,uint256 listingTime,uint256 expirationTime,Fee[] fees,uint256 salt,bytes extraParams,uint256 nonce)Fee(uint16 rate,address recipient)"
		  );
		  
		  // 对订单结构体进行哈希
		  function _hashOrder(Order calldata order, uint256 nonce)
		      internal
		      pure
		      returns (bytes32)
		  {
		      return keccak256(
		          bytes.concat(
		              abi.encode(
		                    ORDER_TYPEHASH,
		                    order.trader,
		                    order.side,
		                    order.matchingPolicy,
		                    order.collection,
		                    order.tokenId,
		                    order.amount,
		                    order.paymentToken,
		                    order.price,
		                    order.listingTime,
		                    order.expirationTime,
		                    _packFees(order.fees),
		                    order.salt,
		                    keccak256(order.extraParams)
		              ),
		              abi.encode(nonce)
		          )
		      );
		  }
		  
		  // 验证签名
		  // 首先hash订单
		  bytes32 digest = _hashOrder(sell.order, nonces[sell.order.trader]);
		  // 验证签名
		  address signer = ECDSA.recover(digest, signature);
		  
		  /********前端部分**************/
		  // 定义数据类型
		  const domain = [
		      { name: "name", type: "string" },
		      { name: "version", type: "string" },
		      { name: "chainId", type: "uint256" },
		      { name: "verifyingContract", type: "address" },
		      { name: "salt", type: "bytes32" },
		  ];
		  const bid = [
		      { name: "amount", type: "uint256" },
		      { name: "bidder", type: "Identity" },
		  ];
		  const identity = [
		      { name: "userId", type: "uint256" },
		      { name: "wallet", type: "address" },
		  ];
		  // 定义分隔符和签名数据
		  const domainData = {
		      name: "Auction dApp",
		      version: "2",
		      chainId: parseInt(web3.version.network, 10),
		      verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070",
		      salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558"
		  };
		  var message = {
		      amount: 100,
		      bidder: {
		          userId: 323,
		          wallet: "0x3333333333333333333333333333333333333333"
		      }
		  };
		  // 组合成签名参数
		  const msgParams = JSON.stringify({
		      types: {
		          EIP712Domain: domain,
		          Bid: bid,
		          Identity: identity,
		      },
		      domain: domainData,
		      primaryType: "Bid",
		      message: message
		  });
		  
		  
		  // 在前端调起 eth_signTypedData_v4
		   const sign = await provider.request({
		      method: 'eth_signTypedData_v4',
		      params: [from, JSON.stringify(msgParams)],
		    });
		  
		  ```
-
-