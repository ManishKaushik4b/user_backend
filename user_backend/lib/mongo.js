const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/playground')
  .then(()=> console.log("Connected to mongodb..."))
  .catch((err) =>
    console.log("Unable to Connect To DB: ", err.message));


module.exports = mongoose;