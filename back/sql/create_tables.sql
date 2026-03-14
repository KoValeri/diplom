-- Переключаемся на базу
USE book_store;
GO

-- Таблица пользователей
DROP TABLE users
GO

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
	firstName NVARCHAR(50),
	lastName NVARCHAR(50),
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(10) DEFAULT 'user'
);
GO

-- Таблица категорий
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE
);
GO

DROP TABLE books
GO

-- Таблица книг
CREATE TABLE books (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    author NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10,2),
    genre NVARCHAR(255),
    publishingHouse NVARCHAR(255),
    yearOfPublication INT,
    pages INT,
    cover NVARCHAR(100),
    ageRestrictions NVARCHAR(50),
    imageUrl NVARCHAR(255),
	rating DECIMAL(2,1),

    categoryId INT,                -- FK на таблицу категорий
    CONSTRAINT FK_books_categories FOREIGN KEY (categoryId)
        REFERENCES categories(id)
        ON DELETE SET NULL
);
GO

-- Удаляем внешний ключ
ALTER TABLE books
DROP CONSTRAINT FK_books_categories;
GO

-- Теперь можно удалить таблицу категорий
DROP TABLE categories;
GO

INSERT INTO categories (name) VALUES
('Художественная литература'),
('Комиксы и манга'),
('Детская литература'),
('Психология'),
('Бизнес-литература');

--На всякий для удаления
DELETE FROM users
WHERE id = 2
GO