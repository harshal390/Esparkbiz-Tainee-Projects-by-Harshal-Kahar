create table basic_details(
    employee_id int not null auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    designation varchar(255) not null,
    address_1 varchar(255) not null,
    address_2 varchar(255),
    email varchar(255) not null,
    phone_number varchar(255) not null,
    city varchar(255) not null,
    state varchar(255) not null,
    gender varchar(255) not null CHECK(gender in("female", "male")),
    zipcode varchar(255),
    relationship_status varchar(255) not null CHECK(relationship_status in("single", "married")),
    date_of_birth date not null,
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key (employee_id)
);


create table work_experiences(
    employee_id int,
    work_experience_id int not null auto_increment,
    company_name varchar(255),
    designation varchar(255),
    start_date date,
    end_date date,
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(employee_id) REFERENCES basic_details(employee_id),
    primary key(work_experience_id)
);



create table reference_contacts(
    employee_id int,
    reference_contact_id int not null auto_increment,
    name varchar(255),
    contact varchar(255),
    relation varchar(255),
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(reference_contact_id),
    foreign key (employee_id) references basic_details(employee_id)
);

create table preferances(
    employee_id int,
    preference_id int not null auto_increment,
    preference_location varchar(255),
    notice_period int not null,
    expected_ctc int not null,
    current_ctc int not null,
    department varchar(255),
    CHECK(
        Department in('development', 'design', 'marketing')
    ),
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(preference_id),
    foreign key (employee_id) references basic_details(employee_id)
);

create table educations(
    education_id int primary key auto_increment,
    employee_id int,
    edu_type varchar(255),
    name_of_board varchar(255),
    passing_year varchar(255),
    percentage varchar(255),
    _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (employee_id) references basic_details(employee_id)
);



create table technology_details(
    technology_id int primary key auto_increment,
     employee_id int,
     technology_name varchar(255),
     technology_level varchar(255),
     foreign key (employee_id) references basic_details(employee_id)
);

create table languages(
    language_id int primary key auto_increment,
    employee_id int,
    language_name varchar(255),
    is_read tinyint,
    is_write tinyint,
    is_speak tinyint,
    foreign key (employee_id) references basic_details(employee_id)
)