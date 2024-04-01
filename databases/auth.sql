create table registration(
    user_id int not null auto_increment,
    full_name varchar(255) not null,
    user_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    gender varchar(255) not null CHECK(gender in("female", "male")),
    password varchar(255) not null,
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key (user_id)
);