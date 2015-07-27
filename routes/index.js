
var express = require('express');
var router = express.Router();
var mysql= require('mysql');
var message=require(__dirname+'/../models/message');


/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express',
    URL:process.env.URL
  });
});



router.get('/:id',function(req, res, next) {
  //database connect
  var con=mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'mydata'
  });
  var msg=message();
  msg.content='i am here!!';
  msg.user='zuozini';
  con.query('select * from battles where bname like ?',["%"+req.params.id+"%"],function(err,rows,fields){
    if(err){
      console.log("fail to connect to DB");
      return;
    }
    res.render('home', { title: 'Express',
                          id: req.params.id,
                          data:rows,
                          URL:process.env.URL,
                          msg:msg
      });
  });
  con.end();


});

module.exports = router;
