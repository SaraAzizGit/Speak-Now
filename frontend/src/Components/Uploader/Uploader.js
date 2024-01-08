import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {MdCloudUpload,MdDelete} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import './Uploader.css'
import Button from '../../Components/Button/Button'

const Uploader = () => {

    const [video,setVideo]=useState(null);
    const [fileName,setFileName]=useState("No selected file");

    const uploadVideo = async(file) => {
      const formData = new FormData()
      formData.append('video', file)

      try {
        const response = await axios.post('http://localhost:5000/api/upload_video', formData, { method: 'POST', })

        console.log(response.data)
      } catch (error) {
        console.log('Error uploading video', error)
      }
    }

    const handleFileChange = (files) => {
      if (files) {
        setFileName(files[0].name)
        setVideo(URL.createObjectURL(files[0]))
        uploadVideo(files[0])
      }
    }

  return (
    <div className='container-fluid uploaderContainer'>
        <main className='container-fluid containerMain'>
            <form className='container-fluid UploaderForm' onClick={()=>document.querySelector(".input-field").click()}
            >
                <input 
                  type="file"  
                  className='input-field' 
                  hidden 
                  onChange={({target:{files}}) => handleFileChange(files)}
                />
                {video ?
                <ReactPlayer
                  url={video}
                  playing={true}
                  volume={0.5}
                  controls={true}
                />
                :
                <>
                <MdCloudUpload color='#1475cf' size={60}/>
                <p>Browse Files to Upload</p>
                </>
                }
            </form>

            <section className='uploaded-row'> 
                <AiFillFileImage color='#1475cf'/>
                <span className='upload-content'>
                    {fileName}
                    <MdDelete 
                       onClick={()=>{setFileName("No selected file");
                       setVideo(null)
                    }}
                    />
                </span>
            </section>

            <div className="container-fluid featureButton"><Button message={"Upload"} link={"feedback"}></Button></div>

        </main>
    </div>

  )
}

export default Uploader
