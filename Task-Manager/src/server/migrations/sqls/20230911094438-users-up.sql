/* Replace with your SQL commands */
create table if not exists users(
    id int auto_increment primary key,
    email varchar(50) unique,
    username varchar(50) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    date_of_birth date not null,
    password varchar(255) not null,
    password_confirm varchar(255) not null,
    role enum('user', 'admin') default 'user' not null,
    active boolean default true,
    createdAt date not null
);