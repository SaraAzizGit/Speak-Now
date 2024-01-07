import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './Pages/Home Page/HomePage';
import React from "react";
import About from './Pages/About Page/About';
import Features from './Pages/Features Page/Features';
import Team from './Pages/Team Page/Team';
import Contact from './Pages/Contact Page/Contact';
import ErrorPage from './Pages/Error Page/ErrorPage';
import Record from './Pages/Record Page/Record';
import Uploader from './Components/Uploader/Uploader';
import Feedback from './Pages/Feedback Page/Feedback';
import ReadMore from './Components/Read More/ReadMore';

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/features' element={<Features/>}/>
          <Route path='/team' element={<Team/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/error' element={<ErrorPage/>}/>
          <Route path='/record' element={<Record/>}/>
          <Route path='/upload' element={<Uploader/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/readmore' element={<ReadMore/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
