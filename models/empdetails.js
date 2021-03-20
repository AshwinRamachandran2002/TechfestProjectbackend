var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var credentials = new Schema({
   // _id: { type: String },
    name: {type: String, required: true},
    division: { type:String, required: true },
    email: {type: String, required: true},
    
});




credentials.virtual('names').get(function() {
  return this.name ;
});

credentials.virtual('divisions').get(function() {
  return this.division ;
});

credentials.virtual('emails').get(function() {
  return this.email ;
});

credentials
.virtual('url')
.get(function () {
  return '/collection/profile/'+this._id;
});

module.exports = mongoose.model('credentials', credentials);
