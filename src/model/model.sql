create database checkPoint;

create extension pgcrypto;

create type user_role as ENUM ('admin', 'moderator', 'user');

create type quiz_level as ENUM ('easy', 'normal', 'high');

create table users (
    user_id serial not null primary key,
    name varchar(24) not null,
    surname varchar(24) not null,
    email varchar(32) not null,
    password varchar(64) not null,
    role user_role default 'user',
    history_quiz integer[],
    score varchar(50),
    created_at timestamptz default current_timestamp
);

insert into users (name, surname, email, password, role) values 
('Asadulloh', 'Sadulayev', 'asadullokh@gmail.com', crypt('1234', gen_salt('bf')), 'user'),
('Abubakir', 'Rashidov', 'abubakir@gmail.com', crypt('1234', gen_salt('bf')), 'user'),
('Olm', 'Saidov', 'olm@gmail.com', crypt('1234', gen_salt('bf')), 'user'),
('Jonibek', 'Jamolov', 'akobir@gmail.com', crypt('1234', gen_salt('bf')), 'user'),
('Jalil', 'Jasurov', 'akobir@gmail.com', crypt('1234', gen_salt('bf')), 'user');

create table quizz (
    quizz_id serial not null primary key,
    title varchar(64) not null,
    quesstions_count varchar(20) not null,
    quizz_time varchar(20) not null,
    level quiz_level not null,
    created_at timestamptz default current_timestamp
);

insert into quizz (title, quesstions_count, quizz_time, level) values
('sass', '10 ta', '10', 'easy'),
('butstrap', '10 ta', '10', 'easy'),
('css', '15 ta', '10', 'easy'),
('React', '15 ta', '20', 'high'),
('nodeJs', '15 ta', '20', 'high');

create table questions (
    question_id serial not null primary key,
    text varchar(1000) not null,
    option1 varchar(256) not null,
    option2 varchar(256) not null,
    option3 varchar(256) not null,
    option4 varchar(256) not null,
    answer varchar(256) not null,
    quizz_id integer not null references quizz(quizz_id),
    created_at timestamptz default current_timestamp
);

INSERT INTO questions (text, option1, option2, option3, option4, answer, quizz_id) 
VALUES 
('Node.js qanday dasturlash tilida yozilgan?', 'Python', 'JavaScript', 'Java', 'C#', 'JavaScript',7),
('Node.js da asosiy paket menejeri qaysi?', 'npm', 'yarn', 'bower', 'composer', 'npm', 7),
('Node.js da server yaratish uchun qaysi modul ishlatiladi?', 'http', 'fs', 'url', 'path', 'http', 7);