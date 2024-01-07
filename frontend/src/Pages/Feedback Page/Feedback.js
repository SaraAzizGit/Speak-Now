import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PieChart from '../../Components/PieChart/PieChart'
import FeedbackHalf from '../../Components/Read More/FeedbackHalf'
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import './Feedback.css'

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState(null)

  useEffect(() => {
    // Make an API call to get feedback data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get_feedback")
        setFeedbackData(response.data)
      } catch (error) {
        console.error('Error fetching feedback data:', error)
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  if (feedbackData === null) {
    return <p>Loading...</p>;
  }

  const pieChartData = {
    datasets: [{
      data: [feedbackData.nervousness, feedbackData.confidence],
      backgroundColor: ['#a772ea', '#DCC7F7'],
      offset: ['0', '60'],
      borderWidth: ['10', '0'],
      borderColor: ['transparent', 'transparent'],
    }],
  };

  return (
    <div>
      <h1 className='display-1 featuresPageHeading'>Great...Your Detailed Report is Here</h1>
      <div className="container-fluid feedbackContainer ">

      <div className="container-fluid textFeedack">

        <div className="container-fluid cardContainerFeedback">
        <div className="container-fluid"><Card body={"CONFIDENCE"} percent={feedbackData.confidence}/></div>
        <div className="container-fluid"><Card body={"NERVOUSNESS"} percent={feedbackData.nervousness}/></div>
        </div>
        <div className="container-fluid reportFeedback"> <FeedbackHalf/></div>
        <div className="container-fluid buttonReport"><Button message={"Download Report"}/></div>
        
      </div>
      
      <div className="container-fluid graphFeedback">
        <PieChart data={pieChartData} />
        <div className='container-fluid graphPercent1'>{feedbackData.nervousness}</div>
        <div className='container-fluid graphPercent2'>{feedbackData.confidence}</div>
      </div>
      </div>
    </div>
  )
}

export default Feedback
