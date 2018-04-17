drop database if exists bamazon;

create database bamazon;
use bamazon;

create table department (
	departmentId int not null auto_increment,
	departmentName VarChar(50) not null,
	overheadCosts decimal(13, 4) not null default 0,
	primary key (departmentId)
);

insert department (departmentName, overheadCosts)
values ('Clothing', 1000.00),
	('Electronics', 1000.00),
	('Health & Beauty', 100.00),
	('Office Supply', 10.00);


create table product (
	productId int not null auto_increment,
	productName varchar(50) not null,
	departmentId int,
	price decimal(13, 4) not null default 0,
	stock int,
	primary key (productId),
	foreign key (departmentId)
		references department(departmentId)
);


insert product ( productName, departmentId, price, stock )
values ('Shorts', 1, 5.50, 50),
	('Socks', 1, 2.00, 100),
	('Television', 2, 9999.99, 20),
	('Smart Phone', 2, 899.99, 13),
	('Shampoo', 3, 2.50, 10),
	('Toothpaste', 3, 2.99, 10),
	('Pen', 4, 0.95, 23),
	('Paper', 4, 1.95, 23),
	('Scissors', 4, 0.50, 2),
	('USB Drive', 2, 24.99, 60);

create table role (
	roleId int not null auto_increment,
	roleName varchar(50) not null,
	primary key (roleId)
);

create table user (
	userId int not null auto_increment,
	userName varchar(50) not null unique,
	userPassword varchar(50) not null,
	roleId int not null,
	primary key (userId),
	foreign key (roleId)
		references role(roleId)
);

insert role (roleName)
values('admin')
, ('customer');

set @adminId = (select roleId from role where roleName = 'admin');

insert user (userName, userPassword, roleId)
values ('admin', 'admin', 1);