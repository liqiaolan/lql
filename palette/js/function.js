function Draw(canvas){
	//画板的属性
	this.canvas=canvas;
	this.cvs=this.canvas.getContext('2d');
	//样式的属性
	this.cvs.lineWidth=2;
	this.cvs.lineCap='butt';
	this.cvs.fillStyle='#000';
	this.cvs.strokeStyle='#000';
	//撤销的属性
	this.data=[];
}
Draw.prototype={
	//画实线
    solidLine:function(){
		let that=this;
		this.canvas.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.canvas.onmousemove=function(e){
				let ex=e.offsetX,ey=e.offsetY;
				that.cvs.clearRect(0,0,that.canvas.width,that.canvas.height);
				//线清除画板在再次画的时候将原来的放在画板中
				if(that.data.length>0){
				   that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}
				that.cvs.beginPath();
				that.cvs.moveTo(ox,oy);
				that.cvs.lineTo(ex,ey);
				that.cvs.closePath();
				that.cvs.setLineDash([0,0]);				
				that.cvs.lineWidth=3;
				that.cvs.strokeStyle='deepskyblue';
				that.cvs.stroke();
				that.canvas.onmouseup=function(){
					//当鼠标抬起的时候将画的线存储起来
					that.data.push(that.cvs.getImageData(0,0,that.canvas.width,that.canvas.height));
					that.canvas.onmousemove=null;
					that.canvas.onmouseup=null;
		         }
				}
			}
    },
    //画虚线
    dashLine:function(height,spacing){
		let that=this;
		this.canvas.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.canvas.onmousemove=function(e){
				let ex=e.offsetX,ey=e.offsetY;
				that.cvs.clearRect(0,0,that.canvas.width,that.canvas.height);
				//线清除画板在再次画的时候将原来的放在画板中
				if(that.data.length>0){
				   that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}
				that.cvs.beginPath();
				that.cvs.moveTo(ox,oy);
				that.cvs.lineTo(ex,ey);
				that.cvs.closePath();
				that.cvs.setLineDash([height,spacing]);
				that.cvs.lineWidth=3;
				that.cvs.strokeStyle='deepskyblue';
				that.cvs.stroke();
				that.canvas.onmouseup=function(){
					//当鼠标抬起的时候将画的线存储起来
					that.data.push(that.cvs.getImageData(0,0,that.canvas.width,that.canvas.height));
					that.canvas.onmousemove=null;
					that.canvas.onmouseup=null;
		
				}
			}
		}    	
    },
    //画矩形
    rectAngle:function(){
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		this.canvas.onmousemove=function(e){
    			let ex=e.offsetX,ey=e.offsetY;
    			let widths=ex-ox;
    			let heights=ey-oy;
    			this.cvs.clearRect(0,0,this.canvas.width,this.canvas.height);
    		    if(this.data.length>0){
    		    	this.cvs.putImageData(this.data[this.data.length-1],0,0);
    		    }
    			this.cvs.beginPath();
    			this.cvs.rect(ox,oy,widths,heights);
    			this.cvs.fillStyle='red';
    			this.cvs.fill();
    		}.bind(this);
    	  this.canvas.onmouseup=function(){
    	  	this.data.push(this.cvs.getImageData(0,0,this.canvas.width,this.canvas.height));
    	  	this.canvas.onmousemove=null;
    	  	this.canvas.onmouseup=null;
    	  }.bind(this);
    	}.bind(this);
    },
    //画描边矩形
    rectS:function(){
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		this.canvas.onmousemove=function(e){
    			let ex=e.offsetX,ey=e.offsetY;
    			let widths=ex-ox;
    			let heights=ey-oy;
    			this.cvs.clearRect(0,0,this.canvas.width,this.canvas.height);
    		    if(this.data.length>0){
    		    	this.cvs.putImageData(this.data[this.data.length-1],0,0);
    		    }
    			this.cvs.beginPath();
    			this.cvs.rect(ox,oy,widths,heights);
    			this.cvs.strokeStyle='red';
    			this.cvs.stroke();
    		}.bind(this);
    	  this.canvas.onmouseup=function(){
    	  	this.data.push(this.cvs.getImageData(0,0,this.canvas.width,this.canvas.height));
    	  	this.canvas.onmousemove=null;
    	  	this.canvas.onmouseup=null;
    	  }.bind(this);
    	}.bind(this);
    },    
    //画圆
    circle:function(){
    	let that=this;
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		that.canvas.onmousemove=function(e){
				//线清除画板在再次画的时候将原来的放在画板中
				if(that.data.length>0){
				   that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}    			
    			let ex=e.offsetX,ey=e.offsetY;
    			that.cvs.beginPath();
    			that.cvs.arc(ox,oy,Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2)),
    			0,2*Math.PI,false);
				that.cvs.setLineDash([0,0]);    			
	            that.cvs.fillStyle='#BCFF00';
	            that.cvs.fill();
	            that.cvs.closePath();
    		}
    	  that.canvas.onmouseup=function(){
			//当鼠标抬起的时候将画的线存储起来
			that.data.push(that.cvs.getImageData(0,0,
				 that.canvas.width,that.canvas.height));
    	  	that.canvas.onmousemove=null;
    	  	that.canvas.onmouseup=null;
    	  }
    	}
    },
   //画描边圆
    circleS:function(widths){
    	let that=this;
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		that.canvas.onmousemove=function(e){
    			that.cvs.clearRect(0,0,
    				that.canvas.width,that.canvas.height);
				//线清除画板在再次画的时候将原来的放在画板中
				if(that.data.length>0){
				   that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}    			
    			let ex=e.offsetX,ey=e.offsetY;
    			that.cvs.beginPath();
    			that.cvs.arc(ox,oy,Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2)),
    			0,2*Math.PI,false);
				that.cvs.setLineDash([0,0]);    			
    			that.cvs.lineWidth=widths;
	            that.cvs.strokeStyle='#BCFF00';
	            that.cvs.stroke();
	            that.cvs.closePath();
    		}
    	  that.canvas.onmouseup=function(){
			//当鼠标抬起的时候将画的线存储起来
			that.data.push(that.cvs.getImageData(0,0,that.canvas.width,that.canvas.height));
    	  	that.canvas.onmousemove=null;
    	  	that.canvas.onmouseup=null;
    	  }
    	}
    },    
    //多边形
    dbx:function(num){
    	let that=this;
		let deg=360/num;
		let rad = deg*Math.PI/180;      	
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		that.canvas.onmousemove=function(e){
    			let ex=e.offsetX,ey=e.offsetY;
    			//再次画线的时候将上一次的放在原来的画板中
    			if(that.data.length>0){
    				that.cvs.putImageData(that.data[that.data.length-1],0,0);
    			}
    			let r=Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2));  			
				that.cvs.beginPath();
				that.cvs.moveTo(ox+r,oy);
				for(let i=0;i<num;i++){
					that.cvs.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
				}
				that.cvs.setLineDash([0,0]);				
				that.cvs.fillStyle='#009BFF';
				that.cvs.fill();
				that.cvs.closePath();
    		}
    		that.canvas.onmouseup=function(){
			  //当鼠标抬起的时候将画的线存储起来    			
    			that.data.push(that.cvs.getImageData(0,0,
    				that.canvas.width,that.canvas.height));
    			that.canvas.onmousemove=null;
    			that.canvas.onmouseup=null;
    		}
    	}
		}, 
	
    //多角形
    djx:function(num){
    	let that=this;
		let deg=360/(2*num);
		let rad = deg*Math.PI/180;      	
    	this.canvas.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		that.canvas.onmousemove=function(e){
    			let ex=e.offsetX,ey=e.offsetY;
    			//再次画线的时候将上一次的放在原来的画板中
    			if(that.data.length>0){
    				that.cvs.putImageData(that.data[that.data.length-1],0,0);
    			}
    			let r=Math.sqrt(Math.pow(ex-ox,2)+Math.pow(ey-oy,2));  
    			let sr=0.5*r;
				that.cvs.beginPath();
				that.cvs.moveTo(ox+r,oy);
				for(let i=1;i<2*num;i++){
                 if(i%2==0){
					that.cvs.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
                  }
                  if(i%2==1){
					that.cvs.lineTo(ox+sr*Math.cos(rad*i),oy+sr*Math.sin(rad*i));
                  }
				}
				that.cvs.setLineDash([0,0]);				
				that.cvs.fillStyle='#009BFF';
				that.cvs.fill();
				that.cvs.closePath();
    		}
    		that.canvas.onmouseup=function(){
			  //当鼠标抬起的时候将画的线存储起来    			
    			that.data.push(that.cvs.getImageData(0,0,
    				that.canvas.width,that.canvas.height));
    			that.canvas.onmousemove=null;
    			that.canvas.onmouseup=null;
    		}
    	}    	
//	  this.canvas.onmousedown=function(e){
//	      let ox=e.offsetX,oy=e.offsetY;
//	   this.canvas.onmousemove=function(e){
//		  	let ex=e.offsetX,ey=e.offsetY;
//		  	let r=Math.sqrt(Math.pow(ex-ox,2),Math.pow(ey-oy,2));
//		  	let deg=360/2*num;
//		  	let rad=deg/180*Math.PI;
//		  	this.cvs.beginPath();
//		  	this.cvs.moveTo(ox+r,oy);
//		  	for(let i=0;i<2*num;i++){
//		  		this.cvs.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
//		  	}
//	        this.cvs.fill();
//		  	this.cvs.closePath();
//	  this.canvas.onmouseup=function(){
//	  	this.canvas.onmousemove=null;
//	  	this.canvas.onmouseup=null;
//	  }
//   }.bind(this);
	},
	//铅笔画线
	qb:function(){
		let that=this;
		this.canvas.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
				that.cvs.beginPath();
				that.cvs.moveTo(ox,oy);
			that.canvas.onmousemove=function(e){
				//再下次画的时候将上一次的放在画板上
				if(that.data.length>0){
					that.cvs.putImageData(that.data[that.data.length-1],0,0);
				}
				let ex=e.offsetX,ey=e.offsetY;
				that.cvs.setLineDash([0,0]);
				that.cvs.lineTo(ex,ey);
				that.cvs.strokeStyle='greenyellow';
				that.cvs.stroke();
			}
		that.canvas.onmouseup=function(){
			//在每一次鼠标移起的时候存储canvas的内容
			that.data.push(that.cvs.getImageData(0,0,
			  that.canvas.width,that.canvas.height));
			that.canvas.onmousemove=null;
			that.canvas.onmouseup=null;
		}
		}		
	},
	//文字
	word:function(str){
		let that=this;
		this.canvas.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.cvs.font='bold 20px  helvetica'
     		that.cvs.fillText(str,ox,oy);
		}
	},
	//画板还原
	nullHB:function(){
	  this.cvs.clearRect(0,0,this.canvas.width,this.canvas.height);
	  this.data.length=0;
	},
    //撤销
    cancel:function(){
    	let that=this;
 		if(that.data.length>=1){
 		   that.data.pop();
 		}
 		if(that.data.length==0){
 			that.cvs.clearRect(0,0,that.canvas.width,that.canvas.height);
 			return;
 		}
 		that.cvs.putImageData(that.data[that.data.length-1],0,0);
	},
    //橡皮擦
    clear:function(obj){
    	let that=this;
    	this.canvas.onmousedown=function(){
   		      that.canvas.onmousemove=function(e){
    	  	  obj.style.display='block';
				let w=obj.offsetWidth;
				let h=obj.offsetHeight;
    			let ex=e.offsetX,ey=e.offsetY;
    			//让橡皮跟着鼠标移动
    			//让鼠标点击后在eraser的中间位置  -h/2   -w/2
    			obj.style.left=`${ex-w/2}px`;
    			obj.style.top=`${ey-h/2}px`;
    			that.cvs.clearRect(ex-w/2,ey-h/2,w,h);
    		}
    	 obj.onmouseup=function(){
    	  	obj.style.display='none';
    	  //当鼠标抬起的时候将画的线存储起来    			
    		that.data.push(that.cvs.getImageData(0,0,
    		that.canvas.width,that.canvas.height));
    	  	that.canvas.onmousemove=null;
    	  	that.canvas.onmouseup=null;
    	 }  	 
    }    			
    		}
 
}
