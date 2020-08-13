const Blog = require('../models/BlogModel');

exports.getBlogs = async (req, res) => {

   const user = req.user.id;

   const blogs = await Blog.find({user: user});

    res.render('dashboard', {
      name: req.user.name,
      blogs: blogs
    });

}

// Create Blog
exports.create = (req, res) => {
    // console.log('Creating Blog');
    const title = req.body.title;
    const body = req.body.body;
    const user = req.user.id;

    if(!title || !body || !user){

      let errors = {msg: 'You missed a field'}
      res.render('addBlog', {errors});

    } else {

        const newBlog = new Blog ({
          title: title,
          body: body,
          user: user
        });

        newBlog.save().then((blog) => {
          res.redirect('/users/dashboard');
        })
        .catch(err => console.log(err));

    }

}

// Get blog for edit
exports.getBlogForEdit = async (req, res) => {

  const blog = await Blog.findById(req.params.id);

  res.render('editBlog', {blog});

}

// Edit Blog
exports.edit = (req, res) => {
    // console.log('Creating Blog');
    const title = req.body.title;
    const body = req.body.body;

    if(!title || !body){

      let errors = {msg: 'You missed a field'}
      res.render('editBlog', {errors});

    } else {

        let blog = {
          title: title,
          body: body
        }

        Blog.updateOne({_id : req.params.id}, blog, (err) => {

          if(err) {
            console.log(err);
          } else {
            res.redirect('/users/dashboard');
          }

        });

    }

}

// Delete Blog
exports.delete = (req, res) => {

   Blog.findByIdAndDelete(req.params.id)
   .then((result) => {
     res.json({redirectUrl: '/users/dashboard'});
   })
   .catch((err) => {
     console.log(err);
   })
}
