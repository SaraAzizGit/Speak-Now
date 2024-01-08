import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'

const Button = ({ message, link, onClick }) => {
  return (
    <button className='btn btn-info btn-lg button' onClick={onClick}>
    <Link to={`/${link}`} className='buttonText'>{message}</Link>
    </button>
  )
}
export default Button