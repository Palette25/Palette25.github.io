---
layout:   post
title:    "LeetCode 87 - Scramble String"
subtitle: " \"For Algorithm Course\""
date:     2018-11-07
author:   "Palette"
header-img: "img/red.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(十) - Scramble String
### 题目难度：`Hard`
### 题目地址：[No.87 Scramble-String](https://leetcode.com/problems/scramble-string/description/)
### 题目描述：
```
Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

Below is one possible representation of s1 = "great":

    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that "rgeat" is a scrambled string of "great".

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that "rgtae" is a scrambled string of "great".

Given two strings s1 and s2 of the same length, determine if s2 is a scrambled string of s1.

Example 1:
	Input: s1 = "great", s2 = "rgeat"
	Output: true

Example 2:
	Input: s1 = "abcde", s2 = "caebd"
	Output: false
```

## 题目解释：
1. 题目给定一个输入字符串`s1`,并且定义字符串的分解二叉树，规定每次由非叶节点生成左右子节点时，所有令左右子节点不为空字符串的分解策略都是合法的。同时，为了实现变更字符串的行为，我们可以选择任意非叶节点，交换其左右子节点的顺序，该过程记为一次`scramble`。

2. 对于零次或多次`scramble`行为之后生成的新字符串`s2`，我们称`s2`是`s1`的变换后字符串(爬行字符串)。

## 题目思路：
1. 本题也是一道经典动态规划题目，实际上对于本题而言，二维的dp数组存储容量已经不足够，我们需要开辟三维dp数组，其中的每一个元素`dp[i][j][len]`表示：当前s1的起始位置为i，s2的起始位置为j，两者的长度都是len，s2如果是s1的`scramble string`那么dp[i][j][len] = true，否则为false。

2. 存储细节确定之后，就需要推导相应的状态转移方程了。结合题目定义，对于`dp[i][j][len]`，其对应的s1子串为s1[i:i+len-1]，s2子串为s2[j:j+len-1]。对应于子串的左右两部分划分，当前s1子串有len-1种分割为两部分的方式，s2子串也有len-1中分割为两部分的方式。对于每次分割完左右子串之后，我们需要做的就是进行两种比较：1) 顺序匹配：s1左子节点与s2左子节点相同，s1右子节点与s2右子节点相同。  2) 逆序匹配：s1右子节点与s2左子节点相同，s1左子节点与s2右子节点相同。

3. 定义`k`为所切割点与左端点的距离，那么实际上此处的状态转移方程为：
```
dp[i][j][len] |= (dp[i][j][k] && dp[i+k][j+k][len-k]) || (dp[i][j+len-k][k] && dp[i+k][j][len-k])
```
上式等号右边的左半部分为顺序匹配结果，右半部分为逆序匹配结果，其中只需要有一种情况成立，`scrambled`条件即成立，否则就不满足。

4. 实际上此题目仍有递归解法，逻辑上书写起来较为简单，但实际运行的时空复杂度不确定。递归写法采用核心思想与DP相似，只是将状态转移的过程采用函数递归求解的方式得出，也是采用将当前子串分解为若干种可能的左右部分进行匹配。对于此种解法，可以被称为非多项式复杂度解法，在递归开始之前进行两字符串的有效性判断(长度相同，字母相同)十分重要，否则leetcode通过不了。


### 代码实现：
1. DP实现：时间复杂度O(n^4)， 空间复杂度O(n^3)
```
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if(s1 == s2) 
            return true;
        else if(s1.size() != s2.size()) 
            return false;
        
        int len = s1.size();
        bool dp[len][len][len+1];
        for(int i=0; i<len; i++){
            for(int j=0; j<len; j++){
                dp[i][j][0] = false;
                dp[i][j][1] = (s1[i] == s2[j]);
                for(int k=2; k<len+1; k++)
                    dp[i][j][k] = false;
            }
        }
        
        for(int tt=2; tt<=len; tt++){
            for(int i=0; i<=len-tt; i++){
                for(int j=0; j<=len-tt; j++){
                    for(int k=1; k<tt; k++){
                        dp[i][j][tt] |= dp[i][j][k] && dp[i+k][j+k][tt-k] || dp[i][j+tt-k][k] && dp[i+k][j][tt-k];
                    }
                }
            }
        }
        return dp[0][0][len];
    }
};
```

2. 递归实现
```
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if(s1 == s2) 
            return true;
        else if(s1.size() != s2.size()) 
            return false;
        
        // Check letters are the same or not
        int letter[26] = {0};
        int len = s1.size();
        for(int i=0; i<s1.size(); i++){
            letter[s1[i] - 'a']++;
            letter[s2[i] - 'a']--;
        }
        for(int i=0; i<26; i++)
            if(letter[i] != 0) return false;
        
        for(int i=1; i<s1.size(); i++){
            // No-exchange Recursion
            if(isScramble(s1.substr(0, i), s2.substr(0, i)) && isScramble(s1.substr(i), s2.substr(i)))
                return true;
            // Do-exchange Recursion
            if(isScramble(s1.substr(0, i), s2.substr(len-i)) && isScramble(s1.substr(i), s2.substr(0, len-i)))
                return true;
        }
        return false;
    }
};
```

### 运行结果：
1. 复杂度较高的DP解法，运行时间长
![img](/img/87-2.png)

2. 递归解法
![img](/img/87-1.png)

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