  const express = require('express');
  const expressLayouts = require('express-ejs-layouts');
  const session = require('express-session');
  const mongoose = require('mongoose');
  const passport = require('passport');
  const mongodb = require('./config/mongodb');
  const mongoSanitize = require('express-mongo-sanitize');
  const path = require('path');
  const usersRoute = require('./routes/usersRoute');
  const blogsRoute = require('./routes/blogsRoute');
  const auth = require('./auth/auth');


  const flash = require('connect-flash');

  const app = express();


  require('./config/passport')(passport);

  // ejs settings
  app.use(expressLayouts);
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');
  // body Parser
  app.use(express.urlencoded({extended: false}));

  // static files
  app.use(express.static(path.join( __dirname, '../public')));

  // connect to mongodb
  mongodb(mongoose);

  //mongodb mongoSanitize
  app.use(mongoSanitize());

  // Sessions
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

    // cookie: { secure: false }

  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // flash messages middleware
  app.use(flash());

  // Global variable
  app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.error = req.flash('error');
    res.locals.message = req.flash('message');

    next();
  });

  // Index route
  app.get('/', (req, res) => {
    res.render('index');
  });

  // users route
  app.use('/users', usersRoute);
  //blogs models
  app.use('/blogs', auth.userAuth, blogsRoute);

  // If route not FOUND
  app.use((req, res, next) => {
    res.render('404');
  });


  module.exports = app;
