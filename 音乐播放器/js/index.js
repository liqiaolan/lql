window.onload=function(){
	let song=document.querySelector('.song');
	let singer=document.querySelector('.singer');
	let ul=document.querySelector('ul');
	let li=document.querySelectorAll('li');
	let pause=document.querySelector('.pause');
	let audio=document.querySelector('audio');	
	let img=document.querySelector('img');
	//定义一个数组用于存储收藏的音乐
	let  contact = [
	  {"name":"李巧兰","phone":"18734969043","pinyin":"lql"},
	  {"name":"安玉","phone":"18734768909","pinyin":"ay"},];
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }
	  let i=0;
	  i++;
	  if(i==database.length){
	  	 i=0;
	  }
      render(database[i]);
//    console.log(database[0])
      function render(data){
      	song.innerText=data.songs;
      	singer.innerText=data.name;
      	audio.src=data.src;
      	img.src=data.photo;
      	ul.innerHTML='';
      	for(let i=0;i<data.lyrics.length;i++){
      		ul.innerHTML+=`
      		  <li>${data.lyrics[i].lyric}</li>
      		`;
      	}
      }
  
let current=document.querySelector('.current');
let duration=document.querySelector('.duration');
let progress=document.querySelector('.progress');
let progressW=progress.offsetWidth;
let progressB=document.querySelector('.progressB');
let video=document.querySelector('.video');
let vw=video.offsetWidth;
let videoA=document.querySelector('.videoA');
let videoB=document.querySelector('.videoB');
audio.ontimeupdate=function(){
	//对现在时间和总时间进行设置
	 let cd=Math.floor(audio.currentTime/60);
	 let cc=Math.floor(audio.currentTime%60);	
	  if(cd>=10){
	     cd=cd;
	 }else{
	     cd=`0${cd}`;
	 }
	 
	 if(cc>=10){
	     cc=cc;
	 }else{
	     cc=`0${cc}`;
	 } 
	 current.innerText=`${cd}:${cc}`;	 
	 let md=Math.floor(audio.duration/60);
	 let mc=Math.floor(audio.duration%60);
	 
	 if(md>=10){
	     md=md;
	 }else{
	     md=`0${md}`;
	 }
	 
	 if(mc>=10){
	     mc=mc;
	 }else{
	     mc=`0${mc}`;
	 } 
	 duration.innerText=`${md}:${mc}`;
	 //对进度条进行设置
	 let prs=Math.floor((audio.currentTime/audio.duration)*progressW);
	 progressB.style.width=`${prs}px`;
	 //让歌词上移     原理是让当前唱的这句以后的重新展示
//	console.log(database[0].lyrics) 进行时间的对比
	database[i].lyrics.forEach((element,index)=>{
			//让当前唱的这行显示在第三行
			 let a=index;
			if(index<3){
				a=0;
			}else{
				a -= 2;
			}
			//让当前显示的这行改变样式
		if(`${cd}:${cc}`==element.time){
			//调用render
			  ul.innerHTML='';
      	 for(let j=a;j<database[i].lyrics.length;j++){
      		ul.innerHTML+=`
      		  <li class='list${j}';>${database[i].lyrics[j].lyric}</li>
      		`;
      		
      	}
      	    let lis=document.querySelector(`.list${index}`);
//		    console.log(lis);
		    lis.style.color='red';
     }
	})

}
	//对音量进行设置   音量的范围是0-1
	 videoA.onmousedown=function(e){
	 	let cx=e.clientX;
	 	let cw=videoA.offsetLeft;
	 	video.onmousemove=function(e){
	 		let ex=e.clientX;
	 		let lefts=ex-cx+(cw+7);
//	 		let widths=(lefts/vw)*100;
//	 		console.log(widths)
            if(lefts<0){
            	lefts=0
            }
            if(lefts>vw){
            	lefts=vw;
            }
	 		videoA.style.left=lefts+'px';
	 		videoB.style.width=lefts+7+'px';
	 		audio.volume=lefts/200;
	 	}
	 	video.onmuseup=function(e){
	 		video.onmousemove=null;
	 		video.onmuseup=null;
	 	}
	 }

//下一曲
let next=document.querySelector('.next');
next.onclick=function(){
	i++;
	if(i==database.length){
		i=0;
	}
	render(database[i]);
		  	 audio.play();
		pause.classList.add('icon-zanting'); 		  	 
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }	  
}
//上一曲
let last=document.querySelector('.last');
last.onclick=function(){
	i--;
	if(i==-1){
		i=database.length-1;
	}
	render(database[i]);
		  	 audio.play();
		pause.classList.add('icon-zanting'); 		  	 
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }			
}
//单曲循环播放
let dQ=document.querySelector('.icon-danquxunhuan');
  dQ.onclick=function(){
  	const dq=i;
  	render(database[dq]);
		audio.play();
		pause.classList.add('icon-zanting'); 		  	 
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }	  	
  }
//随机循环播放
let sJ=document.querySelector('.icon-suiji');
  sJ.onclick=function(){
  	let sj=Math.floor(Math.random()*database.length);
	render(database[sj]);
		audio.play();
		pause.classList.add('icon-zanting'); 		  	 
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }			
  }  
//顺序播放
let sX=document.querySelector('.icon-ttpodicon');
  sX.onclick=function(){
     i++; 	
	  if(i==database.length){
	  	 i=0;
	  }     
	render(database[i]);
		audio.play();
		pause.classList.add('icon-zanting'); 		  	 
	  pause.onclick=function(){
		  if(audio.paused){
		  	 audio.play();
		  }else{
		  	audio.pause();
		  }  	
		pause.classList.toggle('icon-zanting');      
	  }			
  }
  //收藏
  let sC=document.querySelector('.icon-shoucang');
  console.log(sC);
	sC.onclick=function(){
//	   love.push(database[i]);
//	   let sclocal=getsclocal();
//	   console.log(sclocal);
	}
//	function getsclocal(){
		//使用getItem来获取数据   如果不存在返回false   存在将字符串转化为对象
//	      let contacts= localStorage.getItem('love')? JSON.parse(localStorage.getItem('love')):false;
	//如果没有
//	if(!false){
		//JSON.stringify  将对象转化为字符串
//		localStorage.setItem('contents',JSON.stringify(love));
//		contents=JSON.parse(localStorage.getItem('love'));
//	}
//	  return  contents;
//	 console.log(contacts) ;
//	}


	let contactS=getcontact();
	console.log(contactS)
//	console.log(contactS.length)
	function  getcontact(){
		  //使用getItem获取数据
	      let contacts= localStorage.getItem('contact')? JSON.parse(localStorage.getItem('contact')):false;
//	      let contacts= localStorage.getItem('love')? JSON.parse(localStorage.getItem('love')):false;
	      //如果没有
	      localStorage.clear()
//	      if(!contacts){
//	      	 localStorage.setItem('contact',JSON.stringify(contact));
//	      	 contacts=JSON.parse(localStorage.getItem('contact'));
////	      	 console.log( typeof contacts);
//	      }
//	      console.log(typeof contacts)   string 
	       return   contacts;
	      
	}
}
