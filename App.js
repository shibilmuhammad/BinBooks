const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path')
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret: 'your-secret-key', // Replace with a secure and unique key
    resave: false,
    saveUninitialized: true
}));
const nocache = require("nocache");
app.use(nocache());

app.listen(3000,()=>{
    console.log("listening to port 3000")
})
const bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true})); 
//Database Conection
const connectDB = require('./db');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User routes
const userRoute = require('./routes/user');
app.get('/', function(req, res) {
    res.redirect('/user/home');
});
app.use("/user",userRoute);

//Admin routes
const adminRoute = require('./routes/admin');
app.use("/admin",adminRoute);

