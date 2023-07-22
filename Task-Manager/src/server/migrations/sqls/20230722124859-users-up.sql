/* Replace with your SQL commands */
create table if not exists users(
    id int auto_increment primary key,
    email varchar(50) unique,
    user_name varchar(50) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    password varchar(255) not null
)