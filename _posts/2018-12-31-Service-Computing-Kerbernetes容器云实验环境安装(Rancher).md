---
layout:   post
title:    "Service Computing课程博客(五) - kubernetes 容器云实验环境搭建"
subtitle: " \"Install kubernetes with Rancher....\""
date:     2018-12-31
author:   "Palette"
header-img: "img/ku.jpg"
catalog: true
tags:
    - kubernetes
    - Service Computing
---

> Try to install kubernetes cloud environment, though it takes much time....

## kubernetes环境搭建指南(Rancher篇)

### 简介
1. `Rancher`是一个开源的企业级容器管理平台。通过`Rancher`，企业再也不必自己使用一系列的开源软件去从头搭建容器服务平台。Rancher提供了在生产环境中使用的管理`Docker`和`Kubernetes`的全栈化容器部署与管理平台。`Rancher`提供一套解决容器平台网络、存储、负载均衡等的基础设施服务；同时集成主流的容器编排工具`Docker Swarm`，`Kubernetes`， 和`Mesos`，基本实现一键部署；开放应用商城，方便添加常用第三方开源工具；实现企业级权限管理；部署便捷，提供官方开源容器镜像和`RancherOS`。

2. 需要注意，`Ranche`、`Kubernetes`、`Docker`之间有版本要求，本人选用`RancherV1.6.14` + `KubernetesV1.8.0-rancher1` + `DockerV1.12.3`，并且实验环境搭建过程在`Minimal Centos 7 `环境下进行。


### Docker安装
1. 修改`Docker`安装的相关配置信息
```
## Change mirror repository to aliyun
vi /etc/docker/daemon.json 
{ 
    "registry-mirrors": ["https://dev.aliyun.com/search.html"] 
}
## Restart Docker
systemctl daemon-reload 
systemctl restart docker
```

2. 下载`Docker`进行安装
```
## Download rpm
wget http://yum.dockerproject.org/repo/main/centos/7/Packages/docker-engine-selinux-1.12.3-1.el7.centos.noarch.rpm 
wget http://yum.dockerproject.org/repo/main/centos/7/Packages/docker-engine-1.12.3-1.el7.centos.x86_64.rpm 
wget http://yum.dockerproject.org/repo/main/centos/7/Packages/docker-engine-debuginfo-1.12.3-1.el7.centos.x86_64.rpm
## Install
yum install -y docker-engine-selinux-1.12.3-1.el7.centos.noarch.rpm docker-engine-1.12.3-1.el7.centos.x86_64.rpm docker-engine-debuginfo-1.12.3-1.el7.centos.x86_64.rpm
## Start
systemctl start docker
## Look up version
docker version
```


### Rancher安装
1. 经过上一步骤的`Docker`安装，我们就可以直接在拥有`Docker`的`Linux`服务器上安装`Rancher`，并指定开放端口等信息，进行`Rancher`管理平台的启用。
```
docker run -d --name rancher-server -p 8080:8080 --restart=unless-stopped rancher/server:v1.6.14 && docker logs -f rancher-server
```

2. 安装并启动完成之后，既可以通过默认地址*http://localhost:8080*访问`Rancher`管理平台，进行平台上的基础配置。
![img](/img/Service_Computing_blogs/1.bmp)


### Kubernetes安装
1. `Kubernetes`是一个强大的容器编排工具，帮助用户在可伸缩性系统上可靠部署和运行容器化应用。`Rancher`容器管理平台原生支持`K8s`，使用户可以简单轻松地部署`K8s`集群。但是国内基本无法正常拉取这类镜像，首先我们先从`Rancher`的`K8S`中国区镜像模板配置开始。
![img](/img/Service_Computing_blogs/2.bmp)

2. 添加完环境模板之后，命名模板并且进入配置页，配置阿里云镜像仓库。
![img](/img/Service_Computing_blogs/3.bmp)
![img](/img/Service_Computing_blogs/4.bmp)

3. 使用刚刚创建的模板，创建一个Kubernetes环境并添加主机。
![img](/img/Service_Computing_blogs/6.bmp)