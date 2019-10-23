# Git

## 命令大全

- `git add .`：提交变化到暂存区
- `git commit -m  ""`:暂存区提交到本地仓库
- `git push`:推送
- `git checkout master` 切换到主干
- `git checkout -b panda`创建并切换到新分支
- `git branch`显示当前所在分支
- `git config user.name` 显示当前用户名
- `git config user.email`显示当前用户邮箱
- `git config --global user.name "username"`修改用户名
- `git config --global user.email haha@163.com`修改邮箱
- `git log --oneline`这是查看当前推送了哪些
- `git reset --hard +上面git log查出来的最新的`然后就可以重置，重置暂存区，然后将重置的覆盖本地工作区
- + `git reset --soft + 上面git log查出来的最新的`重置指针
  + `git reset --mixed + 上面git log的最新的`重置指针和暂存区
- `git pull origin master`获取`origin`路径下的master分支的最新代码
- `git pull + 网址`可拉取指定分支下的
- 