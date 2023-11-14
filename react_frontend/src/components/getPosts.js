/**
 * Name:            Kurt Pagal
 * NSID:            zja641
 * Student ID:      11314773
 * Course:          CMPT-353
 * Instructor:      Ralph Deters
 */

// Import required packages
import './GetPosts.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const GetPosts = () => {
    // Set use state variables to an empty array
    const [ posts, setPosts ] = useState([]);

    // useEffect() function to get posts from the database
    useEffect(() => {
        axios.get('http://localhost:81/getPosts')
            .then(response => setPosts(response.data.posts))
            .then(alert("Grabing from the database!"))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='container'>
            <h3>Posts</h3>
            <div className='info'>
                {/* Map the items from posts to a div style */}
                {posts.map(post => (
                    <div>
                        <h4 key={post.id}>{post.id}: {post.topic}</h4>
                        <li key={post.id}>{post.data}</li>
                    </div>
                ))}
            </div>
        </div>
    );
};