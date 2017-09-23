##                       WAMP

语句后面要加分号

```
1.mysql  没有密码  用户名为root

2.显示所有数据库    show   databases;

3.选择数据库    use   student；

4.显示表    show  tables;

5.建数据库   create database 数据库名 ;

6.删除数据库    drop database 数据库名;     删除结构

7.删除数据库   delete database数据库名;     删除内容

8.建表     create table <表名> ( <字段名1> <类型1> [,..<字段名n> <类型n>]) 建表;

9.重命名   rename table 原表名 to 新表名 改表名;

@自增的语句  auto_increment 自增的初始值

10.desc   stu  看结构

#创建表
create table student(
id int auto_increment primary key,
name varchar(50),
sex varchar(20),
date varchar(50),
content varchar(100)
)default charset=utf8;

#删除表
drop table student;

#查看表的结构
describe student;  #可以简写为desc student;

#插入数据
insert into student values(null,'aa','男','1988-10-2','......');
insert into student values(null,'bb','女','1889-03-6','......');
insert into student values(null,'cc','男','1889-08-8','......');

#查询表中的数据
select * from student;
select id,name from student;

#修改某一条数据
update student set sex='男' where id=4;

#删除数据
delete from student where id=5;

# and 且
select * from student where date>'1988-1-2' and date<'1988-12-1';

# or 或
select * from student where date<'1988-11-2' or date>'1988-12-1';
   
#between
select * from student where date between '1988-1-2' and '1988-12-1';

#in 查询制定集合内的数据
select * from student where id in (1,3,5);

#排序 asc 升序  desc 降序
select * from student order by id asc;

#分组查询 #聚合函数 
select max(id),name,sex from student group by sex;

select min(date) from student;

select avg(id) as '求平均' from student;

select count(*) from student;   #统计表中总数

select count(sex) from student;   #统计表中性别总数  若有一条数据中sex为空的话,就不予以统计~

select sum(id) from student;

#查询第i条以后到第j条的数据(不包括第i条)
select * from student limit 2,5;  #显示3-5条数据

#巩固练习
create table c(
 id int primary key auto_increment,
 name varchar(10) not null,
 sex varchar(50) ,  #DEFAULT '男' ,
 age int unsigned, #不能为负值(如为负值 则默认为0)
 sno int unique    #不可重复
);

drop table c;
desc c;

insert into c (id,name,sex,age,sno) values (null,'涛哥','男',68,1);
insert into c (id,name,sex,age,sno) values (null,'aa','男',68,2);
insert into c (id,name,sex,age,sno) values (null,'平平','男',35,3);
...

select * from c;

#修改数据 
update c set age=66 where id=2;
update c set name='花花',age=21,sex='女' where id=2
delete from c where age=21;

#常用查询语句
select name,age ,id from c
select * from c where age>40 and age<60;  #and
select * from c where age<40 or age<60;  #or
select * from c where age between 40 and 60 #between
select * from c where age in (30,48,68,99);     #in 查询指定集合内的数据
select * from c order by age desc;      #order by （asc升序 des降序）

#分组查询
select name,max(age) from c group by sex;  #按性别分组查年龄最大值
#聚合函数
select min(age) from c;
select avg(age) as '平均年龄 ' from c;
select count(*) from c;  #统计表中数据总数
select sum(age) from c;

#修改表的名字
#格式:alter table tbl_name rename to new_name
alter table c rename to a;
 
#表结构修改
create table test
(
id int not null auto_increment primary key, #设定主键
name varchar(20) not null default 'NoName', #设定默认值
department_id int not null,
position_id int not null,
unique (department_id,position_id) #设定唯一值
);

#修改表的名字
#格式:alter table tbl_name rename to new_name
alter table test rename to test_rename;

#向表中增加一个字段(列)
#格式:alter table tablename add columnname type;/alter table tablename add(columnname type);
alter table test add  columnname varchar(20);

#修改表中某个字段的名字
alter table tablename change columnname newcolumnname type;  #修改一个表的字段名
alter table test change name uname varchar(50);

select * from test;

#表position 增加列test
alter table position add(test char(10));
#表position 修改列test
alter table position modify test char(20) not null;
#表position 修改列test 默认值
alter table position alter test set default 'system';
#表position 去掉test 默认值
alter table position alter test drop default;
#表position 去掉列test
alter table position drop column test;
#表depart_pos 删除主键
alter table depart_pos drop primary key;
#表depart_pos 增加主键
alter table depart_pos add primary key PK_depart_pos
(department_id,position_id);

#用文本方式将数据装入数据库表中（例如D:/mysql.txt）
load data local infile "D:/mysql.txt" into table MYTABLE;

#导入.sql文件命令（例如D:/mysql.sql）
source d:/mysql.sql;  #或者  /. d:/mysql.sql;
```

#### 