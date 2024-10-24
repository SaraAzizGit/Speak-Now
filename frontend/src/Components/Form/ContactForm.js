import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

/*Email JS info*/
//Sara Aziz
//Template ID: template_zhhwb0w
//Service ID: service_txccwd8
//Public Key: yu0zzbUjf3IpMAy-P

const ContactForm = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const sendEmail = (recipient, serviceId, templateId, publicKey) => {
        return emailjs.send(
            serviceId,
            templateId,
            {
                from_name: form.name,
                from_email: form.email,
                to_name: recipient.name,
                to_email: recipient.email,
                message: form.message,
            },
            publicKey,
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const recipients = [
            {
                name: "Sara Aziz",
                email: "saraaziz180903@gmail.com",
                serviceId: "service_txccwd8",
                templateId: "template_zhhwb0w",
                publicKey: "yu0zzbUjf3IpMAy-P",
            },
        ];

        const emailPromises = recipients.map((recipient) => {
            return sendEmail(
                recipient,
                recipient.serviceId,
                recipient.templateId,
                recipient.publicKey,
            );
        });

        Promise.all(emailPromises)
            .then(() => {
                setLoading(false);
                alert(
                    "Thank you. We will get back to you as soon as possible!",
                );
                setForm({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                alert("Something went wrong");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="container-fluid">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="formContainer"
            >
                <div className="mb-3 formSubContainer">
                    <label htmlFor="exampleInputName1" className="form-label">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 formSubContainer">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3 formSubContainer">
                    <label
                        htmlFor="exampleInputMessage1"
                        className="form-label"
                    >
                        Message
                    </label>
                    <input
                        name="message"
                        type="text"
                        className="form-control"
                        id="exampleInputMessage1"
                        value={form.message}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 formSubContainerButton">
                    <button
                        type="submit"
                        className="btn btn-primary formButton"
                    >
                        {loading ? "Submitting...." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
