# 持久化
	- docker compose 中，可以使用下面的配置开启持久化
		- ```yaml
		  
		      volumes:
		        - ./redis-data:/data
		      command: redis-server --appendonly yes
		  ```
	-
-