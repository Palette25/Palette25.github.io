---
layout:     post
title:      "Hello Github Blog"
subtitle:   " \"Hello World, Hello Blog\""
date:       2017-08-30
author:     "Palette"
header-img: "img/hello_github_blog.jpg"
catalog: true
tags:
    - 生活
---

> “Yeah It's on. ”


## 前言

是的呢，Palette的Github博客页终于变得好看一点了呢！
那他到底是怎么做的呢？

[How to build a individual blog using Github??](#build) 



作为一个软件工程专业的学生， Blog 这种轮子要是挂在大众博客程序上就太没意思了。一是觉得大部分 Blog 服务都一般般，二是觉得自己也应该能写出这样的东西吧(太天真了。。。。。）。之前因为与Run Dog大佬暑假咸鱼式学习PHP + Mysql, 导致整个暑假都白白溜走了。。。。现在回想起来，虽然说学到了一些知识，但是博客还是要有的，即使这只是一个Github Page.



<p id = "build"></p>
---

## 正文

接下来说说搭建这个博客的过程。  

本人今日恰巧看见Github上的一个优秀博客页搭建模板，于是乎下来看看。。。。
(我也很无奈啊，谁叫我是菜鸡[哭][哭])

正好之前就有关注过 [GitHub Pages](https://pages.github.com/) + [Jekyll](http://jekyllrb.com/) 快速 Building Blog 的技术方案，非常轻松时尚。

## 作者原话

其优点非常明显：

* **Markdown** 带来的优雅写作体验
* 非常熟悉的 **Git Commit  ， 即 Blog Post**
* 利用 GitHub Pages 的域名和免费无限空间，不用自己折腾主机
* Jekyll 的自定制非常容易，基本就是个模版引擎


---

Jekyll 主题上直接 fork 了 Clean Blog（这个主题也相当有名，就不多赘述了。唯一的缺点大概就是没有标签支持，于是我给它补上了。）

本地调试环境需要 `gem install jekyll`，结果 rubygem 的源居然被墙了……后来手动改成了我大淘宝的镜像源才成功

Theme 的 CSS 是基于 Bootstrap 定制的，看得不爽的地方直接在 Less 里改就好了（平时更习惯 SCSS 些），**不过其实我一直觉得 Bootstrap 在移动端的体验做得相当一般，比我在淘宝参与的团队 CSS 框架差多了……**所以为了体验，也补了不少 CSS 进去

最后就进入了耗时反而最长的**做图、写字**阶段，也算是进入了**写博客**的正轨，因为是类似 Hack Day 的方式去搭这个站的，所以折腾折腾着大半夜就过去了。

## 后记

回顾这个博客的诞生，纯粹是出于个人兴趣。同时也为了完成我那多日以来的博客目标，希望以后能继续加油吧!。

如果你恰好逛到了这里，希望你也能喜欢这个博客主题。

## 重点

My real name is CML........

—— Palette 于 2017.08

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


