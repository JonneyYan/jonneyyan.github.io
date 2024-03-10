- iCloud 云盘同步卡住
	- 重启 iCloud 程序
		- ```shell
		  killall bird    # 结束 bird 这一 iCloud 文件同步的核心进程
		  killall cloudd    # 结束 cloudd 这一 iCloud 文件同步的核心进程
		  ```
-