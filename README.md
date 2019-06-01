# Energy Usage App

[Link to the Website](https://energy-usage-app.andrewjoseph.dev/)

***

# TODO User Story

:hammer: :hammer:


## HW 7

### Display local time zone

This story requires to display the local time zone of the user in UI.

- [ ] Create a basic interface for the user to see the local time.

- [ ] Implement a frontend logic to retrieve local time from the user's device.

---

### FAQs Page 

This Story requires a single web page for user to read FAQs.

- [ ] Create a static web page with FAQs contents hardcoded in UI.

- [X] Add FAQs tag in the Navigation Menu

---

### Login

This story requires our progressive web app to display login fields with the user’s login method chosen during creation

- [X] Create basic interface for prompting login via each selected method (biometric or password based)

- [X] Create tables in database for user information (Users Table - User Name/Email Address/Password)

- [ ] Write code for prompting, prompting, and locking user out after too many attempts

- [X] Integrate with hashing function created during account creation story

- [X] Prompt services to display after successful login attempt

---

### Account Creation

This story requires our progressive web app to display first time login fields and the ability for biometric input capability later in development

- [X] Create a basic interface for user to enter basic information. (/Signup)

- [ ] Create hashing function for storing user password


---

### Account Editing 

This story requires our progressive web app to display existing account fields (except password) and allow users to edit them

- [X] Create a basic interface for adjusting user fields (/Settings)

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