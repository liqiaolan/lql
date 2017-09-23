window.onload=function(){
	let canvas=document.querySelector('canvas');
	let draw = new Draw(canvas);
	//画实线
	let iconLine=document.querySelector('.icon-line');
	iconLine.onclick=function(){
		draw.solidLine();
	}
	//画虚线
	let iconXuxian=document.querySelector('.icon-xuxian');
	iconXuxian.onclick=function(){
		draw.dashLine(4,10);
	}
	//画矩形
	let rectAngle=document.querySelector('.icon-ft-rectangle');
	rectAngle.onclick=function(){
		draw.rectAngle();
	}
	//画描边矩形
//	let rectS=document.querySelector('.icon-juxing');
//	rectS.onclick=function(){
//		draw.rectS();
//	}	
	//画圆
	let iconYuan=document.querySelector('.icon-yuan');
	iconYuan.onclick=function(){
		draw.circle();
	}
	//画描边圆
//	let circleS=document.querySelector('.icon-iconfontwancheng');
//	circleS.onclick=function(){
//		draw.circleS(7);
//	}
	//多角形
	let djx=document.querySelector('.icon-duobianxing1');
	djx.onclick=function(){
		draw.djx(5);
	}
	//画正几边形
	let iconDBX=document.querySelector('.icon-duobianxing');
	iconDBX.onclick=function(){
		draw.dbx(7);
	}
	//使用铅笔画线
	let iconQianbi=document.querySelector('.icon-qianbi');
	iconQianbi.onclick=function(){
		draw.qb();
	}
	//文字
	let iconWenzi=document.querySelector('.icon-wenzi');
	iconWenzi.onclick=function(){
		draw.word('Hello');
	}
	//画板还原
	let nullHB=document.querySelector('.icon-huabuhuanyuan');
	nullHB.onclick=function(){
		draw.nullHB();		
	}
	//撤销
	let iconCancel=document.querySelector('.icon-cancel');
	iconCancel.onclick=function(){
		draw.cancel();
	}
			//ctrl+z撤销
	 document.onkeydown=function(e){
	 	if(e.ctrlKey && e.keyCode==90){
			draw.cancel();     	
	    } 
	}	
	//橡皮擦
	let eraser=document.querySelector('.eraser');
	let clear=document.querySelector('.icon-xiangpica-copy');
	clear.onclick=function(){
		draw.clear(eraser);
	}
}
