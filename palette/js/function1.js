function Draw(canvas,mask){
	//画板的属性
	this.canvas=canvas;
	this.cvs=this.canvas.getContext('2d');
	this.widths=this.canvas.width;
	this.heights=this.canvas.height;
	this.mask=mask;
	
	//样式的属性
	this.fillColor='red';
	this.strokeColor='red';
	this.lineWidth=2;
	this.lineCap='butt';
	
	//历史记录的样式
	this.data=[];
	
	//描边，填充的样式
	this.styles='stroke';
	
	//传的边数
	this.num=5;
	
	//裁剪的属性
	this.temp=null;
	
}

//Draw的原型对象方法
Draw.prototype={
	//默认样式的方法
	initStyle:function(){
	  this.cvs.fillStyle=this.fillColor;
	  this.cvs.strokeStyle=this.strokeColor;
	  this.cvs.lineWidth=this.lineWidth;
	  this.cvs.lineCap=this.lineCap;
	  this.cvs.setLineDash([0,0]);
	  this.cvs[this.styles]();
	},
	//画实线的函数
	line:function(ox,oy,ex,ey){
		this.cvs.beginPath();
		this.cvs.moveTo(ox,oy);
		this.cvs.lineTo(ex,ey);
		this.cvs.closePath();
	},
	//画虚线的函数
	dash:function(ox,oy,ex,ey){
		
		this.cvs.beginPath();
		this.cvs.moveTo(ox,oy);
		this.cvs.lineTo(ex,ey);
		this.cvs.closePath();
	    this.cvs.setLineDash([3,10]);	
//		this.cvs.stroke();
	},
	//画矩形
	rectA:function(ox,oy,ex,ey){
    	this.cvs.beginPath();
        this.cvs.rect(ox,oy,ex-ox,ey-oy);
        this.cvs.closePath();
	},
	//画圆
	circle:function(ox,oy,ex,ey){
		let r=Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2));
		this.cvs.beginPath();
		this.cvs.arc(ox,oy,r,0,2*Math.PI,false);
        this.cvs.closePath();    			
	},
	//多边形
	dbx:function(ox,oy,ex,ey){
		let deg=360/this.num;
		let rad = deg*Math.PI/180;    
		let r=Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2));  			
		this.cvs.beginPath();
		this.cvs.moveTo(ox+r,oy);
		for(let i=0;i<this.num;i++){
			this.cvs.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
		}
		this.cvs.closePath();		
	},
	//多角形
	djx:function(ox,oy,ex,ey){
	    let that=this;
		let deg=360/(2*this.num);
		let rad = deg*Math.PI/180;    
		let r=Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2));  
		let sr=0.5*r;
		this.cvs.beginPath();
		this.cvs.moveTo(ox+r,oy);
		for(let i=1;i<2*this.num;i++){
         if(i%2==0){
			this.cvs.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
          }
          if(i%2==1){
			this.cvs.lineTo(ox+sr*Math.cos(rad*i),oy+sr*Math.sin(rad*i));
          }
		}
		this.cvs.closePath();		
	},
	//铅笔
	qianbi:function(){
//		console.log(1)
		let that=this;
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
				that.cvs.beginPath();
				that.cvs.moveTo(ox,oy);
			that.mask.onmousemove=function(e){
				let ex=e.offsetX,ey=e.offsetY;
				//再下次画的时候将上一次的放在画板上
				if(that.data.length>0){
					that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}
				that.cvs.lineTo(ex,ey);
				that.initStyle();
			}
		that.mask.onmouseup=function(){
			//在每一次鼠标移起的时候存储的内容
			that.data.push(that.cvs.getImageData(0,0,
			  that.widths,that.heights));
			that.mask.onmousemove=null;
			that.mask.onmouseup=null;
		}
		}				
	},
	//撤销
	cancel:function(){
//		console.log(1);
    	let that=this;
 		if(that.data.length>=1){
 		   that.data.pop();
 		}
 		if(that.data.length==0){
 			that.cvs.clearRect(0,0,that.widths,that.heights);
 			return;
 		}
 		that.cvs.putImageData(that.data[that.data.length-1],0,0);		
	},
	//橡皮擦
	eraser:function(obj){
    	let that=this;
    	this.mask.onmousedown=function(e){
   		      	e.preventDefault();
   		      that.mask.onmousemove=function(e){
    	  	  obj.style.display='block';
				let w=obj.offsetWidth;
//				console.log(w)
				let h=obj.offsetHeight;
    			let ex=e.offsetX,ey=e.offsetY;
    			let lefts=ex-w/2;
//  			console.log(lefts)
    			let tops=ey-h/2;
    			//让橡皮跟着鼠标移动
    			if(lefts<=0){
    				lefts=0;
    			}
    			if(lefts>ex-w){
    				lefts=ex-w;
    			}    		
    			if(tops<=0){
    				tops=0;
    			}
    			if(tops>ey-h){
    				tops=ey-h;
    			}     			
    			//让鼠标点击后在eraser的中间位置  -h/2   -w/2
    			obj.style.left=`${lefts}px`;
    			obj.style.top=`${tops}px`;
    			that.cvs.clearRect(lefts,tops,w,h);
    		}
    	 that.mask.onmouseup=function(){
    	  	obj.style.display='none';
    	  //当鼠标抬起的时候将画的线存储起来    			
    		that.data.push(that.cvs.getImageData(0,0,
    		that.widths,that.heights));
    	  	that.mask.onmousemove=null;
    	  	that.mask.onmouseup=null;
    	  	that.mask.onmousedown=null;
    	 }  	 
      }    			
	},
	//清除画板
	nullHB:function(){
	   this.cvs.clearRect(0,0,this.widths,this.heights);
	   this.data.length=0;
	},	
	//反相
	colorR:function(){
		let imgData=this.cvs.getImageData(0,0,this.widths,this.heights);
		for(let i=0;i<imgData.data.length;i+=4){
			//改变rgb   a不需要改变
//			console.log(1)
			imgData.data[i]=255-imgData.data[i];
			imgData.data[i+1]=255-imgData.data[i+1];
			imgData.data[i+2]=255-imgData.data[i+2];
		}
		//将图像放在画板上
		this.cvs.putImageData(imgData,0,0);
	},
	//裁剪
	caijian:function(cjObj){
		//找到按下的位置让裁剪的出来
		let that=this;
		this.mask.onmousedown=function(e){
           let ox=e.offsetX,oy=e.offsetY;
       	   let minX,minY;
       	   let w,h;
           that.mask.onmousemove=function(e){
           	   let ex=e.offsetX,ey=e.offsetY;
           	   w=Math.abs(ex-ox),h=Math.abs(ey-oy);
           	   minX = ex>=ox? ox:ex;
           	   minY = ey>=oy? oy:ey;
           	   cjObj.style.cssText=`
           	     display:block;
           	     width:${w}px;
           	     height:${h}px;
           	     left:${minX}px;
           	     top:${minY}px;
           	   `;
           }
           that.mask.onmouseup=function(e){
           	//getImageData为
//         	console.log(typeof that.cvs.getImageData)
//         	console.log(that.cvs.getImageData)
           	  that.temp=that.cvs.getImageData(minX,minY,w,h);
              that.cvs.clearRect(minX,minY,w,h);
              that.data.push(that.cvs.getImageData(0,0,that.widths,that.heights));
           	  that.cvs.putImageData(that.temp,minX,minY);
           	  that.mask.onmousemove=null;
           	  that.mask.onmouseup=null;
           	  that.drag(minX,minY,w,h,cjObj);
           }
		}
	},
	//裁剪的拖拽的功能
	drag:function(minX,minY,w,h,Obj){
		//让谁拖拽，  拖拽的位置， 拖拽的大小
		let that=this; 
		this.mask.onmousemove=function(e){
			let ex=e.offsetX,ey=e.offsetY;
				if(ex>minX && ex<minX+w && ey>minY && ey<minY+h){
					that.mask.style.cursor='move';
				}else{
					that.mask.style.cursor='default';
				}	
		}
		

		 this.mask.onmousedown=function(e){
		 	 e.preventDefault();
		 	  let ox=e.offsetX,oy=e.offsetY;
		 	  let lefts,tops;
			that.mask.onmousemove=function(e){
		      that.cvs.clearRect(0,0,that.widths,that.heights);
		       if(that.data.length>0){
		       	
		       that.cvs.putImageData(that.data[that.data.length-1],0,0);
		       }
			  let ex=e.offsetX,ey=e.offsetY;
		       lefts=minX+(ex-ox);
		       tops=minY+(ey-oy);
		       if(lefts<0){
		       	 lefts=0
		       }
		       if(lefts>that.widths-w){
		       	lefts=that.widths-w;
		       }
		       if(tops<0){
		       	 tops=0
		       }
		       if(tops>that.heights-h){
		       	tops=that.heights-h;
		       }		       
			  Obj.style.left=lefts+'px';
			  Obj.style.top=tops+'px';
		      that.cvs.putImageData(that.temp,lefts,tops);
			}
			that.mask.onmouseup=function(){
				that.data.push(that.cvs.getImageData(0,0,that.widths,that.heights));
				that.temp=null;
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
				that.mask.onmousedown=null;
				Obj.style.display='none';
				that.mask.style.cursor='default';
			}
		 }
	},
	//文字
	font:function(){
		let that=this;
		this.mask.onmousedown=function(e){
			e.preventDefault();
			let ox=e.offsetX,oy=e.offsetY;
			let divF=document.createElement('div');
		    let lefts,tops;
			divF.style.cssText=`
			   width:120px;height:40px;
			   border:1px dashed #007CFF;
			   position:absolute; top:0px;
			   left:0px;
			`;
			divF.style.left=`${ox}px`;
			divF.style.top=`${oy}px`;
			//可编辑区域
			divF.contentEditable='true';
			this.appendChild(divF);
		  	that.mask.onmousedown=null;
		  divF.onblur=function(){
		  	let value=divF.innerText;
		  	//将div从页面中divF.offsetHeight清除
		  	let lefts=divF.offsetLeft;
		  	let tops=divF.offsetTop;
		  	
		  	that.mask.removeChild(divF);
		  	divF=null;
		  	that.cvs.font='bold 20px helvetica';
		  	that.textAlign='center';
		  	that.textBaseline='middle';
		  	that.cvs.fillText(value,lefts,tops);
		  }
		  //将文本框进行拖动设置
		  divF.onmousedown=function(e){
		  	let dx=this.offsetLeft,dy=this.offsetTop;
			let cx=e.clientX,cy=e.clientY;
//			console.log(1)
		  	that.mask.onmousedown=null;
			  that.mask.onmousemove=function(e){
			  	 let ex=e.offsetX,ey=e.offsetY;
				 let cx1=e.clientX,cy1=e.clientY;
			  	 let cx2=cx1-cx, cy2=cy1-cy;
			  	 lefts=dx+cx2, tops=dy+cy2;
			  	if(lefts<=0){
			  		lefts=0
			  	}
			  	if(lefts>=that.widths-divF.offsetWidth){
			  		lefts=that.widths-divF.offsetWidth;
			  	}
			  	if(tops<=0){
			  		tops=0
			  	}
			  	if(tops>=that.heights-divF.offsetHeight){
			  		tops=that.heights-divF.offsetHeight;
			  	}	
			  	console.log(tops)
//			  	console.log(that.heights-divF.offsetHeight)
				 divF.style.left=`${lefts}px`;
				 divF.style.top=`${tops}px`;
			  }
			  divF.onmouseup=function(){
			  	//存储数据
			  	 that.data.push(that.cvs.getImageData(0,0,that.widths,that.heights));
			  	 that.mask.onmousemove=null;
		       	 divF.onmouseup=null;		  	 
			  }
		  }
		}
	},
	//调用的主对象
	drawD:function(type){
		let that=this;
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.mask.onmousemove=function(e){
				let ex=e.offsetX,ey=e.offsetY;
                that.cvs.clearRect(0,0,that.widths,that.heights);
				//在每次清除后将上一次的放入画板中
				if(that.data.length>0){
					that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}
				
				that.initStyle();
                that[type](ox,oy,ex,ey);
              
			}
			that.mask.onmouseup=function(){
				//每次抬起鼠标的时候将画板上的内容存储下来
				that.data.push(that.cvs.getImageData(0,0,that.widths,that.heights))
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
			}
			
		}
	}
	
}
