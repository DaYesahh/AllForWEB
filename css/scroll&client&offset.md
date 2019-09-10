# scroll&client&offset

```html
<!DOCTYPE html>
<html>
<head>
	<title>cos</title>
	<style type="text/css">
		div{
			width: 300px;
			height: 300px;
			border: 1px solid black;
		}
	</style>
</head>
<body>
<div>haaaaaaahaaaaaaahaaaaaaahaaaaaaahaaaaaaahaaaaaaa</div>
<script type="text/javascript">
	let oo = document.getElementsByTagName("div")[0]
	/*
      oo.offsetWidth = 301 // 加上border
      oo.scrollWidth = 431 // 内容的高度
      oo.clientWidth = 300 // 不加border 
	*/
</script>
</body>
</html>
```

