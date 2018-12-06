---
layout:   post
title:    "LeetCode 164 - Maximum Gap"
subtitle: " \"For Algorithm Course\""
date:     2018-12-05
author:   "Palette"
header-img: "img/skky.jpg"
catalog: true
tags:
    - C++
    - LeetCode
    - Sort Algorithm
---
### LeetCode题解(十四) - Maximum Gap
### 题目难度：`Hard`
### 题目地址：[N0.164 Maximum Gap](https://leetcode.com/problems/maximum-gap/description/)
### 题目描述：
```
Given an unsorted array, find the maximum difference between the successive elements in its sorted form.
Return 0 if the array contains less than 2 elements.

Example 1:
	Input: [3,6,9,1]
	Output: 3
	Explanation: The sorted form of the array is [1,3,6,9], either
             (3,6) or (6,9) has the maximum difference 3.
Example 2:
	Input: [10]
	Output: 0
	Explanation: The array contains less than 2 elements, therefore return 0.

Note:
* You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.
* Try to solve it in linear time/space.
```

### 题目解释：
1. 题目给定一个无序数组，要求你找出该数组内部元素顺序递增排序后，其中连续两个元素最大的差值，并输出结果。题目表面上看起来十分简单，我们只需要对当前输入数组进行排序，然后再线性遍历排序数组中的连续两个元素，求其最大差值即可。

2. 但是题目要求算法设计的时间复杂度为：`O(n)`，空间复杂度也要求为：`O(n)`，这正是本题目的难点所在。我们不能采用一般的移动元素排序算法进行求解，因为此类算法的复杂度下限为：`O(nlogn)`，应另辟蹊径。

2. 另外，题目要求在数组长度小于2时直接输出结果0，不需要进行特殊处理。

### 题目思路：
1. 考虑到算法时间复杂度必须满足`O(n)`，此处采用的排序算法应为桶排序`Bukcet Sort`，结合本题需求，在进行桶排序之时，我们首先要找出数组内部的最大最小值`min, max`，确定数组的`N`个元素都在`[min, max]`之内。

2. 那么实际上平均的`Gap`就为`average = ceiling[(max - min) / (N - 1)]`，同时数组内部最大的`Gap`是不会低于此平均`Gap`的(下限约束)。根据此条件，每个桶长度为`len = average`，保证桶与桶之间存在最小间隔，总共桶数量为`(max - min) / len + 1`。

3. 根据元素值`val`，我们可以轻松地求出该元素处于的桶序号为：`(val - min) / len`，那么一个桶内必定存在最大最小元素，但是桶内元素间隔最大也就只有`len - 1`(桶大小约束)，所以可想而知整体数组之间的最大间隔不能在一个桶内产生。

4. 所以我们按顺序查找相邻桶之间的最大最小元素差值，与当前最大间隔`Max Gap`进行比较，保留最大值输出，即为最终所得结果。

### 代码实现：
1. 采取快速排序，进行排序后数组的遍历求解：时间复杂度`O(nlogn)`，空间复杂度`O(1)`
```
class Solution {
public:
    int Partition(vector<int>& nums, int left, int right){
        int meta = nums[right];
        int index = left - 1;
        for(int i=left; i<right; i++){
            // Swapping
            if(nums[i] < meta){
                index++;
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            }
        }
        // Exchanging
        nums[right] = nums[index + 1];
        nums[index + 1] = meta;
        return index + 1;
    }
    
    void QuickSort(vector<int>& nums, int left, int right){
        if(left < right){
            int partIndex = Partition(nums, left, right);
            QuickSort(nums, left, partIndex-1);
            QuickSort(nums, partIndex+1, right);
        }
    }
    
    
    int maximumGap(vector<int>& nums) {
        if(nums.size() < 2)
            return 0;
        QuickSort(nums, 0, nums.size()-1);
        int result = 0;
        for(int i=0; i<nums.size()-1; i++){
            if(nums[i+1] - nums[i] > result)
                result = nums[i+1] - nums[i];
        }
        return result;
    }
};
```

2. 采取桶排序进行相邻桶之间最大间隔取值，时间复杂度`O(n)`，空间复杂度`O(n)`
```
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        if(nums.size()<2) return 0;
        int minn = INT_MAX;
        int maxx = INT_MIN;
        for(int i = 0; i<nums.size(); i++){
            minn = min(minn, nums[i]);
            maxx = max(maxx, nums[i]);
        }
        double len = (maxx - minn)*1.0 / (nums.size() - 1);
        if(len == 0) return 0;
        int cnt = floor((maxx - minn) / len + 1);
        vector<int> minb(cnt, INT_MAX);
        vector<int> maxb(cnt, INT_MIN);
        for(int i = 0;i<nums.size();i++) 
        {
            int id = floor((nums[i] - minn) / len);
            minb[id] = min(minb[id], nums[i]);
            maxb[id] = max(maxb[id], nums[i]);
        }
        int res = 0, premax = maxb[0];
        for(int i = 1;i<cnt; i++)
        {
            if(minb[i] != INT_MAX)
            {
                res = max(res, minb[i] - premax);
                premax = maxb[i];
            }
        }
        return res;
    }
};
```

### 运行结果：
1. 快速排序求解
![img](/img/quicksort.png)

2.桶排序求解
![img](/img/bucketsort.png)

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