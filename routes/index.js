
var express = require('express');
var router = express.Router();
var mysql= require('mysql');
var message=require(__dirname+'/../models/message');

/* GET home page. */
router.get('/',
    function(req, res, next) {
     res.render('index', { title: 'Express',
                        URL:process.env.URL,
             });
    });



router.get('/login',function(req, res, next) {
    if(!req.session.user){
      //auth the user
      //getthe user info
      //set it into session
    }else{
      //redirect to home page
      res.redirect();
    }

});

router.get('/logout', function(req, res){
    req.logout();
    res.send('logout');
});



router.get('/me',ensureAuthenticated,function(req, res, next) {

  //database connect
  var con=mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'mydata'
  });

  con.query('select * from battles where bname like ?',["%"+req.params.id+"%"],function(err,rows,fields){
    if(err){
      console.log("fail to connect to DB");
      return;
    }
    res.render('home', { title: 'Express',

                          data:req.session.test,
                          URL:process.env.URL,
                          user:req.user,
      });
  });
  con.end();


});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.send('wtf');
}

module.exports = router;
