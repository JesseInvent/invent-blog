const LocalStategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Mode
const User = require('../models/UserModel');

module.exports = async (passport) => {

    passport.use(new LocalStategy({usernameField: 'email'}, async (email, password, done) => {
        try {
          //find user with email
          const result = await User.findOne({email: email});

          if(!result) {
            return done(null, false, { message: 'Invalid Email' });
          } else {
            // verify password
            const isMatched = await bcrypt.compare(password, result.password);

             if(!isMatched){
               return done(null, false, { message: 'Invalid Password' });
             } else {
               return done(null, result);
             }

          }

        } catch (e) {
          console.log(e);
        }

      }

    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
          done(err, user);
      });
    });
}
