-- Переключаемся на базу
USE book_store;
GO

-- Таблица пользователей
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL,
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

    categoryId INT,                -- FK на таблицу категорий
    CONSTRAINT FK_books_categories FOREIGN KEY (categoryId)
        REFERENCES categories(id)
        ON DELETE SET NULL
);
GO

INSERT INTO categories (name) VALUES
('Художественная литература'),
('Манга'),
('Детская литература'),
('Научная литература'),
('Нехудожественная литература'),
('Бизнес-литература');
