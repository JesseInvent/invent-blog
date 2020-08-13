////=== CONTAINS GENRAL APP FUNCTIONS ===////

const bcrypt = require('bcryptjs');
// const config = require('../config/config');

const functions = {

  hashPassword: async (password) => { // function to hash user password

    try {

      const salt = await bcrypt.genSalt(10); // generate salt
      const hash = await bcrypt.hash(password, salt); // hash
      return hash;

    } catch (e) {

      console.log(e);

    }

  }

}

module.exports = functions;
