import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Pages from './Pages';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Pages/>
    </Router>
  )
}

export default App