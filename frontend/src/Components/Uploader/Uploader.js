import React from 'react'
import { useState } from 'react'
import {MdCloudUpload,MdDelete} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import './Uploader.css'

const Uploader = () => {

    const [video,setVideo]=useState(null);
    const [fileName,setFileName]=useState("No selected file");
  return (
    <div className='container-fluid uploaderContainer'>
        <main className='container-fluid containerMain'>
            <form className='container-fluid UploaderForm' onClick={()=>document.querySelector(".input-field").click()}
            >
                <input 
                  type="file"  
                  className='input-field' 
                  hidden 
                  onChange={({target:{files}})=>{
                    files[0]&&setFileName(files[0].name)
                    if(files){
                        setVideo(URL.createObjectURL(files[0]))
                    }
                  }
                }/>
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

        </main>
    </div>

  )
}

export default Uploader
