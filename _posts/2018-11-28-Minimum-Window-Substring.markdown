---
layout:   post
title:    "LeetCode 76 - Minimum Window Substring"
subtitle: " \"For Algorithm Course\""
date:     2018-11-28
author:   "Palette"
header-img: "img/noon.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - String
    - Programming
---
## LeetCode题解(十三) - Minimum Window Substring
### 题目难度：`Hard`
### 题目地址：[No.76 Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/)
### 题目描述：
```
Given a string S and a string T, find the minimum window in S which will contain all the characters in T.

Example:
* Input: S = "ADOBECODEBANC", T = "ABC"
* Output: "BANC"

Note:
* If there is no such window in S that covers all characters in T, return the empty string "".
* If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
```

### 题目解释：
1. 给定源字符串S与目标字符串T，现在需要查找在源字符串内部，包含T内所有字符的(不需要与T内部字符顺序相同)最小窗口字符串。

2. 倘若不存在对应的窗口字符串满足上述条件，则返回空字符串""，同时题目保证S内部有且仅有一个与T对应的最小包含窗口字符串。


### 题目思路：
1. 本题为查找符合条件的子字符串问题，与以往的字符串问题不同的是，本题需要查找的窗口字符串不需要与目标字符串完全相同，而是要求窗口字符串内部能够包含目标字符串的所有元素，同时窗口字符串能保证自身长度最短。

2. 解决本题的关键点在于，如何只执行一次一维遍历，做到求出符合条件的子串呢？实际上可以采用字符计数法，在遍历源字符串的同时，记录当前符合条件字符串的头部下标与尾部下标，把不在目标字符串内的字符设为非法字符，在目标内的字符进行统计，符合条件进行子串头尾位置更新，最终获取最短值。

### 代码实现：
```
string minWindow(string s, string t) {
        // Init all letter's count vector
        vector<int> letter(128, 0);
        
        for(char ele : t){
            letter[ele]++;
        }
        
        int count = t.size(), begin = 0, head = 0, upBound = INT_MAX;
        for(int i=0; i<s.size();){
            if(letter[s[i++]]-- > 0)
                count--;
            while(count == 0){
                if(i - begin < upBound){
                    upBound = i - (head = begin);
                }
                if(letter[s[begin++]]++==0) 
                    count++;
            }
        }
        return upBound == INT_MAX ? "" : s.substr(head, upBound);
    }
```

### 运行结果：
![img](/img/mws.png)

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