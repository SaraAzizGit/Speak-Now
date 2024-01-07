import React from 'react'
import './Card.css'

const Card = (props) => {
  return (
    <div class="container-fluid card">
        <div class="card-body">    
        <div class="card-body-child1">{props.body}</div> 
        <div class="card-body-child2">{props.percent}% </div>  
        </div>
    </div>
  )
}

export default Card