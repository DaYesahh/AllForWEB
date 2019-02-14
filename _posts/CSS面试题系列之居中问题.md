---
published: true
title: CSS面试题系列之居中问题
category: CSS
tags: 
  - 学习
layout: post
---

# CSS面试题系列之居中问题

## 水平居中

### 文本/行内元素/行内块级元素

```
#parent{
   text-align:center;
}
//text-align:center只控制行内内容(文字、行内元素、行内块级元素)如何相对其块级父元素对齐
// 缺点是：只对行内内容有效，而且还会被子元素继承。
// 如果子元素宽度大于父元素宽度，则无效；所以后代行内内容宽度必须小于父元素
```



### 单个块级元素

```javascript
#son {
 width:100px; //必须定宽
  margin:0 auto
}
// margin上下设置为0，左右设置为auto的时候，会自动均分剩余空间
// 同上，需要设置宽度小于父元素，否则无效。
```



### 多个块级元素

```
#parent {
    text-align:center;
}
.son{
    display:inline-block; /*改为行内或者行内块级形式，以达到text-align对其生效*/
}
// 缺点是改变了其原本的样式，
```



### 使用绝对定位实现

```
// 子绝父相，top、right、bottom、left的值是相对于父元素尺寸的，然后margin或者transform是相对于自身尺寸的，组合使用达到水平居中的目的
```



### 任意个元素



## 垂直居中

## 水平垂直居中

