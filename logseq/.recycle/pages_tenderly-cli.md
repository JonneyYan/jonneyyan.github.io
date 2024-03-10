- # Install
- ```shell
  brew tap tenderly/tenderly
  brew install tenderly
  ```
-
- ref:  [Tenderly/tenderly-cli: CLI tool for Smart Contract error tracking, monitoring and alerting. (github.com)](https://github.com/Tenderly/tenderly-cli#export)
-
- # 使用步骤
- 登陆 Tenderly
	- 可以使用 access-key
- 初始化
	- tenderly init
	- for hardhat
		- install hardhat-tenderly
			- ```sheel
			  npm install --save-dev @tenderly/hardhat-tenderly
			  ```
		- modify `hardhat.config.js`
			- ```sheel
			  require("@tenderly/hardhat-tenderly");
			  ```
			-
- push
- verify
- export
-