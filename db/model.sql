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

CREATE TABLE IF NOT EXISTS address(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    customer_id INT NOT NULL,
    region VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(customer_id) REFERENCES users(id) 
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS statuses(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO statuses (name) VALUES
('pending'),
('success'),
('cancel');

CREATE TABLE IF NOT EXISTS orders(
    id INT AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total_price INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address_id INT NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(customer_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(address_id) REFERENCES address(id)
    ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES statuses(id)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS order_details(
  id INT AUTO_INCREMENT,
  order_id INT NOT NULL,
  flower_id INT NOT NULL,
  quantity INT NOT NULL CHECK(quantity > 0),
  PRIMARY KEY(id),
  FOREIGN KEY(order_id) REFERENCES orders(id) 
  ON DELETE CASCADE,
  FOREIGN KEY(flower_id) REFERENCES flowers(id)
  ON DELETE CASCADE
);


SELECT a.name, a.region, a.city, a.street, CONCAT(U.first_name, " ", u.last_name) as customer_full_name  FROM address a
INNER JOIN users u ON u.id=a.customer_id WHERE a.id = 1 AND a.customer_id=1;

CREATE TABLE IF NOT EXISTS payments(
    id INT AUTO_INCREMENT NOT NULL,
    order_id INT NOT NULL,
    paid_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(order_id) REFERENCES orders(id)
    ON DELETE CASCADE 
);

ALTER TABLE payments ADD COLUMN amount INT NOT NULL;