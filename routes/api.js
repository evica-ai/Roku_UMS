const express = require('express');
const router = express.Router();
const sql = require('mysql');
const creds = require('../config/user');

//create the sql connection pool, for all the sql code reference to npm sql website
var pool  = sql.createPool(creds);

router.get('/', (req, res) => {
    res.json({message: 'hit the main ums route'});
})


//get all users
router.get('/users', (req, res) => {

    //START THE POOL QUERY - try to query the database and get all of the users
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM users', function (error, results) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
          res.json(results);
        });
      });

    //END THE POOL QUERY

})

//get one users in this route
router.get('/users/:user', (req, res) => {
    
    //START THE POOL QUERY - try to query the database and get all of the users
    //this is the user id:
    //console.log(req, params, user);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM users WHERE id=${req.params.user}`, function (error, results) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
          console.log(results);
       
          // Don't use the connection here, it has been returned to the pool.
          res.json(results);
        });
      });

    //END THE POOL QUERY

})

module.exports = router;