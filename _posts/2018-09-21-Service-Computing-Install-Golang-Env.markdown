---
layout:   post
title:    "Service Computing课程博客(二) - 安装Ubuntu下Go语言环境"
subtitle: " \"Start to learn coding with Go-lang\""
date:     2018-09-21
author:   "Palette"
header-img: "img/go1.jpg"
catalog: true
tags:
    - Linux
    - Go
    - Shell
---

> In order to write codes and projects with Go-lang, we need to install Go environment firstly....

# Ubuntu16.04私有云上安装配置Go语言开发环境

## 友情链接
* [Ubuntu 18.04私有云上安装配置Go语言环境简要教程](https://blog.chenmt.science/2018/09/23/ubuntu-18-04-%E8%99%9A%E6%8B%9F%E6%9C%BA%E4%B8%8B%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE-go-%E8%AF%AD%E8%A8%80%E7%8E%AF%E5%A2%83/)

## 实验需求
1. 通过学习Linux终端命令行Shell命令的编写，实现Go语言环境安装，开发路径和环境变量配置以及基本的Go语言程序编写，实现hello.go并熟悉基本的gp语句，成功跑出结果。

2. 安装程序开发所需的编辑器，包括`VSCode`，`Sublime Text3`，以及基本的`vim`。本文中会给出所有的编辑器安装教程，读者不必全部安装，只需要根据自己的编程习惯进行选择即可。

3. 安装必要的工具和插件，其中包括`git`，以及有利于我们深入学习Go语言开发的`go tour`工具。

## 实验准备
* 基本掌握Shell命令的编写，如：apt-get, mkdir, echo, cp, source等，如果对这些命令功能还不熟悉，则需要移步到[Ubuntu常用命令大全](https://blog.csdn.net/fengbingchun/article/details/40923763)，对其内容进行涉猎即可。

* 拥有自己的私有云，并且操作系统为Ubuntu。(*若还没有自己的私有云，可以移步到我的上一篇博客 -- Win10环境下搭建Ubuntu私有云*)

## 实验配置过程
#### 1. 安装Go语言环境
* 开启VirtualBox虚拟机，在Win10宿主机上使用ssh连接Ubuntu私有云，开始命令行操作。首先，我们需要获取Golang的依赖包，之后直接执行安装，命令如下：
```bash
$ sudo apt-get install golang-go
```
* 执行完该条语句之后，Ubuntu 16.04系统中go环境依赖包会默认安装在路径：`/usr/lib/go`，不然则使用rpm查看安装路径：
```bash
$ rpm -ql golang-go |more
```

* 设置GoPath路径值
为了保证Go语言正常进行保存，运行等操作，我们需要设置其环境变量值，其中最重要的即设置GoPath值(放置Go源程序路径)，GoRoot值(Go安装环境根路径)
1. 创建Go代码文件存储路径，当然如果你想更改存储文件名，或者直接修改存储位置也是可以的
```bash
$ mkdir $HOME/gowork
```
2. 第二步打开系统路径设置文件bashrc，记得使用sudo命令进入管理员身份
```bash
$ sudo vim ~/.bashrc
```
3. 最后设置GOPATH环境变量值，路径值填入第一步创建的文件名
```bash
export GOPATH="$HOME/gowork"
export GOROOT="/usr/lib/go"
```
4. 执行配置
```bash
$ source ~/.bashrc
```
5. 检查Go环境配置情况，如果GOPATH，GOROOT值正确，则配置成功
```bash
$ go env
```
![img](/img/env.png)


#### 2. 创建简单Go程序文件，测试环境
* 此处我们首先使用vim进行hello.go的编写创建，并使用`go run`查看结果

	```
	package main

	import "fmt"

	func main() {
    	fmt.Printf("hello, world\n")
	}
	```

* 该源程序中，第一条语句为`包声明`，指明该源文件属于哪个包；第二条则是对`fmt`包的依赖引入；其后则是main函数的编写，内部使用fmt包的标准输出函数`Printf`打印语句。编写完成之后，编译运行该程序。
```bash
$ go run hello.go
hello, world
```

* 也可以使用`go build`产生可执行的exe文件。
![img](/img/tk.png)

* 同时使用`go install`可以指定在`$GOPATH`和`$GOROOT`下的某个文件夹内的go源程序包的安装，完成之后即到对应的`bin`文件夹内部访问。
```bash
$ go install github.com/golang
$ $GOPATH/bin/golang
Hello, World!
```
![img](/img/ins.png)

* 为了编写并使用Go语言的第一个自定义库，我们需要在对应的src文件夹里面生成对应包名的子文件夹，并将写好的库源程序放入其中。此处为了实现可重用性，使用shell脚本makePackage.sh，目标文件结构为：
```
Basic-Go/
      pratices/
            *`target-file`.go* (old path of it)
bin/
      helloworld.exe
pkg/
src/
      `target-file`/
            `target-file`.go  (new path of it)
```

* 编写对应脚本，同时在当前源程序工作空间创建新Go源程序，记得修改对应包名为你所需要的库名(此处以官网`stringutil`示例)。
```shell
# 接收文件名
echo "----------------- Make Package For Go -----------------"
read -p "Please input package name: " name
mkdir -p ../../src/${name}   # 此处的生成路径可以更改，因为每个人的目录结构可能不同
mv ./${name}.go ../../src/${name}/  # 同上
echo "OK"
```

  ```
  // stringutil 包含有用于处理字符串的工具函数。
  package stringutil

  // Reverse 将其实参字符串以符文为单位左右反转。
  func Reverse(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
      r[i], r[j] = r[j], r[i]
    }
    return string(r)
  }
  ```

* 运行makePackage脚本，使用`go build`编译生成对应库文件。执行完成之后即可在其他Go程序中引用该库文件。
```bash
$ /bin/sh makePackage.sh
----------------- Make Package For Go -----------------
Please input package name: stringutil
OK
$ go build $GOPATH/src/stringutil
```

  ```
  package main

  import (
        "fmt"

        "stringutil"
  )

  func main(){
        fmt.Printf(stringutil.Reserve("!oG,olleH"));
  }
  ```

* 进行Go源程序的测试过程，使用`go test`命令，创建名为XXX_test.go文件，程序需要`testing`包进行测试添加，约定测试程序内部至少有一个名为TestXXX的函数，接收参数为`*testing.T`类型。
```go
package stringutil

import "testing"

func TestReverse(t *testing.T) {
  cases := []struct {
    in, want string
  }{
    {"Hello, world", "dlrow ,olleH"},
    {"Hello, 世界", "界世 ,olleH"},
    {"", ""},
  }
  for _, c := range cases {
    got := Reverse(c.in)
    if got != c.want {
      t.Errorf("Reverse(%q) == %q, want %q", c.in, got, c.want)
    }
  }
}
```
  ```
  $ go test stringutil
  ok    stringutil 0.165s
  ```



#### 3. 安装Go语言开发所需编辑器
1. VSCode安装步骤，采用PPA获取vscode依赖包环境，也可以参考vs官网给出的方法[传送门](https://code.visualstudio.com/docs/setup/linux)
```bash
$ sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
$ sudo apt-get update
$ sudo apt-get install ubuntu-make
$ sudo umake web visual-studio-code
```

2. Sublime Text3安装步骤，同样用了PPA
```bash
$ sudo add-apt-repository ppa:webupd8team/sublime-text-3 
$ sudo apt-get update   #更新可用软件库
$ sudo apt-get install sublime-text-installer   #安装Sublime Text 3
```

3. 以上两种编辑器皆为非原生编辑器，首次使用时在图形化桌面搜索关键字打开并锁定到桌面，或者直接到安装路径打开即可。
接下来介绍Linux系统原生编辑器`vim`的配置。
* 打开vim配置文件
```bash
$ sudo vim /etc/vim/vimrc
```
* 配置所需功能
```
set tabstop=4         #Tab宽度为4
set nobackup          #禁止生成临时文件
set cursorline        #突出显示当前行
set ruler             #右下角显示当前行数
set autoindent        #换行自动缩进
set shiftwidth=4      #Shift宽度为4
set ai                #设置自动对齐
set showmatch         #高亮当前匹配括号
set foldmethod=syntax #语法折叠
set foldlevel=100     #设置代码折叠层数        
set number            #显示行数
inoremap ' ''<ESC>i   #单引号补全
inoremap " ""<ESC>i   #双引号补全
inoremap ( ()<ESC>i   #括号补全
```
* 执行修改
```bash
$ source /etc/vim/vimrc
```


#### 4. 安装必要的工具和插件
* 安装Git客户端
```bash
$ sudo apt-get install git
```

* 设置Git常用账户信息
```bash
$ git config --global user.name `your-user-name`
$ git config --global user.email `your-email`
```

* Git查看当前文件夹状态，添加改动，上传，以及提交
```bash
$ git status
$ git add .  #此步根据需要更改添加路径
$ git commit -m 'Change'  ##此步根据需要修改上传信息
$ git push `your-remote-repo-name` master
```
![img](/img/ff.png)

* 配置VSCode所需工具
1. 首次进入VSCode使用界面，会提示需要安装Go开发插件，但是无法翻墙的小伙伴是安装不了的，所以需要在github上拉下来安装。
```bash
$ mkdir $GOROOT/src/golang.org/x/
$ go get -d github.com/golang/tools
$ cp $GOROOT/src/github.com/golang/tools $GOROOT/src/golang.org/x/ -rf
```
2. 安装所需工具包(上述shell命令之所以使用$GOROOT，是因为下述安装过程依赖于许多Go程序包，它们并非在$GOPATH上)
```bash
$ go install golang.org/x/tools/go/buildutil
```
3. 重启VSCode，按照步骤安装插件，完成。

* 安装运行go tour
```bash
$ go get github.com/Go-zh/tour/gotour
$ go tour
```

#### 5. Go语言开发所需文档资料
* [Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

* [Go语言菜鸟教程](http://www.runoob.com/go/go-tutorial.html)

* [Go语言之旅](https://github.com/Go-zh/tour)

* [如何使用Go语言编程 -- 官方文档](https://go-zh.org/doc/code.html)


<div id="container"></div>
<link rel="stylesheet" href="https://imsun.GitHub.io/gitment/style/default.css">
<script src="https://imsun.GitHub.io/gitment/dist/gitment.browser.js"></script>
<script>
  const myTheme = {
  render(state, instance) {
    const container = document.createElement('div')
    container.lang = "en-US"
    container.className = 'gitment-container gitment-root-container'
    container.appendChild(instance.renderHeader(state, instance))
    container.appendChild(instance.renderEditor(state, instance))
    container.appendChild(instance.renderComments(state, instance))
    container.appendChild(instance.renderFooter(state, instance))
    return container
  },
}

var gitment = new Gitment({
  id: '<%= page.date %>',
  owner: 'Palette25',
  repo: 'Comments',
  oauth: {
    client_id: 'a1ac2783392c3eef32c1',
    client_secret: 'ea8605a4a85131c5012ba8f200f87702e15a05b0',
  },
  theme: myTheme,
})
gitment.render('container')
</script>