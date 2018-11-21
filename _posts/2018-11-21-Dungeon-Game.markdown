---
layout:   post
title:    "LeetCode 174 - Dungeon Game"
subtitle: " \"For Algorithm Course\""
date:     2018-11-21
author:   "Palette"
header-img: "img/light.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(十二) - Dungeon Game
### 题目难度：`Hard`
### 题目地址：[No.174 Dungeon Game](https://leetcode.com/problems/dungeon-game/description/)
### 题目描述：
```
The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

 
Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

Example:
	For example, given the dungeon below, the initial health of the knight must be at least `7` if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

	-2(K) | -3  | 3
	-5 | -10 | 1
	10 | 30 | -5(P)

Note:

* The knight's health has no upper bound.
* Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.
```

### 题目解释：
1. 原题目篇幅较长，但实际上核心部分却是比较简单的：给定一个n X m 大小的矩阵，我们定义矩阵左上角元素为骑士的出生位置，右下角位置为公主所在的位置，现在限定骑士只能在矩阵内部向下走或者向右走，到达矩阵内的每个元素，骑士的生命值增加或减少(加上元素所在数值)，每当骑士生命值小于1则骑士死亡，现在要求你求出骑士既能救出公主，又不至于死亡的最小初始生命值。

2. 骑士生命值没有上限，并且在每一房间中若生命值小于1则立即死亡(包括出生房间与公主房间)。


### 题目思路：
1. 本题实际上也是需要使用动态规划求解的，因为实际上本问题可以分解为一个个的子问题，我们在子问题内部就可以容易地求解最小生命数值。唯一不同的是，本题的方法是采取逆向遍历，求解的是初始状态的最小生命值。

2. 逆向遍历即从公主所在的房间开始，初始置骑士的生命值(最小为1，若公主房间数值为负数则视情况增加)，然后进行下一元素的初始生命值求解。

3. 重点在于状态转移方程，仔细思考不难发现，每一房间的初始最小生命值取决于其向下房间与向右房间的最小生命值，与自身房间的数值，然后取最小值，算式为：
```
dp[i][j] = min(i == rowLen-1 ? INT_MAX : dp[i + 1][j] - dungeon[i][j],
                	j == colLen-1 ? INT_MAX : dp[i][j + 1] - dungeon[i][j]);
```

### 代码实现：
```
class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        if(dungeon.size() == 0) return 1;
        
        int rowLen = dungeon.size(), colLen = dungeon[0].size();
        int dp[rowLen][colLen] = {0};
        // Compute in reverse order
        int temp = 1 - dungeon[rowLen-1][colLen-1];
        // Min initHealth will be one
        dp[rowLen-1][colLen-1] = temp <= 0 ? 1 : temp;
        
        // Rever check
        for(int i=rowLen-1; i>=0; i--){
            for(int j=colLen-1; j>=0; j--){
                if(i==rowLen-1 && j==colLen-1) continue;
                int downHP = i == rowLen-1 ? INT_MAX : dp[i + 1][j] - dungeon[i][j];
                int rightHP = j == colLen-1 ? INT_MAX : dp[i][j + 1] - dungeon[i][j];
                int HP = min(downHP, rightHP);
                dp[i][j] = HP <= 0 ? 1 : HP;
            }
        }
        return dp[0][0];
    }
};
```

### 运行结果：
![img](/img/174.png)

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