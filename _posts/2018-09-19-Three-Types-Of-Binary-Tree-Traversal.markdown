---
layout:   post
title:    "LeetCode 145 - Binary Tree Postorder Traversal"
subtitle: " \"For Algorithm Course\""
date:     2018-09-19
author:   "Palette"
header-img: "img/gnight.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Traversal of Binary Tree
    - Programming
---
## LeetCode题解(四) - Binary Tree Postorder Traversal
### 题目难度：`Hard`
### 题目地址：[No.145 Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/description/)
### 题目描述：
```
Given a binary tree, return the postorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [3,2,1]
Follow up: Recursive solution is trivial, could you do it iteratively?
```

给定一个二叉树结构，使用后序遍历整个二叉树，并将遍历的结果按照顺序添加到结果向量中并输出。
*Hint: 使用迭代法后序遍历二叉树是十分普通的做法，请考虑使用单个函数循环遍历的实现*

### 题目思路：
1. 对于二叉树的前序，中序，后序遍历方法，使用迭代求解是十分直观可行的，但这种做法是很普通的，具体代码易于实现。本题的重点在于使用循环遍历，那么实际上我们就需要在单个函数中模拟迭代法堆栈。

2. 使用堆栈对象`Stack`，倘若我们需要使用后序遍历，实际上巧妙的想法是在拿到每一个非叶节点的同时，将其`push`入堆栈中，不对其进行*先左后右再父节点*的做法，而是首先把该节点的值压入结果队列的头部，再去遍历其右子树，反顺序进行遍历行为，直到达到右边界。此时，我们则需要回溯，每当当前的`root`指针为空时，我们将当前栈顶父节点推出，获取其左节点进行左子树的遍历，依次进行上述行为，直至结束。

3. 关于为什么要采用反后序遍历顺序的解法，实际上是因为倘若不这么做，而是采用顺序遍历，那么我们不仅需要使用标记确定遍历方向，还需要使用另一个while循环去保证一边的子树循环完毕，此处`diss`[Miguel同学的代码](https://blog.chenmt.science/2018/09/16/leetcode-145-binary-tree-postorder-traversal-iterative-solution/)


### 解法代码：
```
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode*> store;
        while(!store.empty() || root != NULL){
            if(root == NULL){
                TreeNode* temp = store.top();
                store.pop();
                root = temp->left;
            }else {
                result.insert(result.begin(), root->val);
                store.push(root);
                root = root->right;
            }
        }
        return result;
    }
};
```

### 运行结果：
![img](145-1.png)


### 思路推广：
* 除了后序遍历，对于二叉树的遍历还有前序，中序两种方法，那么我们应该考虑将其两者的代码一并实现，因为三者的差别就在于左右子节点和父节点的遍历顺序。

* 对于前序遍历，规则是*先父节点后左再右*，与上文中的十分相似，只需要把父节点的顺序提到最前即可，同时修改父节点放置位置为队列尾部，先搜左子树后搜右子树，这样即可实现正向的*先父后左再右*。同理对于中序遍历，只需要修改父节点的压入队列时间，移至右子树开始遍历之时。


### 相关代码：
1. 前序循环遍历
```
/*
*  Iterative Preorder Traversal of a Binary Tree
*/
class Solution {
public:
	vector<int> preorderTraversal(TreeNode* root) {
		vector<int> result;
		stack<TreeNode*> store;
		while(!store.empty() || root != NULL) {
			if(root == NULL) {
				TreeNode* temp = store.top();
				store.pop();
				root = temp->right;
			}else {
				result.push_back(root->val);  //在父节点往左子树开始遍历前，将父节点值推入result尾部
				store.push(root);
				root = root->left;
			}
		}
	}
};
```

2. 中序循环遍历
```
/*
*  Iterative Inorder Traversal of a Binary Tree
*/
class Solution {
public:
	vector<int> inorderTraversal(TreeNode* root) {
		vector<int> result;
		stack<TreeNode*> store;
		while(!store.empty() || root != NULL) {
			if(root == NULL) {
				TreeNode* temp = store.top();
				store.pop();
				result.push_back(root->val);
				root = temp->right;
			}else {
				store.push(root);
				root = root->left;
			}
		}
	}
};
```

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