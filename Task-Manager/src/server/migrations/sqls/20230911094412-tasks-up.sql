/* Replace with your SQL commands */
create table if not exists tasks(
    id int auto_increment primary key,
    name varchar(50) not null,
    description varchar(255),
    category varchar(50),
    next_repetition bigint unsigned,
    num_of_repetitions tinyint default 0 not null,
    status enum('inProgress', 'completed') default 'inProgress'
    user_id int,
    foreign key(user_id) 
    references users(id)
        on delete cascade 
        on update cascade
);