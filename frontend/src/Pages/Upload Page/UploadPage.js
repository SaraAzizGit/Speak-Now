import React from 'react'
import Uploader from '../../Components/Uploader/Uploader'
import './UploadPage.css'

const UploadPage = () => {
  return (
    <div className='container-fluid uploader'>
        <div className="container-fluid uploadHeading">
            <h1 className='display-1 uploadVideoHeading'>Upload your video to process!</h1>
        </div>
        <Uploader/>        
    </div>
  )
}

export default UploadPage