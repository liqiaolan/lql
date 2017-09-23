# ajax[asyns  javascript  and xml]

1.06-07年之间在浏览器添加    asyns 异步执行    xml  HTML的祖先  HTML是xml的扩展

xml是用来存储信息【xml存储信息慢,现在使用数据库存储信息】    HTML是呈现信息

【asyns  javascript  and  database】异步需要依赖于事件来执行

```
//在浏览器中   提供一个类   有这种能力的对象帮我们去取1.txt中的内容
var ajax=new XMLHttpRequest();
//onreadystatechange事件触发四次   
/**
 * 1.当ajax对象创建的时候    1
 * 2.当指定ajax的地址           2
 * 3.当发送的时候                     3
 * 4.当找到的地址的时候         4
 
 *  status 的服务器返回的状态码
 */
//方法一
//ajax.onreadystatechange=function(){
//	if(ajax.readyState==4){
//		if(ajax.status==200){
//			console.log(ajax.response);
//		}
//	}
//	console.log(ajax.readyState);
//}
ajax.onload=function(){
	console.log(ajax.response);
}
console.log(ajax)
//第一个参数  为请求数据的方式     
//第二个参数   请求数据的地址
//第三个参数    默认为true   
//第四个参数   默认密码   后两个参数一般不写
//默认为true   true   表示只是使用get方法去取    false   表示ajax一同去取
ajax.open('get','1.txt',true);
ajax.send()
```

ajax应用于按需加载【ajax利用JavaScript的异步机制，无刷新的或者是按照需要来加载需要的数据，能够提高用户的体验性，提高页面的加载速度，来达到模拟桌面端软件的操作模式     让基于B/S（基于浏览器）架构的软件实现  基于C/S（基于客户端，操作系统）【b/s终将代替c/s  因为网络越来越快，硬盘越来越好】架构的软件操作的便利性】

1.硬件的制约   浏览器处理      2.网速的限制【制约条件】

IE6识别不了XMLHttpRequest          response 以字符串的格式返回

```
      var ajax=window.XMLHttpRequest? new XMLHttpRequest():
      ActiveXObject('Microsoft.XMLHTTP');
//    var   respnseType='text';    一般的设置类型   指定获取数据的类型
         
      类型
     ajax.response     ajax.responseXML      buffer类型【既不是初始类型，引用类型】
      respnseType可以支持Json   document   buffer    text    空的字符串
```

## AJAX【基于http】如何获取数据

http   https[是http协议的升级，加了安全策略]   file    svn      静态服务器

file   浏览器与本地文件之间通讯的协议

http  浏览器与服务器之间通讯的协议 

ajax   只识别http和HTTPS协议      

动态的服务器   apache   iis    

### 服务器： 能够实现一切  http协议细节的模块  符合我们对服务器的理解    需要一个中间语言   php(简单优秀的语言，没有兼容性)    node.js

### 1.准备的前奏  

   1.jquery   2.原生的ajax   new   XMLHttpRequest();

   3.php   4.可编辑表格   5.ajax函数封装

### 2.应用层面

   解决什么问题      浏览器显示啥，ajax获取啥

### 3.编程思想

http协议是无状态的协议   ：   浏览器对于浏览器的http协议是单线程的

桌面端程序基于c/s是弊端不能共享            B/S可以共享

 三次握手，四次挥手    

### 4.XML和HTML    

HTML是继承xml来的   xml存储数据     HTML 呈现数据

### 5.数据库（算法和数据结构的产物）

### 6.学习的流程

1.学习最基本的语法    2.全栈书籍  

### 7.get传递的数据少        大数据传递的为大数据

```
p标签和img标签的区别
1.从写法上   
P标签为双标签    img标签单标签
2.从功能上
p标签为段落标签   img为图片标签
3.从结构上
p标签为块标签 可以设置宽高，独立成行
img标签为行内块标签  可以设置宽高，可以一行放
4.img有特定的属性   p没有特定的属性
img特定的属性  alt=''加载不成功显示   src=''   title='' 鼠标移上去的效果

```

### 8.页面中发起http请求

img    a   css/ js  form表单      发起请求就需要携带数据    form 

$_GET     

  和 $POST传递的是一个数组型的对象集合



数据的删除   异步机制           

可编辑   contenteditable='true'