--using postgres database on localhost
CREATE DATABASE shorturldb;

CREATE TABLE short_url_tbl (
	id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	original_url varchar(255) not null unique,
	short_url varchar(255) not null unique,
	create_date timestamp not null default Current_Date
);