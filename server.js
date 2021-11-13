const express = require('express')
const cors = require('cors')
var path = require('path');
//require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require("./route/user.rou.js");
const app = express()
const PORT = process.env.PORT || 8080  

//middleware 
//app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//cors - alow APIies from different I.P addresses
app.use(cors({ origin: true, credentials: true }));
//app.use(cors())

//JSON bodyParser
app.use(bodyParser.json());
//Cookie Parser to set cookies in browser - must call it before routes 
app.use(cookieParser())
//app.use(express.json())

//all user routes
app.use('/', userRoute)


//---------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
//---------------  


//start node js server on desired port 
app.listen(PORT, ()=> {console.log(`Port is up @ ${PORT}`)})
