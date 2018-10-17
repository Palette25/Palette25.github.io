---
layout:   post
title:    "LeetCode 316 - Remove Duplicate Letters"
subtitle: " \"For Algorithm Course\""
date:     2018-10-17
author:   "Palette"
header-img: "img/birds.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Greedy Algorithm
    - Programming
---
## LeetCode题解(七) - Remove-Duplicate-Letters
### 题目难度：`Hard`
### 题目地址：[No.316 Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/description/)
### 题目描述：
```
Given a string which contains only lowercase letters, remove duplicate letters so that every letter appear once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

Example 1:

Input: "bcabc"
Output: "abc"

Example 2:

Input: "cbacdcbc"
Output: "acdb"
```

本题是一道利用贪心算法，根据输入字符串，通过去除其中重复的字符，最终要求得到所有的可能输出中，字典排序最小的，不存在任何重复字符的目标串。

### 题目思路：
1. 贪心算法题目的解题重点在于贪心准则的选取，以及字符串生成策略的决定。首先这道题的突破口在于选取最小字符的位置，由此判断其两侧字符的保留与否。此处需要借助堆栈`Stack`数据结构，每次扫描字符串，将未入栈的字符入栈，入栈前需要与栈顶元素进行大小比较，若栈顶元素大于其则栈顶会被弹出，以保证最小字典序。

2. 上述思路的实现，需要使用到两个辅助数组：一个是负责记录字符出现次数的数组`count`，另一个是入栈标记数组`visited`。每次扫描字符之时，去除其一次count，同时已在栈内者不做扫描，不在栈内者进行栈顶大小比较，小于`top`者进行替换，栈顶被弹出(循环操作)，但是仍有机会进行入栈操作，其`visited`值设为true。

3. 最终得到的栈内字符顺序必定是倒序，每个小元素都逐渐被压至栈底。

### 代码实现：
```
class Solution {
public:
    string removeDuplicateLetters(string s) {
        stack<char> store;
        string result = "";
        int visited[26] = {0}, count[26] = {0};
        for(int i=0; i<s.size(); i++)
            count[s[i] - 'a']++;
        for(int i=0; i<s.size(); i++){
            int index = s[i] - 'a';
            count[index]--;
            if(visited[index]) continue;
            while(!store.empty() && s[i] < store.top() && count[store.top() - 'a']>0){
                visited[store.top() - 'a'] = false;
                store.pop();
            }
            visited[index] = true;
            store.push(s[i]);
        }
        while(!store.empty()){
            result = store.top() + result;
            store.pop();
        }
        return result;
    }
};
```

### 运行结果：
![img](/img/316.png)

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