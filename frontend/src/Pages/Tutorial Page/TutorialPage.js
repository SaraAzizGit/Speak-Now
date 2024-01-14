import React from 'react'
import ReactPlayer from 'react-player'
import Button from '../../Components/Button/Button'
import './TutorialPage.css'

const TutorialPage = () => {
    const vidUrl='https://www.facebook.com/facebook/videos/10153231379946729';
  return (
    <div className='container-fluid tutorialPageContainer'>
        <h1 className='display-1 tutorialHeading'>Feeling Stuck?</h1>
        <h1 className='display-6 tutorialSubHeading'>No worries, we got you!</h1>
        <div className='container-fluid tutorialVideoContainer'>
            <ReactPlayer
              url={vidUrl}
              playing={false}
              volume={0.5}
            />
        </div>
        <div className="container-fluid tutorialButton"><Button message={"Let's go Speak!"} link={"features"}></Button></div>
    </div>
  )
}

export default TutorialPage