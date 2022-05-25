import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './contactSupport'


export default function Contact() {

    // const styles = {
    //     formStyle: {
    //       justifyContent: 'center',
    //       color: 'white',
    //       textAlign: 'center'
    //     },
    //   };

    const form = useRef();

    const sendEmail = (e) => {
        // e.preventDefault();

        emailjs.sendForm('service_3bsgvam', 'template_xd4v0m1', e.target, 'uXqGyr9ayTDBeBgC9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <div className='inputs'>
            <label>Name</label>
            <input type="text" name="user_name" />
            </div>
            <div className='inputs'>
            <label>Email</label>
            <input type="email" name="user_email" />
            </div>
            <div className='inputs'>
            <label>Message</label>
            <textarea name="message" />
            </div>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </form>
    )
}