const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const orderRouter = require('./Router/orderRouter');
const userRouter = require('./Router/userRouter');
const shopOrderRouter = require('./Router/siteOrderRouter');
const siteLoginRouter = require('./Router/siteLoginRouter');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:'my database object', saveUninitialized:true, resave:false}));


app.set('view engine', 'ejs'); 

const port = process.env.PORT || 3000;

//api routes
app.use('/order', orderRouter);
app.use('/user', userRouter);

//site routes
app.use('/orders', shopOrderRouter);
app.use('/login', siteLoginRouter);

app.get('/',(req,res)=>{
    let cookie = req.cookies.loggedin;
    if(cookie != undefined){
        res.redirect('/orders');
    }else{
        res.redirect('/login');
    }
});

const userName = process.env.DB_USER;
const password = process.env.DB_PASS;

const databaseName = process.env.DB_NAME;

const uri = 
    `mongodb://${userName}:${password}@cluster0-shard-00-00-a2mel.mongodb.net:27017,cluster0-shard-00-01-a2mel.mongodb.net:27017,cluster0-shard-00-02-a2mel.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

// terminating database connection, when application is closed.
process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
    });
});

mongoose
    .connect(uri, { useNewUrlParser: true, dbName: databaseName, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to Database');
        // initiating server
        app.listen(port, (req,res)=>{
            console.log(`Server listening on port: ${port}`);
        });
    })
    .catch(err =>{
        console.log("Error:", err);
    });