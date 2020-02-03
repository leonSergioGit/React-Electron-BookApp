import React from 'react';
import Home from './components/pages/Home';
import Navbar from './components/pages/Navbar';
import BookState from './components/context/BookState';

function App() {
  return (<div>
      <BookState >
          <Navbar />
          <Home />
        </BookState>
  </div>
   
  )
}

export default App
