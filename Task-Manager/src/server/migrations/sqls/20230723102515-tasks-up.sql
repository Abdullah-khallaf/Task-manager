/* Replace with your SQL commands */
create table if not exists tasks(
    id int auto_increment primary key,
    name varchar(50) not null,
    complete boolean default false,
    user_id int,
    foreign key(user_id) 
    references users(id)
        on delete cascade 
        on update cascade
);