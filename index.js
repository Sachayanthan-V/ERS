const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8001;
const expresslayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const routes = require("./routes");
const User = require("./models/user");
const MongoStore = require("connect-mongo");
// const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
 
app.use(expresslayouts);
app.set("layout extractStyles", true); 
app.set("layout extractScripts", true);

app.set("view engine", "ejs"); 
app.set("views", "./views");
 
app.use( session({
    name: "codial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
          mongoUrl: "mongodb://127.0.0.1:27017/codial",
          autoremove: "disabled",
        },
          function (err) { console.log("error at mongo store", err || "connection established to store cookie" ); }
        ),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use("/", routes);

app.listen(port, function (error) {
  if (error) {
    console.log(`Error while listening to port :: ${port}`);
    return;
  }
  console.log(`Listening on port ${port}`);
});
