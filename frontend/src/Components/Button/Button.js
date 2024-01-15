import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ message, link, onClick }) => {
  return (
    <Link to={`/${link}`}>
      <button className='btn btn-info btn-lg button' onClick={onClick}>
        <span className='buttonText'>{message}</span>
      </button>
    </Link>
  );
};

export default Button;