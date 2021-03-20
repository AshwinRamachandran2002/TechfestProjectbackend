const downloadsFolder = require('downloads-folder');
//var got = require('../models/got');
var assigned = require('../models/assigned');
var credentials = require('../models/empdetails');
var fileSystem= require("fs")
const { Parser } = require('json2csv');
const { body,validationResult } = require("express-validator");

var async = require('async');


exports.csvsubmitted = function(req, res, next) {
    
  credentials.findOne({'_id': req.params.userid},function(err,oth){
    assigned.find({'subby':oth.email}, function(err, user) {
              console.log(user)
              
              const fields = ['namecust','email' ,'status','subto','subby','segdet','projdet','dollarValue'];
              
              const json2csvParser = new Parser({ fields });
              const csv = json2csvParser.parse(user);
              
              console.log(csv);
               
            res.attachment('submitted_leads.csv');
            res.status(200).send(csv);
              console.log('yes');   
              
       })
      })

      
};
exports.csvassigned = function(req, res, next) {
  credentials.findOne({'_id': req.params.userid},function(err,oth){
  assigned.find({'subto':oth.email}, function(err, user) {
            console.log(user)
            
            const fields = ['namecust','email' ,'status','subto','subby','segdet','projdet','dollarValue'];
            
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(user);
            
            console.log(csv);
             
          res.attachment('assigned_leads.csv');
          res.status(200).send(csv);
            console.log('yes');   
            
     })

    })
};
exports.csvvalidated = function(req, res, next) {
  credentials.findOne({'_id': req.params.userid},function(err,oth){
  assigned.find({'status':'Validated','subto':oth.email}, function(err, user) {
            console.log(user)
            
            const fields = ['namecust','email','status','segdet','projdet','dollarValue','subto','subby'];
            
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(user);
            
            console.log(csv);
             
          res.attachment('validated_leads.csv');
          res.status(200).send(csv);
            console.log('yes');   
            
     })
    })

};
exports.csvrejected = function(req, res, next) {
  credentials.findOne({'_id': req.params.userid},function(err,oth){
  assigned.find({'status':'Rejected','subto':oth.email}, function(err, user) {
            console.log(user)
            
            const fields = ['namecust','email','status','segdet','projdet','dollarValue','subto','subby'];
            
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(user);
            
            console.log(csv);
             
          res.attachment('rejected_leads.csv');
          res.status(200).send(csv);
            console.log('yes');   
            
     })
    })

};

exports.csvclosed = function(req, res, next) {
  credentials.findOne({'_id': req.params.userid},function(err,oth){
  assigned.find({'status':'Closed','subto':oth.email}, function(err, user) {
            console.log(user)
            
            const fields = ['namecust','email','status','segdet','projdet','dollarValue','subto','subby'];
            
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(user);
            
            console.log(csv);
             
          res.attachment('closed_leads.csv');
          res.status(200).send(csv);
            console.log('yes');   
            
     })
    })

}


