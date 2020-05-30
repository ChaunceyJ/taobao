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

