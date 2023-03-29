# #!/bin/bash
# ## Author: Anirudh Voruganti

echo "|**********************  INSTALL SCRIPT **********************|"


echo "|**********************  Upgrade OS Packages **********************|"
sudo yum update
sudo yum upgrade -y


echo "|********************** Install NodeJS **********************|"
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
node -v

echo "|********************** Install POSTGRESQL ********************** |"   
# sudo amazon-linux-extras enable postgresql14
# sudo yum install postgresql-server -y
# sudo PGSETUP_INITDB_OPTIONS=" --auth=trust" postgresql-setup --initdb --unit postgresql --debug


# echo "|**********************  Start POSTGRESQL **********************  |"   
# sudo systemctl start postgresql
# sudo systemctl enable postgresql
# sudo systemctl status postgresql
# sudo -u postgres psql
# sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'root';"
# sudo -u postgres psql -c "create database database_development;"

# sudo cat /var/lib/pgsql/data/pg_hba.conf



echo "|********************** UNZIP WEBAPP ********************** |"


echo "check webapp.zip"
SOURCE_ZIP="/tmp/apps/webapp.zip"
APP_FOLDER="/home/ec2-user"
echo "----Checking if the file exists----"
ls -a $SOURCE_ZIP


echo "copying the webapp to -" $APP_FOLDER

# APP_FOLDER="/var/www/html/webapp"
sudo mkdir -p $APP_FOLDER
unzip $SOURCE_ZIP -d $APP_FOLDER
sudo cd $APP_FOLDER/webapp

echo "listing webapp"
ls -a $APP_FOLDER/webapp

# chmod -R 777 $APP_FOLDER/webapp
echo "pwd" - $(pwd)

echo "Check permissions $APP_FOLDER/webapp"
ls -la $APP_FOLDER/webapp


echo "|********************** INSTALL NPM PACKAGES **********************  |"

cd webapp
npm i 
sudo npm uninstall bcrypt
sudo npm install bcrypt@5.1.0
sudo npm install bcryptjs@2.4.3
sudo npm install dotenv@16.0.3
sudo npm install esm@3.2.25
sudo npm install express@4.18.2
sudo npm install helmet@6.0.1
sudo npm install mocha@10.2.0 -g 
sudo npm install morgan@1.10.0
sudo npm install mysql2@3.1.0
sudo npm install nodemon@2.0.20
sudo npm install pg@8.9.0
sudo npm install sequelize@5.21.7
sudo npm install supertest@6.3.3
sudo npm install pm2 -g
sudo npm install aws-sdk@2.1323.0
sudo npm install multer@1.4.5-lts.1



echo "| **********************  STARTING THE APPLICATION AS A SERVICE ********************** |"
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
# pm2 start src/mainServer.js
# #npm run dev 
# pm2 save

# pm2 list


# sudo cp /tmp/app.service /lib/systemd/system/app.service
# sudo rm -rf /tmp/app.service
# sudo systemctl daemon-reload

