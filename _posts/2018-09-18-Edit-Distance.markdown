---
layout:   post
title:    "LeetCode 72 - Edit Distance"
subtitle: " \"For Algorithm Course\""
date:     2018-09-18
author:   "Palette"
header-img: "img/night.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(三) - Edit Distance
### 题目难度：`Hard`
### 题目地址：[No.72 Edit Distance](https://leetcode.com/problems/edit-distance/description/)
### 题目描述：
```
Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

* Insert a character
* Delete a character
* Replace a character

Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
1. horse -> rorse (replace 'h' with 'r')
2. rorse -> rose (remove 'r')
3. rose -> ros (remove 'e')

Example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
1. intention -> inention (remove 't')
2. inention -> enention (replace 'i' with 'e')
3. enention -> exention (replace 'n' with 'x')
4. exention -> exection (replace 'n' with 'c')
5. exection -> execution (insert 'u')
```

给定两个字符串，分别为输入串和目标串，以及字符串之间的三种操作：插入、删除、替换某个位置的字符。
现要求我们书写程序，计算从源串到目标串，总体所需最少的操作行为数量。

### 题目思路：
1. 根据题目可知，本题实际上是在求源字符串到目标串的`最短距离`，考虑如何移动或修改字符串才能够最短地获得目标串。三种操作行为提供了字符串修改方向，那么实际上我们在书写程序时需要考虑字符串之间的*状态转移关系*，即所谓的*动态规划问题*。

2. Dynamic Procedure(DP问题)通常是在寻找问题最优解时被引入的，要求适用的问题能够被分解成很多可以求解的小问题，并且子问题的最优解能够导向总体的最优解，存在状态转移的特征。

### 题目解法：
* 在该问题中，我们需要弄清楚源串与目标串之间的`相似度`关系，才能够得出准确的状态转移方程。对于字符串问题来讲，dp数组往往都是存储两者在相应长度下的`不同字符数`。此处，由于三种操作的引入，dp数组间的某一数值dp[i][j]则应该为*从长度为i的源串到长度为j的目标串需要的操作数，即步长数*。

* 初始化dp数组，长度定义为[word1.size() + 1] X [word2.size() + 1]。根据我们上文讨论过的，此处需要对`i=0`的情况进行初始化，确保在源串为空的情况下，到目标串的步长即为目标串的长度；同理，当`j=0`时，源串到目标串的步长为源串长度。

* 状态转移方程确立：
	1. dp[i][j] <= dp[i-1][j-1] + (word1[i] == word[j] ? 0 : 1)    // 若当前字符相同，则不需要增加步长
	2. dp[i][j] <= dp[i-1][j] + 1;    // 不同长度，必定增加步长
	3. dp[i][j] <= dp[i][j-1] + 1;
最终，由于需确立最小步长，我们取三种转换方式中，令dp[i][j]最小的方程。


### 解法代码：
```
class Solution {
public:
    int minDistance(string word1, string word2) {
        /*
        * 经典的动态规划DP问题，确定状态转移方程即可
        */
        if(word1.size() == 0 || word2.size() == 0)
            return word1.size() > word2.size() ? word1.size() : word2.size();
        // 初始化DP数组
        int dp[word1.size()+1][word2.size()+1];
        for(int i=0;i<=word1.size();i++)
            dp[i][0] = i;
        for(int j=0;j<=word2.size();j++)
            dp[0][j] = j;
        // 建立循环建立三方向转移循环，确定最短转移路径
        for(int i=1;i<=word1.size();i++){
            for(int j=1;j<=word2.size();j++){
                int dis1 = dp[i-1][j-1] + (word1[i-1] == word2[j-1] ? 0 : 1),
                dis2 = dp[i][j-1] + 1, 
                dis3 = dp[i-1][j] + 1;
                dp[i][j] = min(dis1, min(dis2, dis3));
            }
        }
        return dp[word1.size()][word2.size()];
    }
    
};

```

### 运行结果：
![img](/img/72-1.png)

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