- 名词解释
	- Party
		- 每个分片的持有者
	- Round
		- KenGen 轮次
	- DKG
		- 分布式密钥生成，相当于用 MPC 的方式生成多个 part
	- PartyID
		- MPC 协议分片持有者 ID，多个通用ID 可以对应一个 PartyID
	- UniversalID
		- 整个系统中的唯一ID
	- 重要接口
		- Scheme
			- 成员
				- syncsInProgress `map[string]func(uint16, []byte)`
					- 存放同步队列，是一个 key 是 Topic，value 是同步器 HandleMessage 的 Map
				- messageClassifiers
					- 消息分类器，Topic 为key，value 为分片实例的ClassifyMsg
			- HandleMessage
				- 处理消息
			- KeyGen
				- 启动密钥生成流程
			- Synchronizer
				- 同步器，负责各个分片之间同步消息和处理消息，discovery 充当同步器的作用，在 Scheme实例化时，由 SyncFactory 生成同步器实例
				- discovery
					- 成员
					- 方法
						- Synchronize
							-
						- HandleMessage
		- KeyGenerator
			- ClassifyMsg
				- 把消息分类
			- Init
			- OnMsg
				- -
			- KeyGen
				- -
		- Signer
		  collapsed:: true
			- ClassifyMsg
				- -
			- Init
			- OnMsg
			- SetShareData
			- Sign
			- ThresholdPK
		- MpcParty
		  collapsed:: true
			- Sign
			- KeyGen
			- HandleMessage
			- SetStoredData
			- ThresholdPK
-
- ## 模块
	- mpc
		- init
			- 初始化BN tss 模块的曲线函数为 elliptic.p256Curve
			- 注册了elliptic.p256Curve 到 tss
		-
- KeyGenerator
	- Om
- # 注意事项
- Sign
	- >Please note that `t+1` signers are required to sign a message and for optimal usage no more than this should be involved. Each signer should have the same view of who the `t+1` signers are.
	- 例如 2/3 的 TSS，threshold 应该设置为1
- # 待办事项
- TODO 学习 go 分布式架构，理解 TSS/discovery 分布式发现协议的原理
- 学习 TSL 网络原理，搭建安全可信的网络节点
-