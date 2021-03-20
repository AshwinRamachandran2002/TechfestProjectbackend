//var got = require('../models/got');
var assigned = require('../models/assigned');
var credentials = require('../models/empdetails');
var bodyParser = require('body-parser')
const { body,validationResult } = require("express-validator");
var async = require('async');
const { request } = require('express');
const empdetails = require('../models/empdetails');




exports.signupget = [(req,res,next)=>{
    console.log('hi')
    
            credentials.findOne({ 
                'name': req.params.name,
                'division': req.params.division,
                'email':req.params.email }, function(err, user) {
                  
                    if (err) { return next(err); }
                  
                  if (user) {
                      
                      console.log('you aldready have a account');
                      res.json({userId:'_@_', message: 'You already have a account' });
                        
                  } else {
                    var author = new credentials(
                        {
                            name: req.params.name,
                            division: req.params.division,
                            email: req.params.email,
                        }
                    );
                    author.save();
                    res.json({userId: author._id, message: 'Valid' });
                  }
               })}
        
];


