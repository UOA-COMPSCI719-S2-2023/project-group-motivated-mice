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
	6,
	"$2b$10$CvAiCbm9eYiMv7uIroDwke894LYRbmQgyuEs3EYtv3Q7adu0eSqt.", --it's Hello!
	"55dafb82-8a7d-4bbd-99f0-8584ce32e887",
	2);

INSERT INTO Account VALUES(
	3,
	"Aloysius", 
	"Hadizatu", 
	"Andersson",
	"lknope@pawneeparks.gov",
	date('1980-02-13'),
	"Really likes hummus. Lay on arms while you're using the keyboard eat the rubberband and hunt anything when in doubt, wash. Stare at guinea pigs hiding behind the couch until lured out by a feathery toy. Lasers are tiny mice swipe at owner's legs break lamps and curl up into a ball slap owner's face at 5am until human fills food dish purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Fooled again thinking the dog likes me sleep or damn that dog lie in the sink all day. Sleeping in the box chase dog then run away jump on fridge but stare at ceiling light for sit in window and stare oooh, a bird, yum.,",
	0,
	"$2b$10$MnfTe/qHKtIHRQz3Zd9uQ.YrQZO8IZ8xI3SLEx2sisjn1u0e1cCOO", --it's World!
	"371b22fe-bd08-4dd0-a37f-53cf2988f5cf",
	3);

INSERT INTO Account VALUES(
	4,
	"DarthVader", 
	"Anakin", 
	"Skywalker",
	"DVader@dstar.gov",
	date('1999-06-10'),
	"The ability to destroy a planet, or even a whole system, is insignificant next to the power of the Force."
	,0,
	"$2b$10$4X98VbUj8tl5tUDoBJaise7UspMm0ZNWwTC8wRiFY3jo2xwNxyJKS", --it's theForce
	"7967c250-5f6d-47a6-9594-b961a930eb0c",
	4);
		
	

INSERT INTO Articles (ArticleID, UserID, PublishDate, Likes, Title, Content, LocationID) VALUES 
	(1,
	 1,
	 date('2023-10-25'),
	 6, 
	"My slave human didn't give me any food so i pooped on the floor kitty cat slap dog in face",
	"<p>Hello<p>",
	7);

INSERT INTO Articles (ArticleID, UserID, PublishDate, Likes, Title, Content, LocationID) VALUES 
	(2,
	 2,
	 date('2023-10-25'),
	 0, 
	 "Caticus cuteicus catching very fast laser pointer roll over and sun my belly",
	"RyanAir coming to AKL could spell the end of an airline duopoly','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	,6);

INSERT INTO Articles (ArticleID, UserID, PublishDate, Likes, Title, Content, LocationID) VALUES 
	(3, 
	2,
	 date('2023-09-28'),
	 3, 
	 "Play time meow and walk away",
	"Become one with nature on a trip to Queenstown' ,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
	13);