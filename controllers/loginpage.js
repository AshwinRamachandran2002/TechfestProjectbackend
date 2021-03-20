//var got = require('../models/got');
var assigned = require('../models/assigned');
var credentials = require('../models/empdetails');
var bodyParser = require('body-parser')
const { body,validationResult } = require("express-validator");
var async = require('async');
const { request } = require('express');
const empdetails = require('../models/empdetails');

// Handle Author create on POST.
exports.loginget = (
    (req, res, next) => {
        console.log('hiii')

        credentials.findOne({ 
            'name': req.params.name,
            'division': req.params.division,
            'email':req.params.email }, function(err, user) {
                
                console.log('jfjjfjf')
                if (user) {
                    console.log(user._id)
                    console.log('welcome user');
                    console.log({userId:user._id,message:'Valid'})
                    res.json({userId:user._id, message:'Valid'})
                    
                }
                else{
                    console.log({userId:1, message:'i'})
                    res.json({userId:1, message:'i'})
                }
             })
        })
    


/*

exports.loginupdateget = function (req, res, next) {
    //will have a divison and email update form
    res.render('loginupdate', { title: 'Login update' });
};




// Handle Author create on POST.
exports.loginupdatepost = [


    // Validate and sanitize fields.
    body('division', 'Division must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email field must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email','Not a valid email').trim().isEmail().escape(),
    body('email').custom(value => {
        return credentials.findOne({'email':value}).then((user,{req}) => {
            if(user){
                if(!user._id== req.params.userid){
                    throw new Error('Email aldready in use');
    
                }
            }
        });
    }),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('loginpage', { title: 'login', errors: errors.array() });
            return;
        }
        else{
        var author = new credentials(
            {
                division: req.body.division,
                email: req.body.email,
            }
        );
        
        credentials.findOne({ 
            'division': req.body.division,
            'email':req.body.email }, function(err, user) {
                
                if (err) { return next(err); }
                if (!user) {
                    //changes have been made
                    User.findByIdAndUpdate(req.params.userid, { 'division': req.body.division,'email':req.body.email }, 
                            function (err, docs) { 
                                if (err){ 
                                    console.log(err) 
                                } 
                                
                            }); 
                    
                    console.log('updated user');
                    console.log(user._id);
                    res.redirect('/collections/profile/'+user._id+'/display');
                } else {
                res.render('loginpage', { title: 'no changes made', author: author });
                }
            })
        }}
    
];*/