window.onload = function(){
var map = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,2,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,3,3,0,3,3,3,0,3,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,3,3,0,3,3,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
var sizeGird = 24;  // 设定网格尺寸
var speed = 100;    // 设定移动速度

(function road(){
  var oUl = document.getElementById('map');
  var aLi = oUl.getElementsByTagName('li');
  var oBtn = document.getElementById('btn');
  var beginLi = oUl.getElementsByClassName('sty1');
  var endLi = oUl.getElementsByClassName('sty2');
  var cols = Math.sqrt(map.length);  
  var openArr = [];   // 存放可能要走的路线
  var closeArr = [];  // 存放不允许走的路线
  // 点击按钮初始化
  init();
  function init(){
  	createMap();
  	oBtn.onclick = function(){
  		openFn();
  	};
  }
  // 创建网格
  function createMap(){
  	
  	oUl.style.width = cols * (sizeGird) + 'px';
  	
  	for(var i=0;i<map.length;i++){
  		var oLi = document.createElement('li');
  		oLi.style.width = sizeGird + 'px';
  		oLi.style.height = sizeGird + 'px';
  		oUl.appendChild(oLi);
  		
  		if( map[i] == 1 ){
  			oLi.className = 'sty1';
  			openArr.push(oLi);
  		}
  		else if(map[i] == 2){
  			oLi.className = 'sty2';
  		}
  		else if(map[i] == 3){
  			oLi.className = 'sty3';
  			closeArr.push(oLi);
  		}
  	}
  }

  function openFn(){
  	var nowLi = openArr.shift();
  	if( nowLi == endLi[0] ){
  		showLine();
  		return;
  	}
  	closeFn(nowLi);
  	findLi(nowLi);
  	//console.log( openArr );
  	openArr.sort(function(li1,li2){
  		return li1.num - li2.num;
  	});
  	//console.log( openArr );
  	openFn();  // 递归操作，重复执行函数
  }
  // 过滤走过的路线
  function closeFn(nowLi){
  	closeArr.push( nowLi );
  }
  // 找寻所有可能走的网格
  function findLi(nowLi){
  	var result = [];
  	for(var i=0;i<aLi.length;i++){
  		if( filter(aLi[i]) ){
  			result.push( aLi[i] );
  	}
	}

	function filter(li){
		for(var i=0;i<closeArr.length;i++){
			if( closeArr[i] == li ){
				return false;
			}
		}
		for(var i=0;i<openArr.length;i++){
			if( openArr[i] == li ){
				return false;
			}
		}
		return true;
	}
  	// 找到当前网格周围的八个网格
    for(var i=0;i<result.length;i++){
  		if( (Math.abs(nowLi.offsetLeft - result[i].offsetLeft)<= sizeGird) && (Math.  abs(nowLi.offsetTop - result[i].offsetTop)<= sizeGird) ){
  			result[i].num = f(result[i]);
  			result[i].parent = nowLi;
  			openArr.push( result[i] );
  		}
  	}
  }
  // 显示路线
  function showLine(){
  	var result = [];
  	var lastLi = closeArr.pop();
  	var iNow = 0;
  	findParent(lastLi);
  	function findParent(li){
  		result.unshift(li);
  		if( li.parent == beginLi[0] ){
  			return;
  		}
  		findParent(li.parent);
  	}
  	
  	var timer = setInterval(function(){
  		result[iNow].style.background = '#e22841';
  		iNow++;
  		if(iNow == result.length){
  			clearInterval(timer);
  		}
  	},speed);
  }
  // 估价函数
  function f(nodeLi){
  	return g(nodeLi) + h(nodeLi);
  }
  function g(nodeLi){
  	var a = beginLi[0].offsetLeft - nodeLi.offsetLeft;
  	var b = beginLi[0].offsetTop - nodeLi.offsetTop;
  	return Math.sqrt(a*a + b*b);  // 利用了勾股定理
  }
  function h(nodeLi){
  	var a = endLi[0].offsetLeft - nodeLi.offsetLeft;
  	var b = endLi[0].offsetTop - nodeLi.offsetTop;
  	return Math.sqrt(a*a + b*b);
  } 
})(map,sizeGird,speed)
}