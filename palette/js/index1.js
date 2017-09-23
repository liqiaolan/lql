window.onload=function(){
	let canvas=document.querySelector('canvas');
	let mask=document.querySelector('.mask');
//	console.log(mask)
	let draw = new Draw(canvas,mask);
	//让画板的宽高和bottom的宽高相同
//	let bottom=document.querySelector('.bottom');
//	let bottomW=bottom.offsetWidth;
//	let bottomH=bottom.offsetHeight;
//	canvas.width=bottomW-17;
//	canvas.height=bottomH;
	//选项卡功能
	let labels=document.querySelectorAll('label');
	labels.forEach((element,index)=>{
		element.addEventListener('click',function(){
	        let labelA=document.querySelector('label[active=true]');
			labelA.setAttribute('active',false);
		    element.setAttribute('active',true);				
		})

	})
	
	//调用方法
	let inputs=document.querySelectorAll('input');
	let styleS=document.querySelectorAll('.style');
//	console.log(styleS)
    //撤销事件
    let cancel=document.querySelector('#cancel');
    cancel.onclick=function(){
    	draw.cancel();
    }
    //ctrl+z事件
    document.onkeydown=function(e){
    	if(e.ctrlKey && e.keyCode){
    		draw.cancel();
    	}
    }
    //文字
    let font=document.querySelector('#font');
//  console.log(font);
    font.onclick=function(){
    	draw.font();
    }
    //保存图片
    let save=document.querySelector('.icon-baocun');
    save.onclick=function(){
    	console.log(1)
       save.href=canvas.toDataURL('image/png');
	   save.download='a.png';
    }
    //反相
    let colorR=document.querySelector('.icon-ic_invert_colors_px');
    colorR.onclick=function(){
    	draw.colorR();
    }
    //裁剪
    let cJ=document.querySelector('#caijian');
//  console.log(cJ);
    let cjObj=document.querySelector('.caijian');
//  console.log(cjObj);
    cJ.onclick=function(){
    	draw.caijian(cjObj);
    }
    //画板还原
    let nullHB=document.querySelector('.icon-huabuhuanyuan');
    nullHB.onclick=function(){
    	draw.nullHB();
    }
    //橡皮擦
    let eraser=document.querySelector('.eraser');
//  console.log(eraser);
    let clear=document.querySelector('.icon-xiangpica-copy');
    clear.onclick=function(){
    	draw.eraser(eraser);
    }
	//调用的方法名写成字符串
	let types=document.querySelectorAll('.type');
	types.forEach((element,index)=>{
        element.onclick=function(){
        	console.log(element.id)
        	if(element.id=='qianbi'){
        		console.log(1)
        		draw.qianbi();
        	}
        	else if(element.id=='djx'){
                draw.num=prompt('请选择你要输入的边数',5);		
        		
		        draw.drawD(element.id);        		
        	}else if(element.id=='dbx'){
                draw.num=prompt('请选择你要输入的边数',6);		
        		
		        draw.drawD(element.id);        		
        	}else{
        		
		       draw.drawD(element.id);
        	}
        }
	})
	//对颜色进行设置
	inputs.forEach((element,index)=>{
		element.onchange=function(){
			if(index==0){
			   draw.strokeColor=element.value
//			console.log(draw.strokeColor)
			}
			if(index==1){
				draw.fillColor=element.value;
//			console.log(draw.fillColor)
			}
		}
	})
	//对描边和填充进行设置
	styleS.forEach((element,index)=>{
		 element.onclick=function(){
		 	if(index==0){
		 		draw.styles='stroke'
		 	}
		 	if(index==1){
		 		draw.styles='fill';
		 	}
		 }
	})
}
