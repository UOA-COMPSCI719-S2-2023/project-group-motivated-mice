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
