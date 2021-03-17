const mongoose = require('mongoose');

const options = {
 connectTimeoutMS: 5000,
 useNewUrlParser: true,
 useUnifiedTopology : true,
}

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_KEY}?retryWrites=true&w=majority`,
 options,    
 function(err) {
  if(err == null) {
      console.log('Database link OK');
  } else {
      console.log(err);
  }
 }
);

module.exports = mongoose;