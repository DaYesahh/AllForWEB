---
published: true
title: indexOf讲解
category: JS
tags: 
  - 学习
layout: post
---

# indexOf

## 解释

这个方法不仅可以放在**字符串**中使用，还可以在**数组**中使用，但是在Number类型中是无法使用的
indexOf()方法可以返回某个指定字符串值在字符串或数组中**首次**出现的位置，位置是从0开始的


## 语法
### 语法表现形式
- stringObject.indexOf(searchName,fromindex)
- arrayObject.indexOf(searchName,fromindex)

### 语法注意事项
- stringObject：想要在哪个字符串中使用
- arrayObject：想要在哪个数组中使用
- searchName：想要检索的字符串值或数组项
- fromindex：是从哪个位置开始检索，可以写也可以不写，不写的时候就默认是从0开始检索

## 兼容性
- 数组中的indexOf属性是ES5的规范，只有IE8及更早的版本不支持该方法。

### 兼容性的解决方案
#### 一、如果只是检测数组中是否含有此项，则可以先转化成字符串

```javascript
var arr = [1,3,4]
arr.toString().indexOf(3)  // 2
```

- 但是此方法的缺点就是会将逗号当作字符串中的一项，所以答案变成2，而不是1。
  如果只是简单的检测是否含有此项，直接非等于-1即可

  ```javascript
  arr.toString().indexOf(3) !== -1 
  ```

#### 二、可以使用jquery中的$.inArray方法
`$.inArray('3',arr)`
此方法不仅可以获取准确的位置值，还可以判断是否存在该项，如果不存在同indexOf一样呢，返回-1
注意事项：因为此方法不会自动去转换类型，查找项的时候数据类型必须相同，否则也是-1

#### 三、自行封装indexOf方法
```javascript
function indexOf(arr,value){
	for(var i=0;i<arr.length;i++){
		if(arr[i] === value){
			return i;
		}
	}
	return -1;
}
`
```

## 用途
- 数组去重
  ```javascript
    function unique(origin){
    	var result = []
    	for(var i=0; i<origin.length; i++){
    		var item = origin[i];
    		if(result.indexOf(item) === -1){
    			result.push(item)
    		}
    	}
    	return result
    }
  ```