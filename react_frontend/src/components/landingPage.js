/**
 * Name:            Kurt Pagal
 * NSID:            zja641
 * Student ID:      11314773
 * Course:          CMPT-353
 * Instructor:      Ralph Deters
 */

// Import required packages
import React from 'react';
import axios from 'axios';

export const Landing = () => {
    // A function to initialize and create a table for the database
    const initDatabase = () => {
        axios.get('http://localhost:81/init')
        .then(response => {
            console.log(response.data);
        }).then(alert("Created the database"))
        .catch(error => console.error(error));
    };

    initDatabase();     // insitial call to the initialize function

    return (
        <div>
            <h3>Welcome!</h3>
            <p>Create a new post or see all the previous posts you have created!</p>
        </div>
    );
} 