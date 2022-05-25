import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import './contactSupport.css'


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
            <div className='formContainer'>
                <h1 className='inputs'>Contact Us</h1>
                <div className='inputsOne'>
                    <TextField id="filled-basic" label="Name" variant="filled" name='name' />
                    <TextField id="filled-basic" label="Email" variant="filled" name='email' />
                </div>
                <div className='inputs'>
                    <TextField
                        id="filled-multiline-static"
                        label="Message"
                        multiline
                        rows={6}
                        placeholder="Message"
                        variant="filled"
                        name='message'
                    />
                </div>
                <div className='button'>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </div>
        </form>
    )
}