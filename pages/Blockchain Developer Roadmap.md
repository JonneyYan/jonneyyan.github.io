icon:: ⛓

- # Basic
  collapsed:: true
	- ## 定义
	  collapsed:: true
		- 一种**分布式**的、**去中心化**的数字**分类账本**技术，通过使用密码学方法确保数据的安全性和完整性
		  collapsed:: true
			- 分布式：P2P 网络
			- 去中心化：没有中央机构控制，由网络中的多个节点通过共识机制共同维护和验证
			- 存储：数据块通过密码学的哈希函数组成的链式结构
	- ## 应用
	  collapsed:: true
		- 数字货币和支付
		- 智能合约
		- 供应链管理
		- 区块链身份验证
		- 社区治理
	- ## 如何工作？
	  collapsed:: true
		- P2P网络
		- 数据结构：Blockchain
		- EVM：[[以太坊原理详解]]
		- 共识机制：[[共识机制和协议汇总]]
- # Smart Contract
  collapsed:: true
	- Solidity
	  collapsed:: true
		- #Solidity常见问题集
		- #[[Solidity Tips 集]]
		- #Solidity语法
		- #Memory
		- #storage
		- #[[calldata]]
	- Move
	  collapsed:: true
		- Sui Move
		  collapsed:: true
			- #[[How Sui Move differs from Core Move]]
	- Rust
	- Go
	  collapsed:: true
		- geth
		- crypto
- # dApps
	- ## 业务场景
		- ### DeFi
		- ### NFTs
		- ### DAOs
		-
	- ## 开发
	  collapsed:: true
		- ### Go
		  collapsed:: true
			- geth
		- ### TheGraph
	- ## 测试
	  collapsed:: true
		- ### 测试金字塔
		  collapsed:: true
			- ![image.png](../assets/image_1711096701348_0.png){:height 170, :width 268}
			- #### Uint Test
			  collapsed:: true
				- [sol-coverage](https://www.npmjs.com/package/@0x/sol-coverage)
			- #### Integration Test
			- #### End-to-End Test
			  collapsed:: true
				- [Make the tests feel the user's pain - E2E testing for DApps · Devcon Archive: Ethereum Developer Conference](https://archive.devcon.org/archive/watch/5/make-the-tests-feel-the-users-pain-e2e-testing-for-dapps/?tab=YouTube)
				- [Puppeteer | Puppeteer (pptr.dev)](https://pptr.dev/)
				- [MetaMask/test-dapp: The sample dapp used for e2e testing and metamask-extension QA (github.com)](https://github.com/MetaMask/test-dapp)
		- ### 相关工具
		  collapsed:: true
			- [[水龙头]]
	- ## 运维
	  collapsed:: true
		- ### 节点及服务
		  collapsed:: true
			- Alchemy
			- Infura
			- Quicnode
			- Cosmos
	- ## 架构
	  collapsed:: true
		- TODO 梳理架构
		  collapsed:: true
			- [The Architecture of a Web 3.0 application (preethikasireddy.com)](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application)
			- [Blockchain Development Lecture 6: Dapp Architecture (youtube.com)](https://www.youtube.com/watch?v=KBSq8-LnUDI&t=286s)
	- ## 安全
	  collapsed:: true
		- 数据隐私
		  collapsed:: true
			- 任何人都可以访问合约中的状态，即使声明为 private 的状态变量。为了在隐私需要保护的场景下，可以使用 commit-reveal 模式，或者零知识证明，详见[[dApp 隐私保护]]
		- 随机数
		- Gas 限制
		- 自动异常检测
- # Layer 2 & Bridge
  collapsed:: true
	- ## 状态通道
	- ## Optimistic Rollups
	- ## Zero Knowledge Proof
	- ## Bridge
- # 去中心化存储
  collapsed:: true
	- [[什么是去中心化存储？]]
	- IPFS
	- Arweave
- # 密码学
  collapsed:: true
	- [[《图解密码技术-第三版》]]
- Defi
	- 稳定币和去中心化储蓄
	  collapsed:: true
		- MakerDao
	- 借贷
	  collapsed:: true
		- Compound
		- Aave
		- dYdX
		- LoanScan (聚合器)
	- 交易
	  collapsed:: true
		- [[Uniswap 原理]]
		- Curve
	- 预测市场
	  collapsed:: true
		- Augur
	- 合成资产
	  collapsed:: true
		- Synthetix
- NFT
  collapsed:: true
	- Marketplace
	  collapsed:: true
		- OpenSea
		- OpenSea Pro
		- Blur
		- Looksrare
		- Exchange protocols
		  collapsed:: true
			- Seaport
			- BlurExchange
	- NFTFi
	  collapsed:: true
		- Load
		  collapsed:: true
			- Paraspace
			- BendDAO
			- Blend
		- Staking
		  collapsed:: true
			- Sanbox
			- Ape Staking
	- Project
	  collapsed:: true
		- BAYC
		- Azuki
	- Protocol
	  collapsed:: true
		- #[[NFT 协议栈]]
- DAO
- ZK
- Security
  collapsed:: true
	- #区块链安全集
	- Tools
	  collapsed:: true
		- Slither
		- Mythril
		- Securify
- FE
  collapsed:: true
	- framework
	  collapsed:: true
		- 基础库
		  collapsed:: true
			- ethersjs
			- web3js
		- 全能
		  collapsed:: true
			- [viem · TypeScript Interface for Ethereum](https://viem.sh/)
	- Wallet Connector
	  collapsed:: true
		- [RainbowKit](https://www.rainbowkit.com/zh-CN)
		-
- BE
  collapsed:: true
	- geth
- Read
  collapsed:: true
	- #[[How to DeFi]]
- 工具
  collapsed:: true
	- solidity 静态分析工具
	  collapsed:: true
		- [Ackee-Blockchain/wake: Wake is a Python-based Solidity development and testing framework with built-in vulnerability detectors (github.com)](https://github.com/Ackee-Blockchain/wake)
		-