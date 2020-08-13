
const connectdb = (mongoose) => {
  let db = require('./config').mongoURI;

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));
}

module.exports = connectdb;
