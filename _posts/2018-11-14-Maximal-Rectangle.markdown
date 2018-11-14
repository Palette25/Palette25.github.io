---
layout:   post
title:    "LeetCode 85 - Maximal Rectangle"
subtitle: " \"For Algorithm Course\""
date:     2018-11-14
author:   "Palette"
header-img: "img/plane.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Dynamic Procedure
    - Programming
---
## LeetCode题解(十一) - Maximal Rectangle
### 题目难度：`Hard`
### 题目地址：[No.85 Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/description/)
### 题目描述：
```
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example:

Input:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
```

### 题目解释：
1. 原题目所给解释非常简短，实际上就是输入一个给定的二维矩阵，矩阵内部由0或1组成，现在要求你找到其中由1组成的最大面积长方形，并输出该长方形的面积。

2. 在考虑长方形面积构建时，需要注意矩阵是从上到下按照行序号排列的，构建最大面积长方形时需考虑上下左右各个方向。

### 题目思路：
1. 本题也是使用动态规划解法求解的，唯一不同的是，本题无法很直观地构建`dp`数组，而是应该从多个方向构建边界(左方向，右方向，高度方向)，从而进行面积计算及递推。

2. 下面分别对上文的递推边界数组的递推概念进行介绍：
* `cur_left`定义为从当前元素的列位置开始，向左方向延伸，遇0元素结束延伸，过程结束之后所能够达到的元素最小下标。
* `cur_right`定义为从当前元素的列位置开始，向右方向延伸，遇0元素结束延伸，过程结束之后能够到达的元素最大下标。
* `height`定义为以行递增方向查看，矩阵内部1元素所构成的直方图，在每个列下标的最大高度。

3. 之所以定义以上三种概念，建立数组存储中间值用于计算，实际上很大程度上考虑到了长方形面积的各个拓展方向，使算出的面积最大。核心计算思路为：从第一行开始逐行处理，首先初始化`left`和`right`数组，遍历行内元素进行赋值，计算`height[j]`，然后进行`[i, j]`处最大子矩阵面积计算`(right[i][j]-left[i][j]) * height[j]`，最终得出最大面积。

### 代码实现：
```
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix){
        if(matrix.size() == 0)
            return 0;
        int len = matrix[0].size();
        // Define cur_left, cur_right and height array
        int left[len], right[len], height[len];
        int result = 0;
        for(int i=0; i<len; i++){
            left[i] = height[i] = 0;
            right[i] = len;
        }
        // Get cur_left and cur_right
        for(int i=0; i<matrix.size(); i++){
            int cur_left = 0, cur_right = len;
            for(int j=0; j<len; j++){
                // Increasing height in column
                if(matrix[i][j] == '1') ++height[j];
                else height[j] = 0;
            }
            for(int j=0; j<len; j++){
                // Increasing left in row
                if(matrix[i][j] == '1'){
                    left[j] = max(left[j], cur_left);
                } else {
                    left[j] = 0;
                    cur_left = j+1;
                }
            }
            for(int j=len-1; j>=0; j--){
                if(matrix[i][j] == '1'){
                    right[j] = min(right[j], cur_right);
                } else {
                    right[j] = len;
                    cur_right = j;
                }
            }
            for(int j=0; j<len; j++){
                result = max(result, (right[j] - left[j]) * height[j]);
            }
        }
        return result;
    }
};
```

### 运行结果：
![img](/img/87.png)

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