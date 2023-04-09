# ERS [ Employee Review System ]

    The website is used to review the employee's performance both by the admin and also by the collegues. 



## Run Locally

Clone the project

```bash
  git clone https://github.com/Sachayanthan-V/ERS
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
npm install connect-flash
npm install connect-mongo
npm install connect-mongodb-session
npm install cookie-parser
npm install ejs
npm install express
npm install express-ejs-layouts
npm install express-session
npm install mongodb
npm install mongoose
npm install nodemon
npm install passport
npm install passport-local
```

### Before Stating the Server : 

    1) In "index.js" -> change "mongoUrl" value to "localhost:8000/ERS" .
    2) Under config file, mongoose.js file. change the "mongoose.connect" value like "mongoose.connect("localhost:8000/ERS/");

### Start the server

```bash
  npm start
```


## Screenshots

Home page : 

![home](https://user-images.githubusercontent.com/62072100/230767022-0aa3058e-d580-4a2a-a759-ad694690773c.png)

Login page: 
![LoginPage](https://user-images.githubusercontent.com/62072100/230767030-8e9bb8c9-7f7b-4123-80a9-9d585f67175d.png)

Register page : 
![RegisterPage](https://user-images.githubusercontent.com/62072100/230767029-5ae72f14-87db-49a7-9fc7-c88a25f58831.png)

Admin page : 
![AdminView](https://user-images.githubusercontent.com/62072100/230767026-b1eb4e18-61d5-4892-a037-4a19fd977ea0.png)

Employee page : 

![employeeBlank](https://user-images.githubusercontent.com/62072100/230767028-bc076f53-224e-486c-9ed0-e3f04c514d8c.png)

![EmpView](https://user-images.githubusercontent.com/62072100/230767031-15e523bf-a250-468e-bc5d-97f464b354c7.png)

## Authors

- [@sachayanthan-V](https://github.com/Sachayanthan-V)

