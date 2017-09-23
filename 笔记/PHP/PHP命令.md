#### 1. $db->set_charset("utf8");   设置编码格式

#### 2.在命令窗口中修改密码

##### A.修改密码   mysql>   set password  for  用户名@localhost=password('新密码');

#### 3.mysql  -hlocalhost -P3306 -u root -p   -P为端口号  -p密码  -u用户名

#### 4.%表示可以在任何一台电脑登录

#### 5.在授权的前后使用一下刷新   flush  privileges           grant  select,update  on   数据库名.表名   to   用户名  identified   by  '1234445   ';       授权[ to   uek@]localhost]    

#### identified[辨认，确认]

#### 6.添加用户   A. use mysql  B.  insert  into  user(`Host`,`User`,`Password`) 

#### (Host,User,Password)values('%'，‘xxx',password('密码));

#### flush  privileges;

图形化管理工具

WySQLWorkbench         Navicat Premium

###                  标签对的属性    标签的属性

```
HTML的属性分为两种
1.标签的属性
js:   let div=document.querySelector('div').setAttribute('aa','bb');
jquery:   $('div').attr("aa",'bb');
2.标签对的属性
js:   let  div=document.querySelelctor('div').aa='bb';
jquery:  $('div').data("aa",bb);
```

svn   git   版本控制工具

SVN 

git   version 查看版本

git  init         初始化

git  commit   -m  'demo'   本地版本

git   remote   add   origin  'http;

git  push  orinin master     远程仓库里面

git  clone    "http:hdsajhd"

git  pull

git   add  +文件        确定要提交的内容



多选框接收多个数据的时候需要中括号  <input  type='text'  name='live[]'>