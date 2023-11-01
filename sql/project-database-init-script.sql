/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

--Drop tables if they already exist
drop table if exists Avatar;
drop table if exists Account;
drop table if exists Articles;
drop table if exists Images;
drop table if exists Comments;
drop table if exists Location;

--Create the Avatar table
create table Avatar (
    AvatarID int primary key,
    ImageFilePath VARCHAR(255) -- Store the file path or URL here
);

--Create the Account table
create table Account (
    AccountID int primary key,
    UserName VARCHAR(50),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    EmailAddress VARCHAR(100),
    DateOfBirth date,
    About text,
    Likes int,
    --Unsure if we should store password in seperate table for authentication?
    HashedPassword CHAR(60) NOT NULL,
    AvatarID INT UNIQUE,  -- Unique constraint for one-to-one relationship
    FOREIGN KEY (AvatarID) REFERENCES Avatar(AvatarID)
);


-- Create the Articles table
create table Articles (
    ArticleID int primary key,
    UserID int,
    LocationID int,
    PublishDate timestamp,
    Likes int,
    Title VARCHAR(255) NOT NULL,
    Content text,
    FOREIGN KEY (UserID) REFERENCES Account(AccountID)  -- Establish the relationship
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);


-- Create the Image table
create table Images (
    ImageID int primary key,
    ArticleID int,  -- Associates an image with an article
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

-- creates the Location table
create table Location (
    LocationID int primary key,
    Name VARCHAR(255) NOT NULL,
    Description text,
    Likes int,
    Latitude VARCHAR(255),
    Longitude VARCHAR(255)
);