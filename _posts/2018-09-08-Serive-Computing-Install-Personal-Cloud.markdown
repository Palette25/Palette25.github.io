---
layout:   post
title:    "Serive Computing课程博客(一) - 配置个人私有云"
subtitle: " \"Learn to build your own cloud..\""
date:     2018-09-08
author:   "Palette"
header-img: "img/cloud1.jpg"
catalog: true
tags:
    - Linux
    - VirtualBox
    - Personal Cloud
---

> Try to build up your own cloud on VirtualBox, though it takes a long time....

# Win10环境下安装配置VirtualBox，搭建Ubuntu私有云

#### [Win10环境下搭建Centos私有云(同队队员的博客，给有需要搭建Centos虚拟机的同学)](https://krazymud.github.io/2018/09/09/vbox-cfg/#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)

## 实验需求：
1. 下载安装VirtualBox，由于本人PC机使用的操作系统为windows，故下载的Platform Packages为Windows hosts，其他系统的同学根据自己需要选择下载格式，下载链接：[VirtualBox官网](https://www.virtualbox.org/wiki/Downloads)
2. 安装Unix内核虚拟机，如Centos,Ubuntu等等系统。配置安装后的VirtualBox，新建虚拟网卡供虚拟机使用，使得用户主机能够通过ssh，或远程桌面访问虚拟机，虚拟机能通过桥接网络NAT访问外网。

## 实验准备：
1. 主机需要下载支持ssh连接的终端软件，如`git bash`, `Xshell`, `putty`，此处提供git bash的下载地址：[git官网](https://git-scm/downloads/)
2. 下载对应版本的Oracle VirtualBox 5.X，下载官网在上文中已给出。安装后打开VirtualBox，设置虚拟机存储位置，打开路径：初始界面 -> 管理 -> 全局设定 -> 常规 -> 默认虚拟电脑位置，输入其他盘的存储路径，避免占用过多的系统盘位置。
3. 下载虚拟机系统镜像文件，Ubuntu系统推荐带图形化界面的镜像包，下面给出下载网址：[Centos下载地址](https://www.centos.org/download/)， [Ubuntu下载地址](https://www.ubuntu.com/download/desktop)

## 实验配置过程

### 1. 新建虚拟机
* 点击主菜单上的`新建`按钮，输入对应虚拟机的名称，*此处推荐不同系统的名称前缀要对应，方便VirtualBox进行查找匹配，如Ubuntu系统名为ub-xx，Centos系统名为centos-xx*，然后分配虚拟机系统内存，一般2-4G即可，然后一路默认即可(有想法的同学可以不采取动态分配硬盘空间，但是固定存储硬盘的生成时间较长，需要耐心等待)

*命名界面*
![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/1.png)
*虚拟机新建成功*
![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/6.png)

### 2. 配置虚拟机网络
* 创建虚拟机内部的虚拟网络，首先需要创建虚拟网卡。打开VirtualBox主菜单，选中已创建的虚拟机，点击`设置` -> `网络`，配置虚拟网卡。
    1. 网卡1的连接方式为*网络地址转换(NAT)*，该网卡负责连通虚拟机的外网连通，通过与主机网络之间的NAT连接进行访问。

    2. 在进行网卡2的配置之前，需要手动创建Host-Only虚拟网卡，回到主菜单，点击`管理` -> `主机网络管理器`，创建一个新的虚拟网卡适配器，启用DHCP服务器服务。*推荐手动配置网卡地址，将IPv4地址设置为192.168.100.1并保存。注意，若不开启第一张网卡的网络连接服务直接进行虚拟网卡的创建，将会出现以下错误！*
    ![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/2.png)

    3. 回到网卡2的配置界面，启用其网络连接，选择连接方式为仅主机(Host-Only)网络，选择界面名称为步骤2创建的虚拟网卡名。网卡2负责主机与虚拟机之间的直接网络通信，使得ssh和远程界面功能得以启用。

    4. 回到网卡1的配置界面，点击`高级`选项，选择`端口转发`，由于本实验要求主机与虚拟机之间有ssh连接，我们在端口转发规则界面添加一条ssh端口规则，如下图：
    ![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/3.png)

    > 此处的主机网络IP和子网络IP随个人而定，主机网络为新建虚拟网卡的IPv4地址，*子网络IP为你自己在虚拟机里面设置的网卡ip*。

* 双击运行虚拟机，第一次运行需要装系统，若你是Centos-Mini虚拟机(只有命令行界面)，只需要进行root用户密码的输入，等待装系统即可。若是Ubuntu用户，则需要进行安装选项选择，此处不赘述，有需要的同学可以到同队伍中的Ubuntu虚拟机系统安装博客，虽然是在VM下安装，但是其过程大致相同：[传送门](https://blog.csdn.net/gzcmt123/article/details/52743077)

* 经过漫长的等待安装时间，进入到虚拟机主界面中。我们需要做的事情有：
    1. 更换第二张网卡的IPv4地址
    `Alt + Ctrl + T`调出终端窗口，输入`nmtui`编辑网络连接界面，选择`启用连接`，将两个网卡连接Acvivate，然后返回，点击`编辑连接`，增加第二张网卡的IPv4地址，写为与主机IP192.168.100.1同一网段下的IP，如`192.168.100.23`等都是可以的，该IP地址对应于虚拟机内部子网络的IP。*第二张网卡的名称通常为eth8，第一张网卡则是eth3(有些情况可能会不同，但eth后的数字是按网卡序号递增的)*
    ![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/7.png)

    2. 开启虚拟机的ssh服务
    一般新装的Linux虚拟机都没有sshd的service，终端下输入`Service sshd status`，若尚未安装，则显示为`Inactive`。需要输入`sudo apt install openssh-server`安装对应包，然后再次查看其状态为active即可。
    ![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/8.png)

    3. 主机与虚拟机之间相互ping通，主机使用ssh连接虚拟机
    首先我们需要关闭双方的专用网络防火墙(*尤其是宿主机windows系统的防火墙*)，否则我们是无法ping通的。在宿主机的某一终端(如：Powerhell，git bash)输入`ping 你的虚拟机子网络IP`，若能够正常接收数据包则ping通；在虚拟机的终端输入`ping 192.168.100.1`，若能够正常接收数据包则ping通。
    接下来我们需要在宿主机的git bash上键入`ssh 你的虚拟子网络IP -l 你的虚拟机用户名`, 若询问是否信任对方，则连接成功，输入对应的密码即可；反之则连接失败，网卡设置出现问题，需要你回去以上步骤重新配置(*耐心是关键*)
    * ssh连接成功界面
    ![img](/img/Service_Computing_blogs/Install_and_configure_personal_cloud/10.png)

    4. 宿主机使用远程桌面连接虚拟机
        * 由于Linux系统原生不支持xrdp和vnc协议，所以我们需要下载对应的远程桌面协议应用安装包。打开终端，输入`sudo apt-get install xrdp`，等待安装XRDP完成，再输入`sudo apt-get install vncserver tightvncserver`, `echo "xfce4-session" >~/.xsession"`向xsession中写入xfce4-session, `sudo service xrdp restart`开启xrdp服务。
        * 宿主机上的VirtualBox也需要安装支持远程连接的拓展包。打开VirtualBox的主菜单，`管理` -> `全局设定` -> `扩展`，点击新建扩展包，之后前往[VirtualBox官网](https://www.virtualbox.org/wiki/Downloads)下载Oracle VM VirtualBox Extension Pack，手动安装扩展。完成之后，需要回到主菜单，`设置` -> `显示` -> `远程桌面`，启用服务器，并且为远程桌面服务器设置端口。
        * 打开Windows下的远程桌面连接界面，输入*子网络IP:对应端口*，以及用户名，密码，出现虚拟机界面即成功连接。
    
    > 至此，私人云桌面的搭建配置基本完成，在以后的课程里可以用此虚拟机完成各种项目~~~

## 私人云上的其他应用搭建
* 安装Chrome浏览器
```
cd /tmp
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
sudo dpkg -i google-chrome*; sudo apt-get -f install 
```

* 安装配置Go语言环境
```
sudo apt-get install golang-go
export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin
sudo mkdir Applications/go
```

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
  id: 'location.href',
  owner: 'Palette25',
  repo: 'Comments',
  oauth: {
    client_id: 'a1ac2783392c3eef32c1',
    client_secret: '9f0d8a41ecc382d04af9eb51007e0696cbbb646f',
  },
  theme: myTheme,
})
gitment.render('container')
</script>