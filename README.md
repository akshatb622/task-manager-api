# task-manager-api

The **Task-Manager-Api** with authentication support for different users. It provides different functionalities like<br>
1) Create User<br>
2) Create Task<br>
3) Login User <br>
4) Logout User<br>
5) Logout from all sessions <br>
6) Fetch Your Profile<br>
7) Get Your Tasks <br>
8) Update User<br>
9) Update Task<br>
9) Upload a profile pic or avatar.<br>
10) Delete avatar<br>
11) Delete User<br>
12) Delete Task<br>

# Technologies Used : 

=> The app is primarily built on **NodeJS** which is used as the backend . **Express** is used to create the server.**Mongodb** is used as the database to store the data of different users and their tasks.<br>
=> **JWT** is used to integrate the authentication service into the app.<br>
=> **Sendgrid** is used to send auto generated emails to the users when they signup or delete their profile.<br>
=> **Bcrypt** is used to hash the passwords provided by the users.<br>

# Requirements : 

You should have the following tools installed in your system.<br>
1) Node<br>
2) npm<br>
3) Git<br>
4) MongoDB Database installed and running on your system.<br>
5) Robo-3t or MongoDB Compass installed on your system to see the data in the database.<br>
6) Postman (to test the api end-points)<br>

# Common setup : 
Clone the repo and install the dependencies.<br>

1) git clone https://github.com/akshatb622/task-manager-api.git <br>
2) npm install <br>
3) Create an account on Sendgrid.com to get your api-key to send the auto generated emails.<br>
4) Make a folder in root of the project with the name **config**. Inside the folder make a file **dev.env**(which is used to set the local environment variables).<br>
5) Now edit the dev.env file as : <br>
   i)   PORT=3000<br>
   ii)  SENDGRID_API_KEY=<Your api key that you got from step 3><br>
   iii) MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/task-manager-api<br>
   iv)  JWT_SECRET=<Any text which should be your secret><br>
6) Save the file.<br>
7) Open the file /src/emails/account.js and change the **from** property of all sgMail.send functions to the email-id registered on Sendgrid.com.<br> 
8) Save the File.<br>

# Running the App : 
Before following the steps below ensure that mongodb is running on your system.<br>
1) To start the express server, run the following :<br> 
   npm run start<br>

2) Open Postman and start sending requests to http://localhost:3000 and take a look around.
