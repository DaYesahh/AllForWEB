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
  + `git reset HEAD` 也是清空缓存区的
- `git pull origin master`获取`origin`路径下的master分支的最新代码
- `git pull + 网址`可拉取指定分支下的
- `git push --set-upstream origin +分支名 `中`--set-upstream origin +分支名`是本地分支与远程分支建立联系。
- `git stash` git stash作用的范围包括工作区和暂存区中的内容，也就是说没有提交的内容都会保存至堆栈中。
- `git stash apply` 将堆栈中的内容应用到当前目录，不同于git stash pop，该命令不会将内容从堆栈中删除，也就说该命令能够将堆栈的内容多次应用到工作目录中，适应于多个分支的情况。 
- `git stash pop`同上，会删除堆栈中的内容

### 初始化本地git仓库

`git init`

### 连接远程仓库

`git remote add origin http:XXXXX`

### 合并远程仓库步骤

#### 第一种方式

`git init`初始化仓库

`git remote add origin http:xxx`连接远程仓库

`git pull origin master`将远程master分支的拉下来

`git checkout -b dev`在本地创建dev分支并切换过去

`git merge master`将本地dev分支和master分支合并

`git push` 提交上去

#### 第二种方式

`git init`

`git add .`

`git commit -m "XXX"`

`git remote add origin +XXX`

`git checkout -b +分支名`

`git push --set-upstream origin +分支名`



fork后拉源仓库，更新最新代码

`git remote add origin https:XXX`

`git remote add upstream https:XX`

`git remote -v` 执行完这个以后，会有四个，两个origin 两个upstream。

fork的意思是在远程上复制，clone是远程复制到本地。而origin是自己的远程repo，而upstream是人家的远程repo，也就是被fork的repo

`git chekout branch -b branch_mine` 建立个分支

`git merge master`与master合并

`git add`将本地提交到暂存区

`git stash`： git stash作用的范围包括工作区和暂存区中的内容，也就是说没有提交的内容都会保存至堆栈中。 

`git pull upstream master`拉取源远程仓库

`git stash apply` 将堆栈中的内容应用到当前目录，不同于git stash pop，该命令不会将内容从堆栈中删除，也就说该命令能够将堆栈的内容多次应用到工作目录中，适应于多个分支的情况。 

`git add .`如果提示有changes不是staged changes 的时候，执行git add .进行存储

`git commit -m "XXX"`

`git push origin branch_lxp`