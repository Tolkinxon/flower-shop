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

CREATE TABLE IF NOT EXISTS category(
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS flowers(
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    price DOUBLE(15, 2) NOT NULL,
    category_id INT NOT NULL,
    image_path TEXT NOT NULL,
    import_from VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    count int DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES category(id) 
);