// Import React framework and destructure `useState`
import React, { useState } from "react";

// Import the `useMutation()` hook from Apollo Client
import { useMutation } from "@apollo/client";

// Import Material UI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Alert, AlertTitle } from "@mui/material";

// Reference required mutation for logging in a user
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ username: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Assign the LOGIN_USER mutation to `loginUser` and capture any errors returned
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    // Handling state change of login form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Name: ${name} and Value: ${value}`);
        setUserFormData({ ...userFormData, [name]: value });
    };

    let handleSubmit = async (event) => {
        event.preventDefault();

        // Check if form has everything
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // Spread `userFormData` into `loginUser` and return context data about the user for the subsequent login function
            const { data } = await loginUser({ variables: { ...userFormData } });
            console.log(data);

            // Store the token to local storage. (`login` refers to the typesDefs mutation)
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            // If error in login, then show alert
            setShowAlert(true);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <>
            <Fade in={true}>
                <Box noValidate validated={validated} sx={style} component="form" onSubmit={handleSubmit}>
                    <Stack
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <h3>Login to Let's Go!</h3>
                        <TextField type="text" placeholder="Your username" name="username" value={userFormData.username} onChange={handleInputChange} required />

                        <TextField type="password" placeholder="Your password" name="password" value={userFormData.password} onChange={handleInputChange} required />

                        <Button variant="outlined" type="submit">
                            Log In
                        </Button>


                    </Stack>
                </Box>
            </Fade>
            {error && <div>Something went wrong...</div>}
        </>
    );
};

export default LoginForm;
