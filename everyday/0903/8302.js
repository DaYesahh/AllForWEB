function mySetInterval(fn,time){
	function inner(){
		fn();
		setTimeout(inner,time);
	}
	inner()
}

console.log("***********************************")
mySetInterval(() => {console.log(new Date().getTime())}, 1000)

setInterval(() => {console.log(new Date().getTime())}, 1000)
console.log("***********************************")


1567424254793
1567424254793

1567424255794
1567424255794

1567424256794
1567424256794

1567424257795
1567424257795

1567424258795
1567424258795

1567424259795
1567424259795

1567424260795
1567424260796

1567424261796
1567424261796

1567424262796
1567424262796
