Final project Motivated Mice A personal blogging system
==========
a. A brief introduction to your webapp

Our travel themed blog is a webapp for those who live to explore and share their travel stories. It's a platform where the passion for travel and the joy of discovery are woven into every feature.
Through our webapp, we can:
Browse Articles: Peruse a variety of travel articles penned by fellow wanderers. Whether you're seeking inspiration or practical advice, our collection of narratives caters to every type of traveller.
User Registration: Join our community by creating your own account. 
Publish Your Stories: As a registered user, you're invited to contribute your own travel experiences.
Rate and Like: Engage with the content by rating and liking articles. 
Top Articles Display: Discover popular articles as they're featured based on the number of likes received.
Author Pages: Delve into the worlds of our authors. The author pages provide a snapshot of contributors' published work, allowing you to follow your favourite storytellers.
Location Pages: Our location pages offer weather information that paint a complete picture of every destination marked in our articles.



b. A description of the extent to which your team has completed the compulsory
Features
Feature 1: Users must be able to create new accounts, which including username, first name, last name, password, date of birth, email and description about user.
 

Feature 2: When selecting a username, user will be informed if the given name is taken. We use fetch() in the client-side JavaScript to  implement the feature.


Feature 3: when selecting a password, there are two password textboxes as below, and if the are not match, it is not allowed to submit the form. An event listener is attached to the form submission event. It checks whether the values of the two password fields match.
If two passwords not match , you can not submit the form as below:


Feature 4: We insert some predefined avatar in the database, we can choose it when creating the account. When load the cerate account page ,we use fetch() to get avatars, and then add them to the option in html.


Feature 5: After we create the account, we save all the information to the database, and then we can login according to the saved data and give that user an auth token which will be saved in a cookie. When logout, delete the auth token cookie and redirect to login page,



Feature 6: We install the bcrypt npm package to do the password hashing and salting. When create the account, we use bcrypt to  hash the password, when login, we use bcrypt to compare the input password and hashed password to see if they match.

Feature 7: We can browse a list of all articles, regardless of whether they are logged in or not. If logged in, they should additionally be able to browse a list of their own articles.







c. A description of the extra features your team has implemented

Author page - includes an author bio and lists out the articles they have authored.
Location page - Includes a description of the location as well as the current weather (using Open Weather API) and all articles tagged with this location.
Upvotes - users can upvote Authors, Articles and Locations and these will show on the object as well as feed into leaderboards or “top” lists for  each. So there will be a way of viewing top articles, top authors and top locations based on these votes.

Features not implemented - 
Reading history - if logged in a user can see a list of articles they have recently viewed
Comment replies - allow users to reply to another comment directly



d. Instructions on what the database file (*.db file) should be named

According to the code snippet in database.js : filename:”./project-databse,db”,  the database file should be named project-database.db. And also we should make sure that  the db file save in the correct place.




e. Does the marker need to do anything prior to running your webapp, other
than npm install?

Need to running npm install bcrypt.
Before running the webapp, we need to ensure that the database server is installed and running, open the project-database.db, and then run the project-database-init-script.sql file in the sql folder to populate the database with initial data.




f. At least one username / password combination for an existing user in your
system with some already-published articles

Yes, we will insert some data in the account table, articles table, location table and avatar table .

g. Any other instructions / comments you wish to make to your markers

Credits/ references


Some of the predefined entries were created using chat gpt

