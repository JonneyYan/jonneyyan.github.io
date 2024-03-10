# 钱包分类
	- **EOA 钱包：**创建私钥时自带的账户，具有发起交易、签名、支付 gas 等基础功能，是加密账户最基本的构成元素，目前以太坊的交易必须由外部账户发起
	  collapsed:: true
		- 优点：易于生成
		- 缺点：
			- **必须**保存好助记词，而且功能有限；
			- 对普通用户不友好，
			- ![钱包分类](https://macinorg-blog.oss-cn-chengdu.aliyuncs.com/blog/FhluMJMaAAAF5th.png)
	- **智能合约钱包**：由智能合约地址作为账户地址，同时利用智能合约的可编程性，实现比 EOA 账户更加复杂的业务逻辑，如多签、一次执行多笔交易等；智能合约账户无法主动发起交易、签名、支付 gas 等操作，需要用 EOA 账户来控制合约账户，实现交易和签名等功能
	  collapsed:: true
		- 优点：功能丰富，多签、批量交易、权限细化、离线授权
		- 缺点：无法主动发起交易（or 签名）、无法支付 gas fee
		- ![Image credit: CoinDesk](https://alphasec.io/content/images/2022/04/Coindesk-multisig.png)
	- ⚠️ 上面两种钱包自身存在诸多不足，如新用户进入门槛太高、无法满足用户精细化需求等问题，因此行业内出现了两个针对现有钱包的优化方向
	- **账户抽象 **
		- 目标是把账户的签名权和所有权解耦，让合约账户和 EOA 账户的组合更具灵活性，实现gas代付、权限可编程等功能
		- [Ethereum ERC-4337 'smart accounts' launch at WalletCon: Account abstraction is here (cointelegraph.com)](https://cointelegraph.com/news/ethereum-erc-4337-smart-accounts-launch-at-walletcon-account-abstraction-is-here)
		- [账户抽象(Account Abstraction)完整指南_MarsBit](https://news.marsbit.co/20230302172702633640.html)
		- [长文深度解读「账户抽象」：7 年路线演化及赛道图谱_MarsBit](https://news.marsbit.co/20230110181532270322.html)
		- [以太坊账户抽象万字研报：拆解 10 个相关 EIP 提案与冲击千万级日活用户瓶颈的七年之路 - FreeBuf网络安全行业门户](https://www.freebuf.com/articles/blockchain-articles/349962.html)
	- MPC 钱包
- # MPC 钱包
	- ## 多方计算 multi-party computation
		- 起源于 1982 年姚期智的百万富翁问题。
			- **两个百万富翁在街头邂逅，**他们都想比比看谁更有钱。但是出于隐私，谁都不想让对方知道自己到底拥有多少财富。在不借助第三方的情况下，如何得出谁的财富更多呢**？**
		- MPC 技术能够在不泄露数据的情况下，联合多方数据进行计算并得到明文结果，最终实现数据的所有权和数据使用权的分离。在此之后，该领域出现了一系列基础结果，**用来解决分布式计算问题**，同时保证**输入信息的隐私性和安全性。**
	- ## 多方计算是如何工作的？
		- 假设某公司的 A、B、C 三位员工想计算一下他们的平均工资，但在这个过程中，**每个人都不想让其他员工知道自己的薪资信息**。
		- 把每个人的工资随机分成3份，然后**秘密分享**给另外两个人
		- || Employee A | Employee B | Employee C | private information |
		  || 20k | 30k | 50k |  The salary of A is 100k |
		  || 150k | 50k | 0k | The salary of B is 200k |
		  || -100k | 250k | 150k | The salary of C is 300k|
		  |sum|70k|330k|200k||
		- 600k / 3 = 200k
	- ## 多方计算的应用（数字资产领域）
	  collapsed:: true
		- Wallet
			- 门限签名（Threshold Signature Scheme ）
		- [[DVT]] 分布式验证技术
			- 允许以太坊 PoS 验证器在多个节点或机器进行，从而验证者可以在多个节点进行投票，不单单局限于一个节点。
	- ## 门限签名
	  collapsed:: true
		- 完成一个签名，需要经历哪些流程？
			- 生成公私钥：生成公私钥对。私钥用于签名，公钥用于验签
			- 签名：输入为私钥和消息，输出为 signature
			- 验证签名：输入为公钥、消息和 signature，输出为 True/False
		- ### MultiSig 多签
		  collapsed:: true
			- 通过增加锁的数量来增加金库的安全性，并将多个钥匙分发给多方
			- 优点：如果密钥分配得当，有很高的安全性
			- 缺点：有较高的 gas，缺少隐私性，不通用
			- ![](https://miro.medium.com/v2/resize:fit:1400/0*YQsFWkOPZmCWzcPV.png){:height 274, :width 685}
		- ### Secret Sharing Scheme
			- 将钥匙碎片化分发给多方
			- 优点：与普通交易类似的费用、隐私和通用支持，当不使用时，密钥碎片存在不同地方，安全性高
			- 缺点：当创建或使用时，key 会以完整形式展现，从而可从单一位置窃取完整的 key
			- ![](https://miro.medium.com/v2/resize:fit:1346/0*jfcMctNyXix5tPcR.png)
		- ### 门限签名
			- 两条准则：
				- 密钥**始终**是分开的
				- 密钥**始终**不会相互接触
			- ![](https://miro.medium.com/v2/resize:fit:1400/0*RIcxJNiHodRSt7Vq.png)
			- 优点：不同的key不会对外泄露。门限签名的金库与普通的金库看起来一样，从而具有相同的隐私和费用。
			  缺点：制作modular lock过程需要交互，解锁过程也需要交互。而MultiSig可异步进行签名。
			- 早在 19年，Binance 就已经开源了 TSS算法
				- [“I believe TSS (threshold signatures scheme) will reshape the landscape for wallets and custodian services. It is far superior to multi-sig,” said CZ.]([Binance Weekly Report: Welcome, Euro, Ruble, and More! | Binance Blog](https://www.binance.com/en/blog/all/binance-weekly-report-welcome-euro-ruble-and-more-400687736338653184))
				- [bnb-chain/tss-lib: Threshold Signature Scheme, for ECDSA and EDDSA (github.com)](https://github.com/bnb-chain/tss-lib)
	- ## TSS-Demo
		- Start SM Manager
		- Generator key
		- Sign Message
	- ## MPC 钱包产品
		- [safeheron](https://www.safeheron.com/en-US/mpc-wallet/)，2022 年 08 月 19 日 Pre-A 轮融了 700 完美元。 Yunqi Partners 和 Web3Vision 联合领投，PrimeBlock Ventures、Cobo Ventures 等参与融资。其 TSS 算法已经 [开源](https://github.com/Safeheron/tss-rsa-cpp)。
		- [Fireblocks](https://www.fireblocks.com/)，早在 2019 年就成立，红杉和 Paradigm 都投资了它，主要侧重企业级市场。
		- [ZenGo](https://zengo.com/safety/)，去年完成了 2000 万的 A 轮融资，三星旗下的风投基金 Samsung Next 也再次投资了 ZenGo，它经常和学术界一起联动，成立了 MPC 联盟，代码已 [开源](https://github.com/ZenGo-X)。
		- [Qredo](https://www.qredo.com/about)，和家喻户晓的 MetaMask 机构版有合作，使用的时候需要单独下载个 Qredo Signing App，对于个人使用来说也不是很方便，其主要面对的还是企业客户。
		- [OpenBlock](https://openblock.com/)，由币信孵化的产品，目前只开放了网页端，对 Defi 应用支持比较好，很符合国人的使用习惯。如果你想体验 MPC 钱包，选这个练手准没错，用户群里也非常活跃。
-
-
- refs:
- [门限签名 threshold signature_mutourend 的博客 - CSDN 博客](https://blog.csdn.net/mutourend/article/details/121199130)
- [ZenGo-X/awesome-tss: A curated list of distributed key generation and threshold signatures implementations (github.com)](https://github.com/ZenGo-X/awesome-tss)