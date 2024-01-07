import React from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import './HomePage.css'
const HomePage = () => {
  return (
    <div className="container-fluid">
      <NavBar/>
      <div className="container-fluid homePageContainer">
      <h1 className="display-1 homePageHeading">Speak Now</h1>
      <button className='btn btn-info btn-lg homePageButton' ><Link to="/features" className='HomebuttonText'>Explore</Link></button>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage
