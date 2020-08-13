
const User = require('../models/UserModel');
const functions = require('./functions/functions');
const bcrypt = require('bcryptjs');
const passport = require('passport');

  // Register User
    exports.register = async (req, res) => {

      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const password2 = req.body.password2;

      let errors = [];

      // validations

      if(!name || !email || !password || !password2 ){
        errors.push({msg: 'Please fill in all fields'});
      } //
      if(password !== password2){
          errors.push({msg: 'Passwords do not match'});
      } //
      if(password.length < 6){
        errors.push({msg: 'Password should be atleast 6 digits long'});
      } //

      if(errors.length > 0){
        res.render('register', { errors, name, email });
        // console.log(errors);
      } else {

          try {
            // console.log('Checking if user exists');

            let checkUser = await User.findOne({email: email}); // Check if user exists

            if(checkUser){ // User exists
              console.log('user exists');
              let error = 'User already exists';
              res.render('register', { error, name, email });

            } else { // User !exist, register
              // console.log('user does not exists');

              const newUser = new User({
                name : name,
                email: email,
                password: await functions.hashPassword(password)
              });

              console.log(newUser);
              // console.log('saving user');

              newUser.save().then(user => { // save User
                req.flash('successMsg', 'You are successfully registered');
                res.redirect('/users/login');
                console.log(user);
              }).catch(err => console.log(err));

            }

          } catch (e) {
            console.log(e);
          }

       }

    }

  // Login User
    exports.login = (req, res, next) => {
      passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);

    }
