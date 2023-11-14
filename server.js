/**
 * Name:            Kurt Pagal
 * NSID:            zja641
 * Student ID:      11314773
 * Course:          CMPT-353
 * Instructor:      Ralph Deters
 */

// Load package
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;  
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Create connection to mysql
const connection = mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "admin"
});

// Check to make sure connection was successful
connection.connect((err) => {
    if (err) throw(err);
    console.log("Connection")
});

// Method to create database postdb
app.get("/init", (req, res) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS postdb`, function(createError, createResults) {
        if (createError) {
            console.log(createError);
            res.status(500).send("Error creating the database");
        }
    });

    // Use the created database
    connection.query(`USE postdb`, function(useError, useResults) {
        if (useError) {
            console.log(useError);
            res.status(500).send("Error using the database"); 
        }

        // Create a query
        const createTableQuery = `CREATE TABLE IF NOT EXISTS posts 
            (id int unsigned NOT NULL auto_increment,
            topic varchar(100) NOT NULL,
            data varchar(100) NOT NULL,
            PRIMARY KEY (id))`;
        
        // Query for creating the databse
        connection.query(createTableQuery, function (createError, createResults) {
            if (createError) {
                console.log(createError);
                res.status(500).send("Error creating the table");
            }

            // Delete all previous rows in the table if it already exists
            connection.query('DELETE FROM posts', function (delError, delResults) {
                if (delError) {
                    console.log(delError);
                    res.status(500).send("Error deleting existing entries");
                }
                
                // When deleting the elements from the table, reset the QUTO_INCREMENT
                connection.query('ALTER TABLE posts AUTO_INCREMENT = 1', function (resetError, resetResults) {
                    if (resetError) {
                        console.log(resetError);
                        res.status(500).send('Error resetting id');
                    }

                    // Notify the server that the database and table is created
                    res.send('Database and Table created');
                })
            });
        });
    });
});

// A method that adds a post to the database 
app.post("/addPost", (req, res) => {
    // Get the value from the topic and data field from the page
    var topic = req.body.topic;
    var data = req.body.data; 

    // Create a query 
    var query = `INSERT INTO posts (topic, data) VALUES ("${topic}", "${data}")`;

    // Query to insert the topic and data into the databse
    connection.query(query, function(insertError, insertResults) {
        if (insertError) console.log(insertError);
        res.send("New post has been added");
    }); 
});

// A method that grabs the elements from the database
app.get("/getPosts", (req, res) => {
    // Create a query
    const databasePost = `SELECT * FROM posts`;

    // Query to grab elements from the database and send the data
    connection.query(databasePost, function(error, results) {
        if (error) console.log(error);
        res.send({ 'posts': results });
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);