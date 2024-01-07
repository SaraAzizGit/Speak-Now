import React from 'react'
import './Accordion.css'
import { AccordionData } from './AccordionData'

const Accordion = () => {

    const faq=AccordionData.map(data=>{
        return(

            <div className="accordion accordion-flush faqMain" id="accordionFlushExample">
                <div className={`accordion-item faq${data.id}`} id={data.id}>
                    <h2 className="accordion-header accordionQuestion">
                        <button className="accordion-button collapsed accordionQuestion" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${data.id}`} aria-expanded="false" aria-controls={`flush-collapse${data.id}`}>
                            {data.heading}
                        </button>
                    </h2>
                    <div id={`flush-collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            {data.placeholder}
                        </div>
                    </div>
                </div>
            </div>

        )
    })
  return (
    <div className='container-fluid'>

        {faq}
    </div>
  )
}

export default Accordion
