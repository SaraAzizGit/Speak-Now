import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'

const Button = (props) => {
  return (
    <button className='btn btn-info btn-lg button' >
    <Link to={`/${props.link}`} className='buttonText'>{props.message}</Link>
    </button>
  )
}
export default Button
