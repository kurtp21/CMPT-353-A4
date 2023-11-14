/**
 * Name:            Kurt Pagal
 * NSID:            zja641
 * Student ID:      11314773
 * Course:          CMPT-353
 * Instructor:      Ralph Deters
 */

import './App.css';

// Import required packages
import { useState } from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

// Import the required pages
import { Landing } from './components/landingPage.js';
import { AddPosts } from './components/addPosts.js';
import { GetPosts } from './components/getPosts.js';

function App() {
  // Set use state variables
  const [ list, setList ] = useState(false);

  const handleAddPost = () => {
    // Set a flag
    setList(!list);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='body'>
          <Router>
            <div className='button-layout'>
              <Link to="/addPosts">
                <button>Create Post</button>
              </Link>
              <Link to="/getPosts">
                <button>Show Post</button>
              </Link>
            </div>

            <Routes>
              <Route exact path='/' element={ <Landing/> }/>
              <Route path='/addPosts' element={ <AddPosts onAddPost={ handleAddPost }/> }/>
              <Route path='/getPosts' element={ <GetPosts key = { list }/> }/>
            </Routes>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
