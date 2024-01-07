import React from 'react'
import { ReadMoreData } from './ReadMoreData'
import './ReadMore.css'

const ReadMore = () => {
    const feedback=ReadMoreData.map(data=>{
      if(data.id==="3"||data.id==='4'){
        return(
          <div className={`container-fluid `}>
              
              <div className="container-fluid "><h1 className='h3 feedbackHeading '>{data.heading}</h1></div>
              <div className="container-fluid "><h1 className='h6 feedbackData'>
                <ol>
                  <li>{data.placeholder[0]}</li>
                  <li>{data.placeholder[1]}</li>
                </ol>
                </h1></div>
          </div>
        )
      }
      else if(data.id==='2'){
        return(
          <div className={`container-fluid `}>
              
              <div className="container-fluid "><h1 className='h3 feedbackHeading'>{data.heading}</h1></div>
              <div className="container-fluid "><h1 className='h6 feedbackData'>
                <ol>
                  <li>{data.placeholder[0]}</li>
                  <li>{data.placeholder[1]}</li>
                  <li>{data.placeholder[2]}</li>
                </ol>
                </h1></div>
          </div>
      )
      }
      else{
        return(
          <div className={`container-fluid `}> 
            <div className="container-fluid "><h1 className='h3 feedbackHeading'>{data.heading}</h1></div>
            <div className="container-fluid "><h1 className='h6 feedbackData'>{data.placeholder[0]}</h1></div>
          </div>
      )
      }
    })

  return (
    <div>
      <div className="container-fluid first" >
      {feedback}
      </div>
    </div>
  )
}

export default ReadMore