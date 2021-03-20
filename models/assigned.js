var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var assigned = new Schema({
    id:{type:String,required:true},
    namecust: {type: String, required: true},
    segdet: { type:String, required: true },
    email: {type: String, required: true},
    projdet:{type:String},
    subby: {type: String},
    subto: {type: String},
    status:{type:String,enum:['Open','Validated','Rejected','Closed'],default:'Open'},
    dollarVal:{type:String},
    datecreated:{type:Date, default:Date.now()},
    datevalidated:{type:Date},
    datevaccepted:{type:Date},
    daterejected:{type:Date},
    seen:{type:String,default:'false'}
});

// Virtual for this user instance URL.
assigned
.virtual('url')
.get(function () {
  return '/collection/profile/:id/given/'+this._id;
});

// Export model.
module.exports = mongoose.model('assigned', assigned);
