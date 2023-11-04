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
    HashedPassword CHAR(60) NOT NULL,
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

--for testing 
insert into Account (UserName, FirstName, LastName, EmailAddress, DateOfBirth, About, Likes, HashedPassword) values
('pokemon', 'Jane', 'Doe', 'jane.doe@gmail.com', date('1980-10-05'), 'hello world', 0, user1),
('digimon', 'John', 'Smith', 'john.smith@gmail.com', date('1966-02-05'), 'Windows Me is the best Windows', 0, user2);

insert into Articles (UserID, PublishDate, Likes, Title, Content) values 
(1,date('2023-10-25'), '0', 'hello', '<p>hello world<p>'),
(2,date('2023-10-15'), '0', 'hello', '<p>How are you<p>');


-- Adds values into the location table

INSERT INTO Location
Values ('1','Auckland', 'It’s no secret that Auckland is New Zealand’s largest city in both population and landmass. In fact, Auckland has a larger population than the whole South Island! With a huge choice of regional parks mixed with bush and beach, beautiful island getaways in the Hauraki Gulf, and the conveniences of a city, Auckland has many appealing aspects that may draw you to stay for a while','100','-36.8509','174.7645'),
('2','Christchurch','The South Island‘s largest city is not only teaming with work opportunities for backpackers, but the artwork, views from the Port Hills, and surf beaches entice many to explore. Take a look at The Complete Guide to Christchurch for inspiration on what to do in Christchurch.','123','-43.532','172.6306'),
('3','Wellington','Surprisingly, New Zealand’s capital city is not its largest, but it has been dubbed the world’s "coolest little capital". In a city where there is always something happening, surrounding districts of wine, coast and mountains, and heaps of creativity, Wellington is a popular choice for an extended stay. Check out our guides on Wellington City Centre, Kapiti, Wairarapa and Hutt Valley and you’ll quickly see why Wellington is a traveller’s favourite amongst New Zealand cities.','56','-41.2924','174.7787'),
('4','Hamilton','Situated on the banks of the mighty Waikato River, Hamilton is the centre of the Waikato region. The Hamilton Gardens and its nightlife are a drawcard, but the city makes a good hub for visiting the likes of Raglan, Hobbiton and Waitomo. For more information on Hamilton, check out The Complete Guide to Hamilton. If you are looking to study in New Zealand, then Hamilton is a population option as one of the major cities in New Zealand for international students.','78','-37.7826','175.2528'),
('5','Tauranga','The coastal city of Tauranga is close to many fruit-picking work opportunities, as well as the popular beaches at Mt Maunganui and Papamoa. Enjoy road trips to glowworm dells and waterfalls in the Kaimai-Mamaku Forest Park.','54','-37.687','176.1654'),
('6','Napier','Surrounded by vineyards and close to beaches, bike rides and walks, Napier and Hastings are super popular cities for travellers looking for wine and adventure and backpackers looking for work and sun! Explore the art deco architecture of Napier, or hire a bike and taste delicious food and wine around the Hastings area.','26','-39.4893','176.9192'),
('7','Dunedin','The student city has lots to do in terms of wildlife spotting on the Otago Peninsula, visiting the world’s steepest street, biking the Otago Central Rail Trail, and stepping back in time in what could be described as the most European-style city in New Zealand.','77','-45.8795','170.5006'),
('8','Whangarei','With its subtropical climate and convenient location only a short drive away from Auckland, Whangarei is a prime choice when picking a place to stay. Whangarei Falls is a stunning yet accessible attraction, the local gardens are ever-blossoming, and the hikes of Whangarei Heads offer vistas like no other.','65','-35.7275','174.3166'),
('9','Palmerston North','Often overlooked by travellers, nevertheless Palmerston North is an iconic New Zealand city. An extremely affordable city to settle for a bit, work and play, Palmerston North is the Manawatu region’s hub. Explore the hikes of the Manawatu Gorge, visit Te Apiti Windfarm, discover beaches, and much more!','56','-40.3545','175.6097'),
('10','New Plymouth','With pumping surf waves on one side of the city and the stunning cone-shaped Mt Taranaki on the other, New Plymouth has the best of both worlds. You’ll get the typical New Zealand city life while having access to the best of New Zealand’s countryside. No wonder so many Kiwis call it home. Not only are there a huge amount of outdoor experiences to be had surrounding the city, but New Plymouth also has a great emphasis on the arts with a number of art galleries and street art.','90','-39.0572','174.0794'),
('11','Rotorua','Rotorua is a hub of geothermal activity. Even in the city parks, you can watch the bubbling mud as the heat of the earth pushes up to the surface. Geothermal parks, mountain biking, Maori culture, hikes and more are what’s on offer in this North Island city.', '97','-38.1446',	'176.2378'),
('12','Invercargill','Invercargill might be the southernmost city in New Zealand but it’s certainly not the biggest, coming in 12th in this list of the biggest cities in New Zealand. Home of the "Southland Cheese Roll", several vintage car museums and a few other quirks, Invercargill is a city that doesn’t take itself too seriously and that’s all part of the charm.','34','-46.4179','168.3615'),
('13','Nelson','The northernmost city on the South Island is Nelson. The sunniest city in New Zealand is a no-brainer for those who seek good weather. Plus, with four national parks within driving distance, Nelson is a great base for many of your wilderness trips on the South Island.','87','-41.2985','173.2444'),
('14','Gisbourne','Straddling the east coast of the North Island, Gisborne is one of the world’s first cities to welcome the new day. In turn, catching a sunrise here or even the annual Rhythm & Vines festival to be one of the first to celebrate the New Year is on many’s bucket lists. Other than that, Gisborne is a sunny fruit and wine-producing region, while surfing at the city’s idyllic beach is one of the ways locals spend their time.','98','-38.6641','178.0228'),
('15','Whanganui','On the mouth of New Zealand’s most culturally significant river (so much so that it has been given the status of "living entity"), Whanganui is a place to immerse in the culture, whether it is of the indigenous Maori or the local arts. Whanganui is one that travellers rarely make it to, but those who visit are pleasantly surprised by its enchanting river walks, art galleries, museums, parks and proximity to some picturesque beaches.','65','-39.9331','175.0286'),
('16','Queenstown','Although this city is too small to make the list of the largest cities in New Zealand, Queenstown is a bustling tourist hub with a fluctuating seasonal population. Queenstown is surrounded by mountains and dubbed the "Adventure Capital of the World" thanks to its great deal of adrenaline activities. Queenstown is still a major New Zealand city and should be considered when planning a trip to New Zealand.','156','-45.0302','168.6615');

-- adds avatars for user selection 

INSERT INTO Avatar
VALUES
('1', './images/avatar1'),
('2', './images/avatar2'),
('3', './images/avatar3'),
('4', './images/avatar4'),
('5', './images/avatar5');


-- adds mock users

INSERT INTO Account
VALUES

('1','User1','Mark','Claribel','user1@email.com','16/02/1996','Meet Mark, a globetrotter with an unquenchable thirst for food and wine. From vibrant street markets to Michelin-starred restaurants, he uncovers culinary treasures worldwide. With a penchant for fine wines, Mark explores vineyards, sharing eloquent pairings. Beyond taste, he champions responsible travel, seeking authentic connections in every locale. Join him for a sensory journey, where each bite and sip tells a vivid tale of culture and adventure. Explore the world through Marks discerning palate and wanderlust-fueled spirit.','156','password','1','null'),
('2','User2','Xia','Lina','user2@email.com','08/091991','Meet Xia, a nature-loving soul and passionate backpacker. Hailing fromTaranaki, she roams untamed landscapes, capturing the Earths raw beauty. From misty mountains to sun-kissed shores, Xias adventures inspire fellow nature enthusiasts. With a heart for sustainable travel, she leaves only footprints. Join Xia on a journey where every step is a brushstroke on natures canvas, inviting you to discover the wilds hidden treasures.','123','password','2','null'),
('3','User3','Aloysius','Pirouz','user3@email.com','06/061987','Introducing Aloysius, a intrepid traveler fueled by a fervor for climbing. Hailing from Ashburton, he scales peaks around the globe, chasing the exhilarating dance between earth and sky. From the rugged Rockies to the towering Alps, Aloysius conquers natures vertical wonders, offering insights and inspiration to fellow climbers. His blog is a testament to human tenacity and the breathtaking beauty that rewards those who dare to ascend. With each ascent, Aloysius shares not just a conquest, but a piece of his soul left on the summit. Join him on a journey where the sky is never the limit, but the beginning.','147','password','3','null'),
('4','User4','Pravin','Sabri','user4@email.com','01/01/2000','Meet Pravin, a globetrotter with an insatiable thirst for craft beer and a penchant for sailing. Hailing from Paihia, he navigates the worlds waters, seeking both the perfect brew and the thrill of the open sea. From quaint coastal breweries to hidden gems in bustling cities, Pravin uncovers the finest in craft beer, sharing his discoveries with fellow enthusiasts. When hes not savoring a pint, hes hoisting sails, charting courses, and exploring new horizons. Join Pravin on a voyage where every port is a potential brewery and every journey is fueled by the wind and the foam. Cheers to adventure!','181','password','4','null'),
('5','User5','Sigfrid','Cordula','user5@email.com','03/07/1982','Meet Sigfrid, a passionate Kiwi travel blogger with an unyielding love for dance, art, and cultural events. Despite never leaving the shores of New Zealand, she uncovers a world of vibrant experiences within her homeland. From traditional Maori performances to contemporary Kiwi art scenes, Sigfrid explores the rich tapestry of her own culture, unearthing hidden gems in every corner. Through her lens, she paints a vivid picture of New Zealands artistic soul, proving that adventure and cultural enrichment can flourish right at home. Join Sigfrid on a journey through the heart of Aotearoa, where every dance, brushstroke, and event tells a unique story.','125','password','5','null'),
('6','User6','Arnold','Zdenko','user6@email.com','22/08/1992','Introducing Arnold, a sun-soaked adventurer with a passion for sports, New Zealand music, and basking in the golden rays. Based in the heart of New Zealand, he melds his love for adrenaline-pumping activities with the vibrant local music scene. From tackling rugged trails to grooving to homegrown beats, Arnold uncovers the dynamic spirit of his homeland. His blog is a fusion of athletic pursuits, musical discoveries, and sun-drenched escapes, offering readers a taste of Kiwi culture at its finest. Join Arnold on a journey where every goal scored, every note played, and every sun-soaked moment paints a vivid picture of New Zealands vibrant soul.','180','password','1','null'),
('7','User7','Amie','Ion','user7@email.com','03/08/1993','Meet Amie, a sun-soaked wanderer with a heart full of love for dogs and the soothing embrace of the beach. Whether its sandy paws or crashing waves, she finds solace in the simple joys of life. Based in coastal bliss, Amie explores the worlds shorelines with her loyal canine companions, creating memories that are etched in sand and sea. Her blog is a tribute to the perfect harmony of wagging tails and ocean waves, an ode to the boundless happiness that only a furry friend and the beach can offer. Join Amie on a journey where every doggy grin and beach sunset tells a story of pure, unfiltered joy.','114','password','2','null'),
('8','User8','Helma','Valdas','user8@email.com','29/03/1982','Meet Helma, a passionate traveler with an unwavering love for New Zealand road trips. Based in the heart of this picturesque land, she navigates winding roads and explores hidden corners with unbridled enthusiasm. From the rugged Southern Alps to the serene coastal highways, Helma uncovers the beauty of Aotearoa one kilometer at a time. Her blog is a tribute to the freedom of the open road, where every twist and turn reveals a new chapter of adventure. Join Helma on a journey through New Zealands breathtaking landscapes, and let the allure of the asphalt be your guide to unforgettable experiences.','119','password','3','null'),
('9','User9','Carter','Selby','user9@email.com','21/04/1989','Introducing Carter, an intrepid adventurer with a deep-seated passion for hiking, camping, and skiing amidst New Zealands breathtaking landscapes. Rooted in the heart of this outdoor paradise, he embarks on journeys that lead him to rugged trails, serene campsites, and pristine slopes. From the majestic Southern Alps to the tranquil fjords, Carter discovers the natural wonders of Aotearoa with boundless enthusiasm. His blog is a testament to the thrill of the wild, where every step, pitch, and turn paints a vivid tapestry of exhilarating experiences. Join Carter in the pursuit of pure, unbridled adventure amidst New Zealands untamed beauty.','127','password','4','null'),
('10','User10','Annemarie','Blanch','user10@email.com','27/10/1974','Introducing Annemarie, a unique travel blogger whose adventures unfold within the comfort of her own abode. With a profound appreciation for the joys of home, she finds solace in crafting enriching experiences without stepping beyond her doorstep. Through her insightful posts, Annemarie redefines travel, showcasing the beauty of cherishing the familiar and finding wonder in the everyday. From culinary experiments to cozy staycations, her blog invites readers to embrace the art of mindful living. Join Annemarie on a journey that proves adventure knows no bounds, and that sometimes, the greatest discoveries are found within the walls we call home.','199','password','5','null');

-- adds mock articles
INSERT INTO Articles
VALUES
('1','1','3/11/2023','500','Move over Paris, Hamilton is the next city of love','placeholder content','0','4'),
('2','10','28/9/2023','80','RyanAir coming to AKL could spell the end of an airline duopoly','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','1'),
('3','10','27/10/2023','46','Must-SeeTips for romantic weekend in Whangarei','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','8'),
('4','1','28/9/2023','37','You will never believe you aren not  in Greece' ,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','10'),
('5','1','3/11/2023','465','Traveller choose Wellington over New York for this one surprising reason' ,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','3'),
('6','1','28/9/2023','34','Auckland Transport announces free tourist pass','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','1'),
('7','1','3/11/2023','672','Revealed: The medieval city named as NZs top tourist destination','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','12'),
('8','1','3/11/2023','500','best beaches in Christchurch','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','2'),
('9','10','28/9/2023','80','The most luxurious hotels in  Invergargill','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','12'),
('10','10','27/10/2023','46','Make the most of your trip to Auckland','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','1'),
('11','1','28/9/2023','37','Become one with nature on a trip to Queenstown' ,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','16'),
('12','1','3/11/2023','465','Soothe your soul with leisurely activities at Auckland' ,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','1'),
('13','1','28/9/2023','34',' 4 quaint coffee shops to hang out in Devonport','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','1'),
('14','1','3/11/2023','672','What to do on a 3 day vacation to Queenstown','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0','16');


