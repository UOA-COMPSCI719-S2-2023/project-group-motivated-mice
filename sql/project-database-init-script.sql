/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

--Drop tables if they already exist
drop table if exists Comments;
drop table if exists Images;
drop table if exists Articles;
drop table if exists Account;
drop table if exists Avatar;

--Create the Avatar table
create table Avatar (
    AvatarID int primary key,
    ImageFilePath VARCHAR(255) -- Store the file path or URL here
);

--Create the Account table
create table Account (
    AccountID INTEGER NOT NULL primary key AUTOINCREMENT,
    UserName VARCHAR(50),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    EmailAddress VARCHAR(100),
    DateOfBirth date,
    About text,
    Likes int,
    --Unsure if we should store password in seperate table for authentication?
    HashedPassword CHAR(60) NOT NULL,
    AuthToken VARCHAR(128),
    AvatarID INT UNIQUE,  -- Unique constraint for one-to-one relationship
    FOREIGN KEY (AvatarID) REFERENCES Avatar(AvatarID)
);


-- Create the Articles table
create table Articles (
    ArticleID INTEGER NOT NULL primary key,
    UserID INTEGER,
    PublishDate timestamp,
    Likes int,
    Title VARCHAR(255) NOT NULL,
    Content text,
    FOREIGN KEY (UserID) REFERENCES Account(AccountID)  -- Establish the relationship
);


-- Create the Image table
create table Images (
    ImageID  INTEGER NOT NULL primary key,
    ArticleID INTEGER,  -- Associates an image with an article
    ImageURL VARCHAR(255) NOT NULL,  -- Stores the URL to the image file
    FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID)
);

-- Create the Comments table
create table Comments (
    CommentID int primary key,
    ArticleID int,  -- Associates a comment with an article
    UserID int,     -- Identifies the user who made the comment
    CommentDate timestamp,
    CommentText text,
    FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID),
    FOREIGN KEY (UserID) REFERENCES Account(AccountID)
);

-- Update the Articles table
alter table Articles
ADD Comments INT DEFAULT 0; -- Add a column to track the number of comments on each article

--for testing 
insert into Account (UserName, FirstName, LastName, EmailAddress, DateOfBirth, About, Likes) values
('pokemon', 'Jane', 'Doe', 'jane.doe@gmail.com', date('1980-10-05'), 'hello world', 0),
('digimon', 'John', 'Smith', 'john.smith@gmail.com', date('1966-02-05'), 'Windows Me is the best Windows', 0);

insert into Articles (UserID, PublishDate, Likes, Title, Content) values 
(1,date('2023-10-25'), '0', 'hello', '<p>hello world<p>'),
(2,date('2023-10-15'), '0', 'hello', '<p>How are you<p>');
insert into Images (ImageURL, ArticleID) VALUES
('./public/images/download (2).jpg', 2);

insert into Images (ImageURL, ArticleID) VALUES
('./public/images/download (1).jpg', 1);