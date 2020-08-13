
exports.userAuth  = (req, res, next) => {
  // console.log(req);
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('message', 'Please logIn');
  res.redirect('/users/login');
}
