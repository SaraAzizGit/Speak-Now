import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from '../../Components/PieChart/PieChart';
import FeedbackHalfConfident from '../../Components/Read More/FeedbackHalfConfident';
import FeedbackHalfNervous from '../../Components/Read More/FeedbackHalfNervous';
import Button from '../../Components/Button/Button';
import Card from '../../Components/Card/Card';
import './Feedback.css';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get_feedback");
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchData();
  }, []);

  if (!feedbackData || Object.keys(feedbackData).length === 0) {
    return <p>Loading...</p>;
  }

  const videoId = Object.keys(feedbackData)[0]; // Assuming there's only one video feedback
  const { confidence, nervousness } = feedbackData[videoId];

  const pieChartData = {
    datasets: [{
      data: [nervousness, confidence],
      backgroundColor: ['#a772ea', '#DCC7F7'],
      offset: ['0', '60'],
      borderWidth: ['10', '0'],
      borderColor: ['transparent', 'transparent'],
    }],
  };

  const handleRetryButton = async () => {
    try {
      await axios.post('http://localhost:5000/api/delete_video');
      setFeedbackData(null);
    } catch (error) {
      console.log('Error retrying:', error);
    }
  };

  return (
    <div>
      <h1 className='display-1 featuresPageHeading'>Great...Your Detailed Report is Here</h1>
      <div className="container-fluid feedbackContainer ">

        <div className="container-fluid textFeedack">
          <div className="container-fluid cardContainerFeedback">
            <div className="container-fluid"><Card body={"CONFIDENCE"} percent={confidence} /></div>
            <div className="container-fluid"><Card body={"NERVOUSNESS"} percent={nervousness} /></div>
          </div>
          <div className="container-fluid reportFeedback">
            {confidence > nervousness ? <FeedbackHalfConfident /> : <FeedbackHalfNervous />}
          </div>
          <div className="container-fluid buttonReport"><Button message={"Retry"} onClick={handleRetryButton} link={"features"} /></div>
        </div>

        <div className="container-fluid graphFeedback">
          <PieChart data={pieChartData} />
          <div className='container-fluid graphPercent1'>{nervousness}</div>
          <div className='container-fluid graphPercent2'>{confidence}</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
