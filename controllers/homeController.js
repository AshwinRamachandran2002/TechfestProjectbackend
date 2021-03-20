//var got = require('../models/got');
var assigned = require('../models/assigned');
var credentials = require('../models/empdetails');

const { body,validationResult } = require("express-validator");

var async = require('async');
/*
//display the profile of user
exports.displayall = function(req, res, next) {
    console.log(req.params.userid);
    credentials.findOne( 
      {'_id': req.params.userid,}, function(err, user) {
            console.log(user)
            console.log('ok');   
            res.render('homedisp',{ title:'Profile',name: user.name, email:user.email,division: user.division } );
     })
    
}; 

*/
exports.displaysub = function(req, res, next) {
  console.log(req.params.userid);
  assigned.find( 
    {'id': req.params.userid}, function(err, user) {  
          res.json(user);
   })
  
}; 

exports.displayass = function(req, res, next) {
  console.log(req.params.userid);

  credentials.findOne({'_id': req.params.userid},function(err,user){
    assigned.find( 
      {'subto': user.email}, function(err, oth) {  
            res.json(oth);
     })

  })
  
  
}; 

exports.displaynew = function(req, res, next) {
  console.log('ohhhhh')
  console.log(req.params.userid);
  
   credentials.findOne({'_id': req.params.userid},function(err,user){
    assigned.find( 
      {'subto': user.email, 'seen':'false'}, function(err, oth) {  
  
        for (i = 0; i < oth.length; i++) {
              oth[i].seen='true';
              oth[i].update();
        }
        console.log(oth[0].seen)
            res.json(oth);
  
     })

  })
  
}; 


// Handle book create on POST.
exports.addass = [

  (req, res, next) => {
         credentials.findOne( 
          {'_id': req.params.userid}, function(err, user) {
            console.log('yes')
            var book = new assigned(
              { name: req.body.name,
                segdet: req.body.segdet,
                email: req.body.email,
                proj: req.body.projdet,
                subto: req.body.subto,
                subby:req.body.subto,
                id: user._id,
               });
               assigned.find({'email':book.email},function(err,oth){
                 if(oth){
                   res.json({});
                 }
                 else{
                  book.save(function (err) {
                    if (err) { return next(err); }
                       // Successful - redirect to new book record.
                       
                       res.json({id: book._id})
                    });

                 }
               }) 
         })
      }
];



exports.gotchangestatus = function(req, res, next) {
    
  assigned.find(
    {'_id': req.params.subid}, function(err, sub) {
      console.log(sub)
      if(req.params.status=='Validated'){
        sub.status='Validated'
        sub.datevalidated= Date.now();
      }
      else if(req.params.status=='Rejected'){
        sub.status='Rejected';
        sub.daterejected= Date.now();
      }
      else{
        sub.status='Closed';
        sub.dateclosed= Date.now();

      }
      sub.update();
      res.json(sub);

})
  
};  

exports.test = [(req,res,next)=>{

  
  var js= {name: req.params.name,
    segdet: req.params.segdet,
    email: req.params.email,
    proj: req.params.projdet,
    subto: req.params.subto,
    subby:req.params.subto,
  dollarVal:req.params.dollarVal};
  req.body=js
  console.log(req)
  next()
},
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('name', 'Invalid Name.').trim().isAlpha().escape(),
    body('segdet', 'Segment must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email field must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email','Not a valid email').trim().isEmail().escape(),
    body('subto', 'Email field must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('subto','Not a valid email').trim().isEmail().escape(),
    body('subby', 'Email field must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('subby','Not a valid email').trim().isEmail().escape(),
    body('dollarVal', 'Value field must not be empty.').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
        var book = new assigned(
          { name: req.body.name,
            segdet: req.body.segdet,
            email: req.body.email,
            proj: req.body.projdet,
            subto: req.body.subto,
            subby:req.body.subto,
            id:1
            });
          console.log('book.name')
                res.json({taken:true});
              

                 
               }
         
];


exports.summary=function(req,res,next){
  var countall,countsub,countass,dollar;
  credentials.findOne({'_id': req.params.userid}, function(err, user) {
      assigned.count({'subby':user.email},{'subto':user.email}), function(err, result){
        countall=result;
      }
    });
  credentials.findOne({'_id': req.params.userid}, function(err, user) {
      assigned.count({'subby':user.email}), function(err, result){
        countsub=result;


      }
    }) 
    credentials.findOne({'_id': req.params.userid}, function(err, user) {
      assigned.count({'subto':user.email}), function(err, result){
        countass=result;


      }
    }) 

}