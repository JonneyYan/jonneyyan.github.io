tags:: config, git

- git config 分为三个级别：
	- project：配置文件位置在 .git/config
	- global：配置文件位置在~/.gitconfig
	- system: 针对所有 git 项目生效，位置在 /etc/gitconfig
- 优先级 project > global > system
- 在 git v2.13 版本中，支持 [condition](https://git-scm.com/docs/git-config#_includes)，案例如下：
- ```shell
  # ~/.gitconfig
  [user] # as default, personal needs
      email = monon@personal-domain.fr
      name = bcag2
  [includeIf "gitdir:~/Develope/work/"]
      path = ~/Develope/work/.gitconfig
  [includeIf "gitdir:~/Develope/jonneyyan/"]
      path = ~/Develope/jonneyyan/.gitconfig-job
  
  ```