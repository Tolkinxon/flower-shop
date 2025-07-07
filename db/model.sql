-- Active: 1749045156534@@127.0.0.1@3306@flower_shop
CREATE DATABASE IF NOT EXISTS flower_shop;

USE flower_shop;

CREATE TABLE IF NOT EXISTS roles(
    id INT AUTO_INCREMENT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO roles(role_name) VALUES
('Admin'),
('Customer');

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)    
);

ALTER TABLE users MODIFY role_id INT DEFAULT 2;


INSERT INTO users(first_name, last_name, phone, email, password, role_id) VALUES
('Tolkinxon', 'Soliyev', '+998774779844', 'tolkinxon@gmail.com', 'tolkinxon123', 1);

CREATE TABLE IF NOT EXISTS category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

TRUNCATE category;

ALTER TABLE flowers DROP FOREIGN KEY flowers_ibfk_1;
ALTER TABLE flowers
ADD CONSTRAINT flowers_ibfk_1
FOREIGN KEY (category_id)
REFERENCES category(id)
ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS flowers(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    price DOUBLE(15, 2) NOT NULL,
    category_id INT NOT NULL,
    image_path TEXT NOT NULL,
    import_from VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    public_id TEXT NOT NULL,
    description TEXT NOT NULL,
    count int DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES category(id) 
);

SELECT f.name, f.description, f.import_from, f.color, f.price, f.count, c.name as category_name FROM flowers f
LEFT JOIN category c ON f.category_id=c.id;