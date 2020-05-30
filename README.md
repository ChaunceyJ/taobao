# 2020-2021年第二学期《Web系统与技术》作业

> 姜其升 1752058

[TOC]

## 作业要求

本次作业要求是实现一个简易的网页（类似淘宝的网店），并且能在上面进行简单的用户交互，同时有一个简单的后端支持数据持久化，实现一些简单的数据存取功能，功能详见下文。请用原生代码（禁用前端框架）实现前端，后端技术不限。

## 项目简介

本项目是一个仿照一号店网页完成的李宁网店，数据来源于李宁官网。前端使用原生html、css、js代码；后端使用Java Servlet；前后端通讯使用Ajax；数据库使用mysql；使用Tomcat，部署在阿里云服务器，地址http://47.103.27.88:8080/taobao。推荐使用现代浏览器Chrome进行访问。

## 主要功能

功能1：商品展示

功能2：用户注册登录

功能3：添加购物车

功能4：登录状态结算下单

功能5：登录状态查询历史订单信息（无需考虑订单状态）

## 主要页面

### 首页

![截屏2020-05-30下午7.07.24](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%887.07.24.png)

首页主要分为三个部分：轮播宣传部分、超级单品秒杀

部分和商品展示区（夏日潮装和挚爱尖货）。其中轮播图每秒变换一次。

![截屏2020-05-30下午7.08.43](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%887.08.43.png)

当鼠标滑动到全部类目上方是，会出现详细的分类情况。

![截屏2020-05-30下午8.11.28](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.11.28.png)

超级单品区域显示活动结束倒计时，当鼠标移动到商品图片上时，图片将放大；移动到商品上是会出现加入购物车和立即购买的按钮；点击图片将跳转到商品详情页面。图片下方显示的横条为剩余商品占原商品总数的百分比。

![截屏2020-05-30下午8.20.17](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.20.17.png)

![截屏2020-05-30下午8.20.55](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.20.55.png)

商品展示区中当鼠标移动到商品图片上时，图片将上移；移动到商品上是会出现加入购物车和立即购买的按钮；点击图片将跳转到商品详情页面。

![截屏2020-05-30下午8.25.58](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.25.58.png)

### 商品详情页面

![截屏2020-05-30下午8.27.14](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.27.14.png)

商品详情页面可以通过加减数量加入购物车和立即购买，成功后会弹出提示。

### 注册页面

![截屏2020-05-30下午8.33.59](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.33.59.png)

按照提示进行注册即可，如果不符合要求则会出现提醒，并且无法注册。注册成功后，则会直接跳转到首页。

![截屏2020-05-30下午8.35.40](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.35.40.png)

### 登录页面

![截屏2020-05-30下午8.36.50](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.36.50.png)

登录成功后自动跳转到首页并通过cookie保存状态信息，在关闭浏览器后，自动清除，同时状态栏会显示当前用户昵称；登录失败则有信息提示。

![截屏2020-05-30下午8.41.06](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.41.06.png)

### 购物车页面

![截屏2020-05-30下午9.03.44](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%889.03.44.png)

购物车功能通过本地存储实现，并通过使用```expired```字段设置购物车中商品过期时间。点击结算按钮可以购买选择的商品。

![截屏2020-05-30下午11.02.47](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%8811.02.47.png)

在购物车中没有商品时，线上为空。

### 订单页面

![截屏2020-05-30下午8.42.26](img/%E6%88%AA%E5%B1%8F2020-05-30%E4%B8%8B%E5%8D%888.42.26.png)

## API

### 登录

```apl
/login
POST
参数：user_name
		 password
返回：{success:0/1}
```

### 注册

```apl
/signup
POST
参数：user_name
		 password
		 nick_name
返回：{state:0/1}
```

### 获取全部商品信息

```apl
/getAllProduct
GET
参数：无
返回：[{
		product_id:,
		product_name:,
		now_price:,
		old_price:,
		remind_total:,
		all_total:,
		picture:
},{}]
```

### 获取部分商品信息

```apl
/productInfo
GET
参数：id
返回：[{
		name:,
		picture:,
		now_price:
},{}]

POST
参数：[{id},{}]
返回：[{
		productid:,
		productname:,
		imgsrc:,
		perPrice:
},{}]
```

### 获取订单信息

```apl
/getOrder
GET
参数：无
返回：[{
		product_id:,
		product_name:,
		imgsrc:,
		perPrice:,
		number:,
		totalPrice:,
		buyTime:
},{}]
```

### 检查用户名是否重复

```apl
/isCheckName
GET
参数：user_name
返回：{state:0/1}
```

### 购买

```apl
/buy
POST
参数：product_id
		 per_price
		 total_price
		 number_of
返回：{state:0/1,
			list:[,]}
```

## 部署

### 环境

操作系统：centos 8

JDK：8

Tomcat：8.5

Mysql：8

Docker：10

采用Docker的方式进行部署。

### 数据库

```sql
create table taobao_user
(
	user_id int auto_increment
		primary key,
	user_name varchar(30) null,
	password varchar(50) null,
	nick_name varchar(100) null
);
create table product
(
	product_id int auto_increment
		primary key,
	name varchar(200) null,
	now_price float null,
	ord_price float null,
	remind_total int null,
	all_total int null,
	picture char(200) null
);
create table transaction
(
	transaction_id int auto_increment
		primary key,
	product_id int null,
	user_id int null,
	per_price float null,
	total_price float null,
	number_of int null,
	buy_time char(50) null,
	constraint transaction___fk2
		foreign key (product_id) references product (product_id),
	constraint transaction_taobao_user_user_id_fk
		foreign key (user_id) references taobao_user (user_id)
);
```

### 项目结构

```
|--src
|  |--main
|     |--java
|     |--webapp
|        |--html
|        |--css
|        |--js
|        |--img
|        |--icon
|        |--WEB-INF
```

### 项目地址

http://47.103.27.88:8080/taobao