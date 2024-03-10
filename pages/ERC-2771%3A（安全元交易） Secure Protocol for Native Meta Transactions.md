tags:: ERC,EIP

- 允许第三方支付 Gas fee 并发起元交易
- 组成：
	- **Transaction Signer**： 交易签名者，可以签名并离线发送交易给 Gas Relay
	- **Gas Relay**：接收离线交易，并发送交易给可信的 Forwarder
	- **Forwarder**：受 Recipient 信任的合约，负责验证签名和 nonce
	- **Recipient**：接收元交易的合约
- Flow
	- ![](https://eips.ethereum.org/assets/eip-2771/example-flow.png){:height 462, :width 748}
- Recipient 实现
	- ```solidity
	  contract RecipientExample {
	  
	      function purchaseItem(uint256 itemId) external {
	          address sender = _msgSender();
	          // ... perform the purchase for sender
	      }
	  
	      address immutable _trustedForwarder;
	      constructor(address trustedForwarder) internal {
	          _trustedForwarder = trustedForwarder;
	      }
	      // Recipient 应该支持 Forwarder 的发现机制
	      function isTrustedForwarder(address forwarder) public returns(bool) {
	          return forwarder == _trustedForwarder;
	      }
	  
	  	// 恶意的转发者可以伪造_msgSender()的值，并可以从任何地址发送交易。
	      // 因此，收件人合同在信任转发者时必须非常小心。
	      // 如果一个 Forwarder 是可升级的，那么必须确保合约不会进行恶意的升级。
	      // * 此处是为了从 data 里获得原始的 sender，而不是 Forwarder
	      function _msgSender() internal view returns (address payable signer) {
	          signer = msg.sender;
	          if (msg.data.length>=20 && isTrustedForwarder(signer)) {
	              assembly {
	                  signer := shr(96,calldataload(sub(calldatasize(),20)))
	              }
	          }    
	      }
	  
	  }
	  ```
	-