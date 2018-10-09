---
layout:   post
title:    "LeetCode 115 - Distinct Subsequence"
subtitle: " \"For Algorithm Course\""
date:     2018-10-09
author:   "Palette"
header-img: "img/birds.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(六) - Distinct-Sequence
### 题目难度：`Hard`
### 题目地址：[No.115 Distinct Sequence](https://leetcode.com/problems/distinct-subsequences/description/)
### 题目描述：
```
Given a string S and a string T, count the number of distinct subsequences of S which equals T.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

Example 1:
Input: S = "rabbbit", T = "rabbit"
Output: 3
Explanation:

As shown below, there are 3 ways you can generate "rabbit" from S.
(The caret symbol ^ means the chosen letters)

rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^

Example 2:
Input: S = "babgbag", T = "bag"
Output: 5
Explanation:

As shown below, there are 5 ways you can generate "bag" from S.
(The caret symbol ^ means the chosen letters)

babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^
```

本题也是一道字符串子串匹配数求解的经典动态规划问题，实际上每当看到与字符串寻求模板匹配问题，第一点就需要将其与DP问题挂钩。根据DP问题求解步骤，首先列出状态转移图(本题中为子串转移矩阵)，然后推出状态转移方程即可。

### 题目思路：
1. 如上文所述，为了获取对应的`State-Transform-Equation`，我们需要建立二维dp数组，从横纵方向记录最多不同方法构成的模板子串数，显式建立矩阵图，观察其中规律，下图是以`Example 2`中的源串`babgbag`和目标串`bag`作为例子构建的状态矩阵。
```
  ε b a b g b a g
ε 1 1 1 1 1 1 1 1
b 0 1 1 2 2 3 3 3
a 0 0 1 1 1 1 4 3
g 0 0 0 0 1 1 1 5
```

2. 实际上通过观测我们可以看出一下几条状态转移规则：
* dp[i][j] >= dp[i][j-1]  即横方向(源串匹配方向)的字符匹配不同生成规则数呈非递减性。
* dp[i][j] = dp[i-1][j-1] + (s[i-1] == t[j-1]) ? dp[i-1][j] : 0  即匹配到S与T相同字符时，产生状态数值累加到其之后的状态，累加数值取决于横纵方向前移一步的双方子串状态数值。

3. 关于上文状态转移方程的解释，实际上我们可以看到随着源串与模板串对应位置的字符相同，产生另一可能产生新解的路径，所以此时应该将前一不包含该字符的子串状态数值累加，逐渐累积到最后就是题目所求解值。

4. 实际上我们还可以降低


### 解法代码：
1. 纯DP写法, 时间复杂度为`O(m*n)`，空间复杂度为`O(n^2)` 
```
class Solution {
public:
    int numDistinct(string s, string t) {
        int dp[t.size() + 1][s.size() + 1];
        for (int i = 0; i <= s.size(); ++i) dp[0][i] = 1;    
        for (int i = 1; i <= t.size(); ++i) dp[i][0] = 0;    
        for (int i = 1; i <= t.size(); ++i) {
            for (int j = 1; j <= s.size(); ++j) {
                dp[i][j] = dp[i][j - 1] + (t[i - 1] == s[j - 1] ? dp[i - 1][j - 1] : 0);
            }
        }
        return dp[t.size()][s.size()];
    }
};
```

2. 简化一维数组写法，时间复杂度`O(m*n)`，空间复杂度为`O(n)`
```
class Solution {
public:
    int numDistinct(string s, string t) {
        vector<int> store(s.size(), 0);
        for(int i=0; i<s.size(); i++)
            if(s[i] ==  t[0]) store[i] = 1;
        for(int i=1; i<t.size(); i++) {
            int sum = 0;
            for(int j=0; j<s.size(); j++) {
                int temp = store[j];
                store[j] = (s[j] == t[i]) ? sum : 0;
                sum += temp;
            }
        }
        int result = 0;
        for(int i=0; i<store.size(); i++)
            result += store[i];
        return result;
    }
};
```

### 运行结果：
![img](/img/ds1.png)

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