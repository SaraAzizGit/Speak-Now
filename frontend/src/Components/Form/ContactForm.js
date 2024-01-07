import React from 'react'
import emailjs from '@emailjs/browser' //for form functionality
import {useState, useRef} from 'react'
import './ContactForm.css'

/*Email JS info*/
//Template ID :template_nwnmr0n
//Service ID :service_0oq099p
//Public Key : qeTNi_9lSQF7xmnWn

const ContactForm = () => {

  const formRef = useRef();
  const [form, setForm] = useState({
    name:'',
    email:'',
    message:'',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();//otherwise browser would refresh as it is default browser behaviour
    
    //start sending of email message
    setLoading(true);

    //service id ,template id , message details ,public key
    emailjs.send(
      'service_0oq099p',
      'template_nwnmr0n',
      {
        from_name:form.name,
        to_name : 'Maria Ashfaq',
        from_email : form.email,
        to_email: "mariaashfaq.02@gmail.com",
        message:form.message,
      },
      'qeTNi_9lSQF7xmnWn'
      )
      .then(()=>{
        setLoading(false);
        alert("Thank you .We will get back to you as soon as possible !");
        //reset the form
        setForm({
        name:'',
        email:'',
        message:'',
        })
      },(error)=>{
        setLoading(false);
        console.log(error);
        alert("Something went wrong");
      })

  }

  const handleChange=(e)=>{
    const {name,value} =e.target;
    setForm({...form ,[name]:value})
  }
  return (
    <div className='container-fluid'>
      <form 
        ref={formRef}
        onSubmit = {handleSubmit}
        className='formContainer'
      >

        <div class="mb-3 formSubContainer">
            <label for="exampleInputName1" className="form-label">Name</label>
            <input name='name' type="text" className="form-control" id="exampleInputName1" value={form.name} onChange={handleChange}/>
        </div>

        <div class="mb-3 formSubContainer">
            <label for="exampleInputEmail1" class="form-label">Email  address</label>
            <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={form.email} onChange={handleChange}/>
            
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        
        <div class="mb-3 formSubContainer">
            <label for="exampleInputMessage1" class="form-label"  >Message</label>
            <input name='message' type="text" className="form-control" id="exampleInputMessage1" value = {form.message} onChange={handleChange}/>
        </div>
        
        <div class="mb-3 formSubContainerButton">
          <button type="submit" class="btn btn-primary formButton">{loading?'Submitting....':'Submit'}</button>
        </div>
        </form>
    </div>
  )
}

export default ContactForm
