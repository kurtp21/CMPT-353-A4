/**
 * Name:            Kurt Pagal
 * NSID:            zja641
 * Student ID:      11314773
 * Course:          CMPT-353
 * Instructor:      Ralph Deters
 */

// Import required packages
import "./AddPosts.css";
import React, { useState } from 'react';
import axios from 'axios';

export const AddPosts = ({ onAddPost }) => {
    // Set use state variables to an empty string
    const [ topic, setTopic ] = useState('');
    const [ data, setData ] = useState('');

    // Function to add the post to the database
    const addPost = () => {
        // Connect to the server
        axios.post('http://localhost:81/addPost', { topic, data })
        .then(response => {
            console.log(response.data);
            onAddPost();
            setTopic('');
            setData('');
        })
        .then(alert('Added post'))
        .catch( error => console.error(error) );
    };

    return (
        <div className="add-container">
            <h3>Add Post</h3>
            
            <div className="layout">
                <section>
                    <input type="text" placeholder="Topic:" value={ topic } onChange={ e => setTopic(e.target.value) }/>
                    <input type="text" placeholder="Data:" value={ data } onChange={ e => setData(e.target.value) }/>
                </section>
                <button onClick={ addPost }>Submit</button>
            </div>
        </div>
    );
}