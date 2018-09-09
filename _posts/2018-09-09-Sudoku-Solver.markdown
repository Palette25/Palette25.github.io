---
layout:   post
title:    "LeetCode题解(二) - Sudoku-Solver"
subtitle: " \"For Algorithm Course\""
date:     2018-09-09
author:   "Palette"
header-img: "img/pbuilding.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Sudoku
    - Programming
---
## LeetCode题解(二) - Sudoku Solver
### 题目难度：`Hard`
### 题目地址：[No.37 Sudoku Solver](https://leetcode.com/problems/sudoku-solver/description/)
### 题目描述：
```
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

1. Each of the digits 1-9 must occur exactly once in each row.
2. Each of the digits 1-9 must occur exactly once in each column.
3. Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
4. Empty cells are indicated by the character '.'.

Note:
* The given board contain only digits 1-9 and the character '.'.
* You may assume that the given Sudoku puzzle will have a single unique solution.
* The given board size is always 9x9.

```
要求书写一个解9*9数独的程序，并且最终得到的结果数独应符合以下规则：

1. 每一行的9个格子中，1-9每个数字只出现一次
2. 每一列的9个格子中，1-9每个数字只出现一次
3. 每一个3*3的块中，1-9每个数字只出现一次
4. 输入的初始数独以`.`代表该格子为空，可以填入数字

注意：
* 初始数独上只包含字符数字1-9，以及空格代表字符'.'
* 每个给定的初始数独有且只有一个最终解
* 输入的数独永远是9*9的大小

示例输入：

![img](/img/input-sokudo.png)

示例输出：

![img](/img/output-sokudo.png)


### 题目思路：
* 一开始拿到这题的时候，实际上并没有想到比较好的写法，甚至觉得有点棘手，因为数独本身的初始生成规则并不是太熟悉(而且一开始比较偏向用启发式搜索求解)。
* 但仔细思考之后，其实本题并不是特别地难，十分直观的写法可以用暴力求解，按顺序不断尝试每个空格的可能解，遇错则回溯，采用DFS迭代即可。但实际上有可能采用基于全局最优探索的状态启发式搜索会更好，而想法有了却无奈于9X9数独的奇特生成方法，本文暂时不列出此解法，*有解法的同学可以在底下留言(捂脸*
* 所谓DFS迭代，实际上就是将9*9数独的每一行，每一列，每一块的数字状态记录下来，采用回溯的方法对每一个格子进行可能解的带入，然后迭代，遇到矛盾则回溯，最终求出解。
* 首先需要建立三个二维数组存储全局数独的状态并初始化，然后则从第一个格子进行迭代，若该格子有数字则直接进入下一格子，反之我们根据当前的行列块三大状态数组判断某一数字是否可以填入空格，若有多个可填入数字则按顺序一个一个填入，遇到false即矛盾则回溯，更改填入的数字并恢复之前的状态。

### 解法代码：
```
class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        /*
        * Initialize these arrays
        */
        for(int i=0; i<9; i++){
            for(int j=0; j<9; j++){
                if(board[i][j] != '.') {
                    int num = board[i][j] - '0';
                    row[i][num] = true;
                    column[j][num] = true;
                    block[i/3*3+j/3][num] = true;
                }
            }
        }
        recursive_solve(board, 0);
    }
    
    bool recursive_solve(vector<vector<char>>& board, int index){
        if(index == 81) return true;
        int row_ = index / 9, col_ = index % 9;
        if(board[row_][col_] != '.') 
            return recursive_solve(board, index+1);
        for(int num=1; num<=9; num++){
            if(!row[row_][num] && !column[col_][num] && !block[row_/3*3+col_/3][num]) {
                row[row_][num] = true;
                column[col_][num] = true;
                block[row_/3*3+col_/3][num] = true;
                // Change the cell's number
                board[row_][col_] = num + '0';
                // Return recursive result if it makes sense in next turn
                if(recursive_solve(board, index+1))
                    return true;
                else {
                    row[row_][num] = false;
                    column[col_][num] = false;
                    block[row_/3*3+col_/3][num] = false;
                    board[row_][col_] = '.';
                }
            }
        }
        return false;
    }
    
private:
    /* 
    * These two bool 2's dim array represents the special row or column or block has the number or not
    */ 
    bool row[10][10], column[10][10], block[10][10];
};
```

### 运行结果：
![img](/img/37.png)

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
  id: 'https://palette25.github.io/2017/09/07/Comment-on-blog/', // 可选。默认为 location.href
  owner: 'Palette25',
  repo: 'Comments',
  oauth: {
    client_id: 'a1ac2783392c3eef32c1',
    client_secret: '9f0d8a41ecc382d04af9eb51007e0696cbbb646f',
  },
  theme: myTheme,
})
gitment.render('container')
</script>
