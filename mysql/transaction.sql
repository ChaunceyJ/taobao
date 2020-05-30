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

