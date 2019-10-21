# 手写js数组方法

## `every`

```javascript
function everymin(fn,arr){
   var newarr = [];
   for(let i = 0; i < arr.length; i++){
   	if(!fn(arr[i],i,arr)){
        return false;
   	}
   }
   return true;
}
function ff(item,index,arr){
	return item>10;
}


var m = [12,13,13,14];
if(everymin(ff,m)){
	console.log("ssss")
}
if(!everymin(ff,m)){
	console.log("aa")
}
```

## `some`

```javascript
function somemin(fn,arr){
   for(let i = 0; i < arr.length; i++){
   	if(ff(arr[i],i,arr)){
   		return true;
   	}
   }
   return false;
}
function ff(item,index,arr){
	return item>10;
}

var m = [13,10,10,10];
if(somemin(ff,m)){
	console.log("ssss")
}
if(!somemin(ff,m)){
	console.log("aa")
}
```

## `filter`

```javascript
function filtermin(fn,arr){
	var newarr = [];
   for(let i = 0; i < arr.length; i++){
   	if(ff(arr[i],i,arr)){
   		newarr.push(arr[i])
   	}
   }
   return newarr;
}
function ff(item,index,arr){
	return item>10;
}

var m = [13,12,10,10];
console.log(filtermin(ff,m))
```

## `map`

```javascript
// 自己写的
function mapmin(fn,arr){
	var newarr = [];
   for(let i = 0; i < arr.length; i++){
         newarr.push(fn(arr[i],i,arr))
   }
   return newarr;
}
function ff(item,index,arr){
	return item+10;
}

var m = [13,12,10,10];
console.log(mapmin(ff,m))
// 看的人家的
var selfMap = function (fn,context){
    var arr = ([]).splice.call(this);
    var arrMap = [];
    for(let i = 0; i < arr.length; i++){
        if(!arr.hasOwnProperty(i)){
            continue;
        }
        arrMap.push(fn.call(context,arr[i],i,this));
    }
    return arrMap;
}
Object.prototype["selfMap"] = selfMap;
```

## `reduce`

```javascript
 var selfReduce = function(fn, initialValue) {
 	    console.log(this)// [1,2,3,4]
        var arr = ([]).slice.call(this);// 为甚调用者是this是[]，因为就是数组调用的！
        console.log(arr)
        // 通过判断入参长度,可以避免过滤initialValue传入的非法值(0,undifind,...)
        if(arguments.length === 2) {
            arr.unshift(initialValue);
        }
        var result = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(!arr.hasOwnProperty(i)) {
                continue;
            }
            // 将第一次的出参作为第二次的入参
            result = fn.call( null,result, arr[i], i, this);
        }
        return result;
    }
var rearr = [1,2,3,4]
function getsum(a,b){
	return a+b;
}
Object.prototype["selfReduce"] = selfReduce;
console.log(rearr.selfReduce(getsum,2))
```

