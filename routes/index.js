var express = require('express');
var router = express.Router();

//var got = require('../controllers/gotController'); 
//var given = require('../controllers/assignedContoller.js');
var home = require('../controllers/homeController.js');
var log = require('../controllers/loginpage');
var signup = require('../controllers/signup');
var csv = require ('../controllers/csvController');
const { request } = require('../app');

router.get('/signin/:name/:email/:division',log.loginget);

router.get('/signup/:name/:email/:division',signup.signupget)

router.get('/:userid/home/submit/newleadinput',home.displaynew)
router.get('/:userid/home/submit/subleadinput',home.displaysub)
router.get('/:userid/home/submit/assleadinput',home.displayass)
router.get('/:userid/form/submission',home.addass)




router.get('/:userid/home/changestatus/:subid/:status',home.gotchangestatus);
router.get('/:userid/home/submit/subleadinput/getcsv',csv.csvsubmitted)
router.get('/:userid/home/submit/assleadinput/getcsv',csv.csvassigned)
router.get('/:userid/home/submit/assleadinput/csvvalidated',csv.csvvalidated)
router.get('/:userid/home/submit/assleadinput/csvrejected',csv.csvrejected)
router.get('/:userid/home/submit/assleadinput/csvclosed',csv.csvclosed)


//router.get('/:userid/home/summary',home.summary)

module.exports = router;
