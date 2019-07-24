CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    email VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT,
    customer_id INT(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS items (
    item_id INT AUTO_INCREMENT,
    order_id INT(100) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_price VARCHAR(255) NOT NULL,
    available BOOLEAN,
    PRIMARY KEY (item_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS admin (
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)  ENGINE=INNODB;