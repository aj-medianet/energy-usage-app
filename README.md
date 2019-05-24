# Energy Usage App

[Link to the Website](https://energy-usage-app.andrewjoseph.dev/)

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