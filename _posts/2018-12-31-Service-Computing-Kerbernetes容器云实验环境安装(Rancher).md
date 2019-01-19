---
layout:   post
title:    "Service Computing课程博客(五) - kubernetes 容器云实验环境简述 & gRPC初试"
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

## 一、 kubernetes环境搭建指南(Rancher篇)

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


## 二、gRPC简单实践
### 1. gRPC定义
gRPC 一开始由 google 开发，是一款语言中立、平台中立、开源的远程过程调用(RPC)系统。

在 gRPC 里客户端应用可以像调用本地对象一样直接调用另一台不同的机器上服务端应用的方法，使得您能够更容易地创建分布式应用和服务。与许多 RPC 系统类似，gRPC 也是基于以下理念：定义一个服务，指定其能够被远程调用的方法（包含参数和返回类型）。在服务端实现这个接口，并运行一个 gRPC 服务器来处理客户端调用。在客户端拥有一个存根能够像服务端一样的方法。

![img](/img/grpc.png)


### 2. 安装gRPC
由于gRPC的相关安装依赖包不能用`go get`正常获取到，此处介绍通过`github`的方式安装`gRPC`:
```
git clone https://github.com/grpc/grpc-go.git {your path to store it}
git clone https://github.com/golang/net.git {your path to store it}
git clone https://github.com/golang/text.git {your path to store it}
git clone https://github.com/google/go-genproto.git {your path to store it}

go install google.golang.org/grpc
```
上面的安装路径依据每个人的不同需求安装位置而定，一般情况下可以分别放在`$GOPATH/src/google.golang.org`下的每个子文件夹下。


### 3. 运行gRPC测试程序
* 首先启动客户端
```
go run greeter_server/main.go
```

* 其次运行对应的测试程序，下面给个官方示例：
```
package main
import (
    "log"
    "os"
    pb "your_path_to_gen_pb_dir/helloworld"
    "golang.org/x/net/context"
    "google.golang.org/grpc"
)
const (
    address     = "localhost:50051"
    defaultName = "world"
)
func main() {
    // Set up a connection to the server.
    conn, err := grpc.Dial(address, grpc.WithInsecure())
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
    defer conn.Close()
    c := pb.NewGreeterClient(conn)
 
    // Contact the server and print out its response.
    name := defaultName
    if len(os.Args) > 1 {
        name = os.Args[1]
    }
    r, err := c.SayHello(context.Background(), &pb.HelloRequest{Name: name})
    if err != nil {
        log.Fatalf("could not greet: %v", err)
    }
    log.Printf("Greeting: %s", r.Message)
}
```

通过运行可以获得结果
```
./greeter_client
Greeting: Hello world
```


### 4. 研读`gRPC-go`的源码 -- `examples/helloworld`
* 这里定义了一个服务Greeter，其中有个接口 `SayHello`，其接受参数为`HelloRequest`类型，返回`HelloReply`类型。
```
syntax = "proto3";
option objc_class_prefix = "HLW";
package helloworld;
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}
// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}
// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

* service定义了一个server, 其中的接口可以是四种类型:
	* rpc GetFeature(Point) returns (Feature) {}
	类似普通的函数调用，客户端发送请求Point到服务器，服务器返回相应Feature.
	* rpc ListFeatures(Rectangle) returns (stream Feature) {}
	客户端发起一次请求，服务器端返回一个流式数据，比如一个数组中的逐个元素
	* rpc RecordRoute(stream Point) returns (RouteSummary) {}
	客户端发起的请求是一个流式的数据，比如数组中的逐个元素，服务器返回一个相应
	* rpc RouteChat(stream RouteNote) returns (stream RouteNote) {}
	客户端发起的请求是一个流式数据，比如数组中的逐个元素，二服务器返回的也是一个类似的数据结构

* 此处为服务定义：
```
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

```