# Energy Usage App

[Link to the Website](https://energy-usage-app.andrewjoseph.dev/)

***

# TODO User Story

:hammer: :hammer:

## HW 6

### Navigation Menu

This story requires that our progressive web app have an easy to use navigation menu that includes all our app’s views.

- [X] Create a web framework for our web app.

- [ ] Create a Navigation Menu that is easy to use and displays each app view.

- [ ] Create Test Cases to test if each link could navigate to the correct page.

---

###  Devices Page with Device Info

This story requires our progressive web app to have information displayed in a readily available, clear, and well-formatted manner.

- [X] Write database queries to display device information

- [X] Create an appropriate UI/UX for the user to view energy usage and other pertinent information

- [ ] Create Test Cases to test if the Device Table could display a correct number of devices.

---

###  Device On/Off

This story requires our progressive web app to display when a device was turned on and off.

- [X] Write database query(ies) to find the device on or off (0 or 1)

- [X] Add to interface to show the device on/off data

- [ ] Create Test Cases to test if the Device Table displays the same as the data we had in the database


---

### Current Power vs. Average Power

This story requires our progressive web app to display a comparison of a device’s current power consumption to its average power consumption.

- [ ] Write database queries and endpoint to get current and average power consumptions for a device

- [ ] Add current power vs. average power display to the device page

- [ ] Create Test Cases to test if the Device Table displays the same as the data we had in the database

---

###  Adjust Device Info

- [X] This story requires our progressive web app to allow the user to change the device information

- [X] Add form to devise page UI to enter the device information.

- [X] Write new device information to the database

- [ ] Create Test Cases to test if the Device Table could update the devices information.

- [ ] Create Test Cases to test if the Device Table could delete a specific device.

---

### Description of Refactoring

`//TODO`



***

## HW 7

### Display local time zone

This story requires to display the local time zone of the user in UI.

- [ ] Create a basic interface for the user to see the local time.

- [ ] Implement a frontend logic to retrieve local time from the user's device.

---

### FAQs Page  (Priority low)

This Story requires a single web page for user to read FAQs.

- [ ] Create a static web page with FAQs contents hardcoded in UI.

- [ ] Add FAQs tag in the Navigation Menu

---

### Login

This story requires our progressive web app to display login fields with the user’s login method chosen during creation

- [ ] Create basic interface for prompting login via each selected method (biometric or password based)

- [ ] Write code for prompting, prompting, and locking user out after too many attempts

- [ ] Integrate with hashing function created during account creation story

- [ ] Prompt services to display after successful login attempt

---

### Account Creation

This story requires our progressive web app to display first time login fields and the ability for biometric input capability later in development

- [ ] Create a basic interface for user to enter basic information

- [ ] Create tables in database for user information

- [ ] Create hashing function for storing user password

- [ ] Add dummy buttons for later implementation of biometric login

---

### Account Editing 

This story requires our progressive web app to display existing account fields (except password) and allow users to edit them

- [ ] Create a basic interface for adjusting user fields

- [ ] Write code to handle database updating

---

### Delete Account 

This story requires our database to completely remove sensitive data and alert user clearly about what they are doing

- [ ] Write code to erase all records from database

- [ ] Create notification for user, warning them erasing can’t be un-done as well as a separate notification when deletion is complete.

---

### Description of Refactoring

`//TODO`



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