function Ball(inputStr){
   inputarr = inputStr.split("");
   var red = [];
   var yellow = [];
   var blue = [];
   // yellow Red blue
   // 黄 红 蓝
   inputarr.forEach((item) => {
      if(item === "黄") {
      	yellow.push(item)
      }
      if(item === "红"){
      	red.push(item)
      }
      if(item === "蓝") {
      	blue.push(item)
      }
   })
   return yellow.join("")+red.join("")+blue.join("")
}

outstr = Ball("红红红黄黄蓝红黄蓝红蓝")
console.log(outstr)