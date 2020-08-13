const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const passport = require('passport');
const auth = require('../auth/auth');
//passport

// pages routes
router.get('/login', (req, res) => res.render('login'));
// register pages
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', auth.userAuth , blogController.getBlogs);


// POST requests
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;
