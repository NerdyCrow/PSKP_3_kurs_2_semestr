create database nodelab23


use nodelab23;
CREATE TABLE users (
	id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL
);

insert users(username, password) values
	('victor', 'victor'),
    ('test1', 'test1');