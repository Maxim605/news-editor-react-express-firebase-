// ./src/App.js
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import NewsEditor from './features/news/NewsEditor.js'; 
import NewsList from './features/news/NewsList.js'; 

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Новостной редактор</h1>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link" 
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <NewsEditor />
        <NewsList />
        
      </header>
    </div>
    
  );
}

export default App;


