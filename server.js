const path = require('path'); //path
const express = require('express'); //express
const mongoose = require('mongoose'); //mongoose for MongoDB
const dotenv = require('dotenv'); //environment variables
const morgan = require('morgan'); //logging 
const exphbs = require('express-handlebars'); //express-handlebars
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();
//Passport config
const routes =require('./config/passport')(passport);
//App
const app = express();
//Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Handlebars - https://www.npmjs.com/package/express-handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
const PORT = process.env.PORT || 5000;
app.set('view engine', '.hbs');

//Sessions - https://www.npmjs.com/package/express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})  
  // cookie: { secure: true }
}));
  

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


//Routes - https://expressjs.com/en/guide/routing.html
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});