---
layout:     post
title:      "Comment功能上线"
subtitle:   " \"Welcome to comment and write advice!!\""
date:       2017-09-07
author:     "Palette"
header-img: "img/star.jpg"
catalog: true
tags:
    - Comment
    - Blog
---

> "Comment function now available......"

## 介绍

Palette博客近日新增评论功能，可通过登录github账号在本人的每一篇博客下留言哦~~~~~
欢迎说出你的任何看法和建议。

[How to add comment function to your github blog??](#how)

> "Thanks for some supports from others~~~~"

## 致谢

感谢Sirius同学的介绍和指导(虽然可能他本人都没注意到........)
以及Gitment的技术支持~~~~


<p id="how"></p>
---

## 如何添加评论系统
### 什么是Gitment？

Gitment，一款基于**Github Issues**的评论系统，同时也依靠Github Repository做为存储评论的仓库，极大地为开发者解决了
评论的放置储存功能，并且其还支持Markdown格式，使得评论者能够使用Markdown文件提交评论，方便而且美观。

### 如何使用Gitment？

> Gitment的使用过程，主要借鉴于Sirius同学

Gitment的使用步骤主要分为3步:

1.使用Github账号注册`OAuth Application`

每个Github用户的Setting页面内都有OAuth Apps选项功能，点击之后, 选择**Register a new OAuth application**
，便会出现以下界面。

<img src="img/OAuth.png">

该界面的Application name是允许本人随便填的，做为该应用的名字。
但接下来的Homepage URL和Authorization callback URL是该应用的主地址和回调默认网址，必须填写你当前
Github Page的地址，或者你已经购买并且投入使用的域名。

> 个人Github Page的网址通常为`[your_github_user_name].github.io`

创建OAuth App成功之后，通常会显示`Client ID`和`Client Secret`，这是使用此App的关键key，
此时需要先记起来，为下面的步骤做准备。

2.开启一个本地Repository

选择New a Repository， 创建一个专门用来存储用户评论的仓库，所有来自他人的评论结汇以
issues的形式存储在这里。

> 注意，这里首先要先初始化一下你新建的仓库，添加README.md文件，防止一开始的评论写入失败。

3.添加HTML代码

最后，在每一篇你想要加入评论功能的博客末尾，加入如下代码。

> 注意，以下有关于个人的信息皆需要你自己填写

```
<div id="container"></div>
<link rel="stylesheet" href="https://imsun.GitHub.io/gitment/style/default.css">
<script src="https://imsun.GitHub.io/gitment/dist/gitment.browser.js"></script>
<script>
var gitment = new Gitment({
  id: 'location.href', // 可选。默认为 location.href
  owner: '[your_github_user_name]',
  repo: '[your_comment_repo_name]',
  oauth: {
    client_id: '[your_client_id]',
    client_secret: '[your_client_secret]',
  },
})
gitment.render('container')
</script>
```

至此，Gitment的介绍和使用教程就结束了，各位是不是觉得很简单呢.....(其实就是很简单~~~~)

##Gitment的使用效果

<img src="img/comment.png">

总体来讲，这款评论系统代码开源，简单容易上手，界面简洁不多余，初学者的必选，
可以称为一款优秀的评论应用了。

## 文末划重点

1. [Gitment使用教程](https://imsun.net/posts/gitment-introduction/)

2. [Sirius的个人博客](http://siriussee.info)

—— Palette 于 2017.09

<div id="container"></div>
<link rel="stylesheet" href="https://imsun.GitHub.io/gitment/style/default.css">
<script src="https://imsun.GitHub.io/gitment/dist/gitment.browser.js"></script>
<script>
var gitment = new Gitment({
  id: 'location.href', // 可选。默认为 location.href
  owner: 'Palette25',
  repo: 'Comments',
  oauth: {
    client_id: 'a1ac2783392c3eef32c1',
    client_secret: '9f0d8a41ecc382d04af9eb51007e0696cbbb646f',
  },
})
gitment.render('container')
</script>


