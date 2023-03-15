# webapp
In review 

# Project Title

WEBAPP - Assignment 1 [Network and Cloud Computing Assignment 5]


---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.13.0

    $ npm --version
    8.19.3

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone git@github.com:avoruNeuOrg/webapp.git
    $ cd webapp

## Configure app

Open `webapp/src/index.js`  is the main starting file. You would need nodemon to run the code and also to start listening to the port. 


## Install nodemon

    $npm install -g nodemon


##  Install Postgres Database package 

For this project we used Postgres DB. You're free to use any relational DB like MYSQL etc, sequelize takes care of the connection. To change the DB from postgres to your personal interest - change the settings in config/config.json  

    $npm install -g pg 


## Running the project
After setting up nodemon. Run the below command.

    $ npm run dev

## Testing the project 

The default port for the server is 3000. You can connect to endpoints through Postman. [Manual checking with requests]

## Unit Testing 

    $npm install -g supertest mocha 
    $npm run test  


