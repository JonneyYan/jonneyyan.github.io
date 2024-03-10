# 配置
	- 配置镜像源
		- ```json
		  {
		    "builder": {
		      "gc": {
		        "defaultKeepStorage": "20GB",
		        "enabled": true
		      }
		    },
		    "experimental": false,
		    "registry-mirrors": [
		      "https://docker.m.daocloud.io",
		      "https://dockerproxy.com",
		      "https://docker.mirrors.ustc.edu.cn",
		      "https://docker.nju.edu.cn"
		    ]
		  }
		  ```
	- Docker
	- # Docker常见问题
		- .env 文件
			- 项目根目录下的是用在 compose.yml 的环境变量
			- container 中的环境变量可以在 yml 文件中 用 env_file 指定
- @
-
-