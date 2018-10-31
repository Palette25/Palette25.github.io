---
layout:   post
title:    "LeetCode 32 - Longest Valid Parentheses"
subtitle: " \"For Algorithm Course\""
date:     2018-10-31
author:   "Palette"
header-img: "img/red.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(九) - Longest Valid Parentheses
### 题目难度：`Hard`
### 题目地址：[No.32 Longest-Valid-Parentheses](https://leetcode.com/problems/longest-valid-parentheses/description/)
### 题目描述：
```
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example 1:

Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"

Example 2:

Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
```

### 题目思路：
1. 本题可采用动态规划解法，同时也可以使用堆栈法解决。题目给定一个字符串，串中包含`(`和`)`,要求给出输入串中长度最长的合法子串。

2. 合法子串要求从该串的起始位置，到该串的终止位置都是合法的括号对，即左括号和右括号都是一一对应闭合的。

3. 首先介绍本题的第一种解法：动态规划法。DP解决问题的出发点是建立状态数组dp，确定状态的表示并写出状态转移方程。本题的dp数组只需要一位数组存储即可，每一位元素`dp[i]`表示以`s[i]`结尾的，当前最长合法子串的长度`len`。每一次更新`dp[i]`时，需要检测当前位置`s[i]`的内容：
	* 若`s[i]`为左括号`(`，那么当前以该元素结尾的必定不是合法子串，所以当前`dp[i]` = 0
	* 若`s[i]`为有括号`)`，那么我们需要查看前一位元素结尾的最长合法子串的最左端是不是未匹配的左括号`(`，如果是则需要加上左边界前一位的最长合法子串的长度，组合成最新的最长合法子串。

4. 接下来介绍堆栈法解决。建立下标存储堆栈，顺序遍历字符串，设置最长合法子串的起始点start。遇左括号则记录当前下标，将下标`push`入栈顶；遇右括号查看当前栈内有无元素(看下有没有前面还未配对的左括号)，若有则弹出栈顶，若弹出操作后栈顶为空，这意味着在这之前到起始点的所有子串都是合法的，更新当前最大长度，否则就将长度更新到当前栈顶下标之后。若拿到右括号时当前栈内无元素，那么实际上证明了这一步导致子串不合法，更新起始点到档期啊下标后一位，继续之前操作。


### 代码实现：
1. DP一维数组法：时间复杂度O(n), 空间复杂度O(n)
```
class Solution {
public:
    int longestValidParentheses(string s) {
        if(s.size() == 0) return 0;
        int maxResult = 0;
        int dp[s.size()];
        dp[0] = 0;
        
        for(int i=1; i<s.size(); i++){
            dp[i] = 0;
            if(s[i] == ')'){
                int leftBound = i - dp[i-1] - 1;
                if(leftBound >= 0 && s[leftBound] == '('){
                    dp[i] = dp[i-1] + 2;
                    if(leftBound -1 >= 0)
                        dp[i] += dp[leftBound-1];
                }
            }
            maxResult = max(maxResult, dp[i]);
        }
        return maxResult;
    }
};
```

2. 堆栈实现法：时间复杂度O(n), 空间复杂度O(n)
```
class Solution {
public:
    int longestValidParentheses(string s) {
        if(s.size() == 0) return 0;
        int startPos = -1, maxResult = 0;
        stack<int> store;
        for(int i=0; i<s.size(); i++){
            if(s[i] == '('){
                store.push(i);
            }else {
                if(!store.empty()){
                    store.pop();
                    if(store.empty()){
                        maxResult = max(maxResult, i-startPos);
                    }else {
                        int tmp = store.top();
                        maxResult = max(maxResult, i-tmp);
                    }
                }else {
                    // No valid string before, change start point
                    startPos = i;
                }
            }
        }
        return maxResult;
    }
};
```

### 运行结果：
1. Dynamic Procedure
![img](/img/lvp1.png)

2. Stack
![img](/img/lvp2.png)

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