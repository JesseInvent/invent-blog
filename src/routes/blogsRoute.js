const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');


// GET Request for pages
router.get('/add', (req, res) => res.render('addBlog'));
router.get('/edit/:id', blogController.getBlogForEdit);


// POST reguest
router.post('/add', blogController.create);
router.post('/edit/:id', blogController.edit);
router.delete('/:id', blogController.delete);



module.exports = router;
