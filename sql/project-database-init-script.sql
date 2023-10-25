/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists test;
drop table if exists Avatar;
drop table if exists Account;

-- create table test (
--     id integer not null primary key,
--     stuff text  
-- );

-- insert into test (stuff) values
--     ('Things'),
--     ('More things');

create table Avatar (
    AvatarID int primary key,
    ImageFilePath VARCHAR(255) -- Store the file path or URL here
);

create table Account (
    AccountID Iint primary key,
    Password VARCHAR(255),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    EmailAddress VARCHAR(100),
    AvatarID INT UNIQUE,  -- Unique constraint for one-to-one relationship
    FOREIGN KEY (AvatarID) REFERENCES Avatar(AvatarID)
);
