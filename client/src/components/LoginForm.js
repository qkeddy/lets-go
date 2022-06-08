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
    const [validated] = useState(false);
    // const [showAlert, setShowAlert] = useState(false);

    // State for logging in
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // TODO - the following code might be more efficient
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });

    // Assign the LOGIN_USER mutation to `loginUser` and capture any errors returned
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    // Handling state change of login form
    let handleChange = (event) => {
        if (event.target.id === "loginUserID") {
            setUserName(event.target.value);
        } else if (event.target.id === "loginPasswordID") {
            setPassword(event.target.value);
        }
    };

    let handleSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // Spread `userFormData` into `loginUser` and return context data about the user for the subsequent login function
            const { data } = await loginUser({
                variables: {
                    username: username,
                    password: password,
                },
            });

            // Store the token to local storage. (`login` refers to the typesDefs mutation)
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            // TODO If error in login, then show alert
        }

        console.log("Got Here - LoginForm.js");
        // Reset login form data
        setUserName({ usernameLogin: "" });
        setPassword({ passwordLogin: "" });
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
                        <h3>Welcome To Let's Go</h3>
                        <TextField helperText="Please enter username" id="loginUserID" label="Username" value={username} onChange={handleChange} required />

                        <TextField helperText="Please enter your Password" id="loginPasswordID" type="password" label="Password" value={password} onChange={handleChange} required />

                        <Button variant="outlined" type="submit">
                            Log In
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </>
    );
};

export default LoginForm;
