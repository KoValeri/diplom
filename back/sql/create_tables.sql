-- Переключаемся на базу
USE book_store;
GO

-- Если снесла все таблицы:
-- это 1 шаг
-- Удаляем старые таблицы, если есть
DROP TABLE IF EXISTS book_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS book_additional_images;
GO

-- с этой по книги (без доп фото) создаёшь таблицы
-- Таблица пользователей
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50),
    lastName NVARCHAR(50),
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(10) DEFAULT 'user'
);
GO

-- Таблица категорий с постером
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    poster NVARCHAR(255) NULL -- ссылка на обложку категории
);
GO

-- Таблица подкатегорий
CREATE TABLE subcategories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    categoryId INT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    CONSTRAINT FK_subcategories_categories FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);
GO

-- Таблица книг
CREATE TABLE books (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    author NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10,2),
    publishingHouse NVARCHAR(255),
    yearOfPublication INT,
    pages INT,
    cover NVARCHAR(100),
    ageRestrictions NVARCHAR(50),
    imageUrl NVARCHAR(255),
    rating DECIMAL(2,1),
    series NVARCHAR(255) NULL,
    subcategoryId INT,
	discount DECIMAL(3,2) DEFAULT 0,
    CONSTRAINT FK_books_subcategories FOREIGN KEY (subcategoryId) REFERENCES subcategories(id) ON DELETE SET NULL
);
GO

-- Таблица жанров
CREATE TABLE genres (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE
);
GO

-- Связь книги и жанра (многие-ко-многим)
CREATE TABLE book_genres (
    bookId INT NOT NULL,
    genreId INT NOT NULL,
    PRIMARY KEY (bookId, genreId),
    CONSTRAINT FK_book_genres_books FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT FK_book_genres_genres FOREIGN KEY (genreId) REFERENCES genres(id) ON DELETE CASCADE
);
GO

CREATE TABLE book_additional_images (
    id INT IDENTITY(1,1) PRIMARY KEY,
    bookId INT NOT NULL,
    imageUrl NVARCHAR(255) NOT NULL,
    CONSTRAINT FK_book_additional_images_books FOREIGN KEY (bookId) 
        REFERENCES books(id) ON DELETE CASCADE
);
GO

--Заполняешь категории и подкат, затем в vs вносишь книги в табблицу, затем уже доп фотки
-- Категории
INSERT INTO categories (name, poster) VALUES
('Художественная литература', '/books/master_and_margarette.jpg'),
('Комиксы и манга', '/books/jujutsu_kaisen13.jpg'),
('Детская литература', '/books/alice_in_wonderland.jpg'),
('Психология и саморазвитие', '/books/gentle_towards_yourself.jpg'),
('Бизнес-литература', '/books/rich_vavilon.jpg'),
('Научная литература', '/books/poisons_around_inside.jpg'),
('Учебники', '/books/Little_Prince.jpg'),
('Технологии', '/books/React_book.jpg');

-- Подкатегории
INSERT INTO subcategories (categoryId, name) VALUES
-- Художественная литература
(1, 'Романы'),
(1, 'Классика'),
(1, 'Поэзия'),
(1, 'Фэнтези'),
(1, 'Детектив'),
(1, 'Приключения'),
-- Комиксы и манга
(2, 'Комиксы'),
(2, 'Манга'),
(2, 'Манхва'),
(2, 'Графические новеллы'),
(2, 'Ранобэ'),
-- Детская литература
(3, 'Сказки'),
(3, 'Развивающие книги'),
-- Психология
(4, 'Популярная психология'),
(4, 'Саморазвитие'),
-- Бизнес-литература
(5, 'Маркетинг'),
(5, 'Менеджмент'),
(5, 'Финансы'),
(5, 'Предпринимательство'),
-- Научная литература
(6, 'Физика'),
(6, 'Химия'),
(6, 'Биология'),
(6, 'Математика'),
(6, 'История древнего мир'),
(6, 'История средневековья'),
(6, 'Новая история'),
-- Учебники
(7, 'Школьные учебники'),
(7, 'Иностранные языки'),
-- Наука и технологии
(8, 'IT и программирование'),
(8, 'Инженерия'),
(8, 'Кибербезопасность');
GO

-- Таблица жанров
INSERT INTO genres (name) VALUES
('Боевое фэнтези'),
('Тёмное фэнтези'),
('Ужасы'),
('Роман'),
('Сатирический роман'),
('Классика'),
('Поэма'),
('Детектив'),
('Приключения'),
('Сёнэн'),
('Драма'),
('Любовный роман'),
('Комиксы'),
('Манга'),
('Манхва'),
('Графическая новелла'),
('Ранобэ'),
('Научная фантастика'),
('Психология'),
('Бизнес'),
('История'),
('Наука'),
('Мистика'),
('Философский роман'),
('Мифология'),
('Готическая литература'),
('Триллер'),
('Языки и среды программирования');

--Вставка в доп книги
INSERT INTO book_additional_images (bookId, imageUrl) VALUES
(22, '/books_extra_photos/empire_of_the_damned1.jpg'),
(22, '/books_extra_photos/empire_of_the_damned2.jpg'),
(22, '/books_extra_photos/empire_of_the_damned3.jpg'),
(22, '/books_extra_photos/empire_of_the_damned4.jpg');


SELECT * FROM categories;