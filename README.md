# Energy Usage App

[Link to the Website](https://energy-usage-app.andrewjoseph.dev/)

***

# TODO User Story

:hammer: :hammer:


## HW 7

### Display local time zone

This Story requires to display the local time zone of the user in UI.

- [ ] Create a primary interface for the user to see the local time.

- [ ] Implement a frontend logic to retrieve local time from the user's device.

####  Refactor

`//TODO`

---

### FAQs Page 

This Story requires a single web page for user to read FAQs.

- [X] Create a static web page with FAQs contents hardcoded in UI.

- [X] Add FAQs tag in the Navigation Menu

####  Refactor

There is no need to modify the code since it is a static web page; what we've done is to adding content into the HTML (handlebars) file.

---

### Login

This Story requires our progressive web app to display login fields with the user's login method chosen during creation.

- [X] Create a primary interface for prompting login via each selected method (biometric or password based)

- [X] Create tables in the database for user information (Users Table - User Name/Email Address/Password)

- [ ] Write code for prompting, prompting, and locking the user out after too many attempts

- [X] Integrate with hashing function created during the account creation story

- [X] Prompt services to display after successful login attempt

####  Refactor - Used Session to do the Authentication

The first time we implemented this feature, we just compare the email account and password that the user has input exits in our database so that user can be recognized as someone who has registered into our database. But we could not do the authentication if we did not record who are logged in to our website and whether we would give permission to the user. 

Therefore, we used a session that could be read by the browser in frontend to record who's using our website. Once the user has logged in, both backend and frontend will synchronize the same session information writing with the user's email address and the user's name. By doing so; First, if the user has logged in, he or she would not reaccess the login page, our web server will redirect them to the Home Page. Secondly,  when the user tries to visit other pages, those APIs can use the session sent with the request from the browser to determine if it's going to rendering the web page or redirect the user to the login page for getting the permission.

To refactor this implementation, we used one additional third-party library, express-session, to simplify the work that complicated task for handling session in the web browser. 

In the future, we plan to do the Authorization for the admiration account, and we could use this session to record the identification of that specific account as well. 

---

### Account Creation

This Story requires our progressive web app to display first-time login fields and the ability for biometric input capability later in development.

- [X] Create a basic interface for the user to enter basic information. (/Signup)

- [X] Create a hashing function for storing user password

####  Refactor - Flesh Message

In the previous version, we did not inform our users after they log in or sign up, therefore, once users have registered they would be redirected to the login page, once users have logged in they would be redirected to the Home Page.

To make the workflow much clearer, we reused the session above to store the message about successful or error status. Our system will push the error messages included  "Please log in before visiting Devices Page," "Password is incorrect!", "Email does not exist" and "Please log in before visiting Settings Page," as well as a successful message included "You are logged in." and "You are now registered and can log in," into the session. The browser will render those messages by checking the if there are any messages stored in our session sending from Web Server.

To refactor this implementation, we used one additional third-party library, flesh-connect, to store customized message into our session. 

---

### Account Editing 

This Story requires our progressive web app to display existing account fields (except the password) and allow users to edit them.

- [X] Create a primary interface for adjusting user fields (/Settings)

- [ ] Write code to handle database updating

####  Refactor

`//TODO`

---

### Delete Account 

This Story requires our database to remove sensitive data altogether and alert user clearly about what they are doing.

- [ ] Write code to erase all records from the database

- [ ] Create a notification for user, warning them erasing can't be undone as well as a separate notification when the deletion is complete.

####  Refactor

`//TODO`

***

## HW 6

### Navigation Menu

This story requires that our progressive web app have an easy to use navigation menu that includes all our app’s views.

- [X] Create a web framework for our web app.

- [X] Create a Navigation Menu that is easy to use and displays each app view.

- [X] Create Test Cases to test if each link could navigate to the correct page.

---

###  Devices Page with Device Info

This story requires our progressive web app to have information displayed in a readily available, clear, and well-formatted manner.

- [X] Write database queries to display device information

- [X] Create an appropriate UI/UX for the user to view energy usage and other pertinent information

- [X] Optimize the UI/UX

- [X] Create Test Cases to test if the Device Table could display a correct number of devices.

---

###  Device On/Off

This story requires our progressive web app to display when a device was turned on and off.

- [X] Write database query(ies) to find the device on or off (0 or 1)

- [X] Add to interface to show the device on/off data

- [X] Create Test Cases to test if the Device Table displays the same as the data we had in the database


---

### Current Power vs. Average Power

This story requires our progressive web app to display a comparison of a device’s current power consumption to its average power consumption.

- [X] Write database queries and endpoint to get current and average power consumptions for a device

- [X] Add current power vs. average power display to the device page

- [X] Optimize the UI/UX

- [X] Create Test Cases to test if the Device Table displays the same as the data we had in the database

---

###  Adjust Device Info

- [X] This story requires our progressive web app to allow the user to change the device information

- [X] Add form to devise page UI to enter the device information.

- [X] Write new device information to the database

- [X] Create Test Cases to test if the Device Table could update the devices information.

- [X] Create Test Cases to test if the Device Table could delete a specific device.

---

### Description of Refactoring

#### Navigation Menu

Added icons to the navigation links and a description of the linked page under the icons to better explain what information is contained on each link in the navigation menu and to improve the look and usability.

#### Devices Page with Device Info

The position of the chart was modified so that it has a margin around all sides rather than cover the entire width of the page. Also, we added to the labels for Current Energy Usage and Average Energy Usage to make it clear that the numbers in the column are in watts. We also realized that we had added an unnecessary delete button option, but since we don’t want users to be able to delete devices we removed that ability from the page.

#### Device On/Off

Device On/Off originally displayed on the Devices page as 1/0, but recognizing that it would be clearer to say On/Off, we adjusted the handlebars view to display On or Off depending on if a 1 or 0 was returned from the database.

#### Current Power vs. Average Power

We added to the labels for Current Energy Usage and Average Energy Usage to make it clear that the numbers in the column are in watts.

#### Adjust Device Info

Initially, the Adjust Device Info form had fields to allow the user to change all of the device’s displayed information, including the energy usage fields. Since we don’t want the user to be able to change that data, those fields were removed from the form. Also, the form’s look was modified and the submit button was updated to turn green when the mouse is hovered over it to improve the look and usability.


***

# How to Run it

## Setup the Environments and install all dependencies

- Clone and install `node_modules`

```
$git clone https://github.com/aj-medianet/energy-usage-app.git
cd ./energy-usage-app

npm install
```

- Install pm2 if you haven't done it yet in your local machine

```
npm install -g pm2
```

- Setup your `dbcon.js` and `credentials.js` in the root folder.

```js
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : [password],
  database        : 'devices_db'
});

module.exports.pool = pool;
```

---

## Steps to take before you work on something

- Pull most current version of the project, install any new node_modules, run the app
```
git pull
npm install
npm start
```

---

## Pushing your code to the repo

- How to push your code on mac/linux
```
git add .
git commit -m "what you updated or worked on"
git push
```

---

### Trouble Shooting for the database connection

If there is an issue reporting **Client does not support authentication protocol requested by server; consider upgrading MySQL client**, run:

```
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```

to set up a password for the connection from `localhost@root`.


- [Reference](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

---

### Import the database into your local machine

```
mysql -u root -p devices_db < create-software-engineering-db
```

or whatever user you have set up on your local machine.

---

## Restart, Start and Terminate your website on localhost: 3200

- Once you 'git pull' to the server you have to run `npm restart`

- Once you made some changes and would like to start the server: `npm start`

- Once you would like to terminate the program run on your mahcine: `npm stop`

***