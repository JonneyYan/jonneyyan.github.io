icon:: ⛓

- # Basic
	- ## 定义
		- 一种**分布式**的、**去中心化**的数字**分类账本**技术，通过使用密码学方法确保数据的安全性和完整性
			- 分布式：P2P 网络
			- 去中心化：没有中央机构控制，由网络中的多个节点通过共识机制共同维护和验证
			- 存储：数据块通过密码学的哈希函数组成的链式结构
	- ## 应用
		- 数字货币和支付
		- 智能合约
		- 供应链管理
		- 区块链身份验证
		- 社区治理
	- ## 如何工作？
		- P2P网络
		- 数据结构：Blockchain
		- EVM：[[以太坊原理详解]]
		- 共识机制：[[共识机制和协议汇总]]
- # Smart Contract
	- Solidity
		- #Solidity常见问题集
		- #[[Solidity By Example]]
		- #Solidity语法
		- #Memory
		- #storage
		- #[[calldata]]
	- Move
		- Sui Move
			- #[[How Sui Move differs from Core Move]]
	- Rust
	- Go
		- geth
		- crypto
	- 安全工具
		- [Ackee-Blockchain/wake: Wake is a Python-based Solidity development and testing framework with built-in vulnerability detectors (github.com)](https://github.com/Ackee-Blockchain/wake)
		- Slither
		- Mythril
		- Securify
- # dApps
	- ## 业务场景
		- ### DeFi
			- 稳定币和去中心化储蓄
				- MakerDao
			- 借贷
				- Compound
				- Aave
				- dYdX
				- LoanScan (聚合器)
			- 交易
				- [[Uniswap 原理]]
				- Curve
			- 预测市场
				- Augur
			- 合成资产
				- Synthetix
		- ### NFTs
			- Marketplace
				- OpenSea
				- OpenSea Pro
				- Blur
				- Looksrare
				- Exchange protocols
					- Seaport
					- BlurExchange
			- NFTFi
				- Load
					- Paraspace
					- BendDAO
					- Blend
				- Staking
					- Sanbox
					- Ape Staking
			- Project
				- BAYC
				- Azuki
			- Protocol
				- #[[NFT 协议栈]]
		- ### DAOs
		-
	- ## 开发
		- ### Go
			- geth
		- ### TheGraph
	- ## 测试
		- ### 测试金字塔
			- ![image.png](../assets/image_1711096701348_0.png){:height 170, :width 268}
			- #### Uint Test
				- [sol-coverage](https://www.npmjs.com/package/@0x/sol-coverage)
			- #### Integration Test
			- #### End-to-End Test
				- [Make the tests feel the user's pain - E2E testing for DApps · Devcon Archive: Ethereum Developer Conference](https://archive.devcon.org/archive/watch/5/make-the-tests-feel-the-users-pain-e2e-testing-for-dapps/?tab=YouTube)
				- [Puppeteer | Puppeteer (pptr.dev)](https://pptr.dev/)
				- [MetaMask/test-dapp: The sample dapp used for e2e testing and metamask-extension QA (github.com)](https://github.com/MetaMask/test-dapp)
		- ### 相关工具
			- [[水龙头]]
	- ## 运维
		- ### 节点及服务
			- Alchemy
			- Infura
			- Quicnode
			- Cosmos
	- ## 架构
		- TODO 梳理架构
			- [The Architecture of a Web 3.0 application (preethikasireddy.com)](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application)
			- [Blockchain Development Lecture 6: Dapp Architecture (youtube.com)](https://www.youtube.com/watch?v=KBSq8-LnUDI&t=286s)
	- ## 安全
		- 数据隐私
			- 任何人都可以访问合约中的状态，即使声明为 private 的状态变量。为了在隐私需要保护的场景下，可以使用 commit-reveal 模式，或者零知识证明，详见[[dApp 隐私保护]]
		- 随机数
		- Gas 限制
		- 自动异常检测
- # Layer 2 & Bridge
	- ## 状态通道
	- ## Optimistic Rollups
	- ## Zero Knowledge Proof
	- ## Bridge
- # 去中心化存储
	- [[什么是去中心化存储？]]
	- IPFS
	- Arweave
- # 密码学
	- [[《图解密码技术-第三版》]]
-