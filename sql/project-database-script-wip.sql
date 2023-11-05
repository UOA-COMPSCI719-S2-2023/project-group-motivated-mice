/* Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

--Drop tables if they already exist

drop table if exists Comments;
drop table if exists Images;
drop table if exists Articles;
drop table if exists Account;
drop table if exists Avatar;
drop table if exists Location;


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
    HashedPassword VARCHAR(60) NOT NULL, --change the hasshedPassword type to VARCHAR for testing
    AuthToken VARCHAR(128),
    AvatarID INT,
    FOREIGN KEY (AvatarID) REFERENCES Avatar(AvatarID)
);


-- Create the Articles table
create table Articles (

    ArticleID INTEGER NOT NULL primary key,
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
    ImageID  INTEGER NOT NULL primary key,
    ArticleID INTEGER,  -- Associates an image with an article
    ImageURL VARCHAR(255) NOT NULL,  -- Stores the URL to the image file,
	Thumbnail INTEGER, -- stores the ArticleID for which image is a thumbnail
    FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID),
	FOREIGN KEY (Thumbnail) REFERENCES Articles(ArticleID)

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

--create an account first to get the dummy data below work
INSERT INTO Avatar VALUES
	('1', './images/avatar1'),
	('2', './images/avatar2'),
	('3', './images/avatar3'),
	('4', './images/avatar4'),
	('5', './images/avatar5');

INSERT INTO Account VALUES(
	1,
	"testuser", 
	"test", 
	"user",
	"testuser@auckland.ac.nz",
	date('2023-02-02'),
	"testing",
	0,
	"$2b$10$ZPyDNhd8tEJkvKwwU5CML.G9vRLJmb.F9xf6e.fOLDWu8MZY8mqhi", --it's abcd
	"125d664f-8ff8-4373-ade0-eb7d3047ea96",
	1);

INSERT INTO Account VALUES(
	2,
	"User2", 
	"Xia", 
	"Lina",
	"xia.l@hotmail.com",
	date('1962-06-13'),
	"Steal the warm chair right after you get up. Claw drapes stinky cat. Is good you understand your place in my world love me! lasers are tiny mice where is it? i saw that bird i need to bring it home to mommy squirrel! flee in terror at cucumber discovered on floor for cough hairball, eat toilet paper litter box is life. Poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls scratch the postman wake up lick paw wake up owner meow meow for allways wanting food and eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter or growl at dogs in my sleep. Why dog in house? i'm the sole ruler of this home and its inhabitants smelly, stupid dogs, inferior furballs time for night-hunt, human freakout catch eat throw up catch eat throw up bad birds. Fall asleep upside-down climb leg, but meeeeouw and if it fits i sits, i vomit in the bed in the middle of the night for kick up litter but i love cats i am one wake up scratch humans leg for food then purr then i have a and relax. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back hey! you there, with the hands or play riveting piece on synthesizer keyboard cat mojo purrrrrr yet sleep on keyboard blow up sofa in 3 seconds. Meow meow mama ask to go outside and ask to come inside and ask to go outside and ask to come inside. Jump around on couch, meow constantly until given food, if it fits, i sits kitty power or stares at human while pushing stuff off a table. Meow meow pee in shoe. Chase ball of string cuddle no cuddle cuddle love scratch scratch chirp at birds chase little red dot someday it will be mine! for fart in owners food for x. Jump on counter removed by human jump on counter again removed by human meow before jumping on counter this time to let the human know am coming back. Cattt catt cattty cat being a cat stare at guinea pigs and cat fur is the new black , make muffins purr hiss and stare at nothing then run suddenly away, or i like fish. I hate cucumber pls dont throw it at me cattt catt cattty cat being a cat i is playing on your console hooman, hide at bottom of staircase to trip human. Howl uncontrollably for no reason pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, you have cat to be kitten me right meow yet drool. Slap owner's face at 5am until human fills food dish spill litter box, scratch at owner, destroy all furniture, especially couch for x to pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly. Then cats take over the world attack dog, run away and pretend to be victim and claw drapes, but purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow , disappear for four days and return home with an expensive injury; bite the vet hunt by meowing loudly at 5am next to human slave food dispenser. Stare at wall turn and meow stare at wall some more meow again continue staring terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry. Make meme, make cute face mess up all the toilet paper so really likes hummus but plop down in the middle where everybody walks.
",
	0,
	"$2b$10$CvAiCbm9eYiMv7uIroDwke894LYRbmQgyuEs3EYtv3Q7adu0eSqt.", --it's Hello!
	"55dafb82-8a7d-4bbd-99f0-8584ce32e887",
	2);


INSERT INTO Articles (ArticleID, UserID, PublishDate, Likes, Title, Content) VALUES 
	(1,
	 1,
	 date('2023-10-25'),
	 0, 
	"My slave human didn't give me any food so i pooped on the floor kitty cat slap dog in face",
	"<p>Hello<p>");

INSERT INTO Articles (ArticleID, UserID, PublishDate, Likes, Title, Content) VALUES 
	(2,
	 2,
	 date('2023-10-25'),
	 0, 
	 "Caticus cuteicus catching very fast laser pointer roll over and sun my belly",
	"RyanAir coming to AKL could spell the end of an airline duopoly','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	);

