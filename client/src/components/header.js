import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { CREATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function Header() {

  // sign up modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // login modal state
  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  const [username, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [createUser, { error }] = useMutation(CREATE_USER);

  let handleChange = e => {
    if (e.target.id === 'usernameID') {
      setUserName(e.target.value)
    } else if (e.target.id === 'passwordID') {
      setPassword(e.target.value)
    } else if (e.target.id === 'emailID') {
      setEmail(e.target.value)
    }



    //  delete this
    console.log(e);
    console.log(e.target.value);
  };

  let handleSubmit = async e => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      // Spread `userFormData` into `createUser` and return context data about the user for the subsequent login function
      const { data } = await createUser({ variables: { username: username, email: email, password: password } });
      console.log(data);
      // Login
      // Auth.login(data.createUser.token);

    } catch (err) {
      console.error(err);

    }

    // Reset login form data
    setUserName({
      username: "",

    });
    setEmail({
      email: "",

    });
    setPassword({
      password: "",
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <svg
            fill="#993399"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m16.484 75.984 0.82812-1.2344 11.609-17.203-5.0781-3.9062c-0.375-0.28125-0.67188-0.64062-0.875-1.0469-0.20312-0.39062-0.32812-0.84375-0.34375-1.3125 0-0.51562 0.078125-0.9375 0.25-1.3281l0.10938-0.23438 0.3125-0.45312c0.10938-0.17188 0.25-0.3125 0.32812-0.375l4.3594-3.8594 15.625-13.844c-1.3281-2.1562-1.8594-4.5156-2.0781-6.5625v-0.015625c-0.078125-0.75-0.10938-1.4688-0.125-2.1094-0.015625-0.375-0.015625-0.76562-0.015625-1.1406 0-5.7188 3-11.031 7.875-14.062 0.28125-0.1875 0.57812-0.35938 0.875-0.51562 0.28125-0.15625 0.54688-0.29688 0.8125-0.40625 0.34375-0.17188 0.67188-0.32812 1.0156-0.45312 0.23438-0.10938 0.5-0.20312 0.78125-0.29688-2.5156-1.6406-5.4219-2.5-8.4844-2.5-8.4688 0-15.375 6.7812-15.375 15.109 0 3.375 0.35938 7.125 2.75 10.047l-19.141 16.484c-0.32812 0.26562-0.51562 0.67188-0.54688 1.0938-0.015625 0.42188 0.125 0.82812 0.42188 1.1406l5.7344 6.2344-11.328 18.219c-0.4375 0.71875-0.23438 1.6562 0.46875 2.125l7.5 5c0.0625-0.125 0.15625-0.25 0.25-0.375l0.625-0.92188z" />
              <path d="m18.5 82.391c-0.125-0.48438-0.03125-0.98438 0.28125-1.4219l13.047-19.359 0.8125-1.2031 0.875-1.2969 1.2344 0.95312 2.7344 2.1094c0.28125 0.21875 0.625 0.32812 0.95312 0.32812 0.46875 0 0.9375-0.20312 1.2344-0.60938 0.53125-0.6875 0.40625-1.6719-0.28125-2.1875l-0.078125-0.0625-3.9531-3.0312-0.015625-0.015625v-0.015625l-2.4219-1.8594h-0.015625l-4.7031-3.625 20.797-18.406c0.34375-0.3125 0.53125-0.73438 0.53125-1.1875s-0.20312-0.875-0.54688-1.1719c-2.0625-1.7969-2.9062-4.3906-2.9062-8.9688 0-6.6094 5.5-11.984 12.25-11.984 0.3125 0 0.625 0.015625 0.9375 0.03125 0.26562 0.015625 0.51562 0.046875 0.76562 0.09375 0.015625-0.015625 0.046875 0 0.0625 0 0.25 0.03125 0.5 0.078125 0.75 0.125 0.3125 0.0625 0.59375 0.14062 0.89062 0.21875 0.35938 0.09375 0.71875 0.21875 1.0781 0.35938 0.29688 0.10938 0.57812 0.23438 0.85938 0.35938 0.09375 0.046875 0.17188 0.09375 0.26562 0.125 0.29688 0.15625 0.59375 0.32812 0.89062 0.5 0.57812-0.10938 1.1562-0.1875 1.7031-0.21875 0.21875-0.015625 0.4375-0.015625 0.64062-0.015625 0.17188-0.015625 0.35938-0.015625 0.53125-0.015625 0.42188 0 0.84375 0.015625 1.25 0.046875 0.20312 0.015625 0.40625 0.03125 0.625 0.0625-0.1875-0.1875-0.375-0.375-0.5625-0.54688-0.21875-0.21875-0.4375-0.42188-0.65625-0.59375-0.375-0.3125-0.75-0.60938-1.1562-0.89062-0.20312-0.14062-0.42188-0.29688-0.64062-0.42188-0.125-0.09375-0.26562-0.17188-0.39062-0.23438-0.21875-0.125-0.42188-0.25-0.64062-0.35938-0.28125-0.14062-0.5625-0.28125-0.84375-0.40625s-0.5625-0.23438-0.84375-0.34375c-0.26562-0.10938-0.53125-0.20312-0.8125-0.28125-0.15625-0.046875-0.29688-0.09375-0.45312-0.14062s-0.32812-0.09375-0.51562-0.125c-0.25-0.078125-0.53125-0.125-0.79688-0.17188-0.17188-0.046875-0.35938-0.078125-0.53125-0.09375-0.21875-0.046875-0.45312-0.0625-0.67188-0.09375-0.26562-0.03125-0.51562-0.046875-0.78125-0.0625-0.3125-0.015625-0.625-0.03125-0.95312-0.03125-1.4531 0-2.8438 0.20312-4.1719 0.5625-0.5625 0.15625-1.1094 0.34375-1.625 0.5625-0.5625 0.21875-1.1094 0.48438-1.6406 0.78125-4.7344 2.5625-7.9375 7.5312-7.9375 13.203 0 0.35938 0 0.71875 0.015625 1.0938 0.078125 3.0781 0.59375 6.3594 2.7344 8.9688l-20.984 18.578c-0.046875 0.046875-0.09375 0.09375-0.125 0.14062l-0.26562 0.39062-0.015625 0.03125c-0.09375 0.21875-0.125 0.4375-0.125 0.67188 0.015625 0.45312 0.23438 0.89062 0.60938 1.1719l5 3.8438 1.2344 0.95312-0.875 1.2969-12.375 18.359-1.5625 2.3281c-0.0625 0.078125-0.125 0.17188-0.15625 0.26562-0.70312 1.1094-0.90625 2.4531-0.59375 3.7188 0.35938 1.3906 1.3281 2.5625 2.6562 3.2031l4.3438 2.0781c0.20312 0.10938 0.40625 0.1875 0.625 0.25 0.015625 0.015625 0.046875 0.03125 0.0625 0.03125v-0.015625c-0.046875-0.53125-0.015625-1.0938 0.09375-1.6406 0.078125-0.48438 0.23438-0.98438 0.46875-1.4844l-4.2344-2.0469c-0.5-0.23438-0.85938-0.64062-0.98438-1.1562z" />
              <path d="m92.812 48.375c-0.85938-2.0156-2.5781-3.5938-4.8125-4.375l-12.703-3.375c4.1875-2.9688 7.7812-7.9531 7.7812-13.016 0-6.5-4.1719-12.031-10.047-14.156-0.64062-0.25-1.2969-0.4375-1.9844-0.59375-0.71875-0.15625-1.4688-0.26562-2.2344-0.3125-0.35938-0.03125-0.73438-0.046875-1.1094-0.046875-0.35938 0-0.71875 0.015625-1.0781 0.03125-0.73438 0.046875-1.4531 0.15625-2.1562 0.3125h-0.03125c-0.42188 0.09375-0.82812 0.20312-1.2344 0.32812-0.0625 0-0.125 0.015625-0.17188 0.046875-0.35938 0.10938-0.71875 0.23438-1.0781 0.375-0.3125 0.125-0.625 0.26562-0.92188 0.40625-0.5 0.23438-0.98438 0.5-1.4531 0.79688-0.32812 0.1875-0.65625 0.42188-0.98438 0.64062l-0.015625 0.015625c-0.34375 0.25-0.67188 0.51562-1 0.79688-0.03125 0.015625-0.0625 0.046875-0.078125 0.0625-0.29688 0.26562-0.57812 0.53125-0.84375 0.8125-0.15625 0.15625-0.29688 0.29688-0.4375 0.45312s-0.28125 0.32812-0.42188 0.48438c-0.23438 0.28125-0.45312 0.5625-0.65625 0.84375-0.1875 0.26562-0.375 0.54688-0.54688 0.82812s-0.34375 0.5625-0.5 0.85938c-0.0625 0.10938-0.125 0.23438-0.1875 0.34375-0.26562 0.54688-0.51562 1.1094-0.71875 1.6875-0.078125 0.23438-0.15625 0.45312-0.21875 0.6875-0.046875 0.125-0.078125 0.23438-0.10938 0.375-0.10938 0.40625-0.20312 0.8125-0.28125 1.2188-0.015625 0.03125-0.015625 0.0625-0.015625 0.09375l-0.09375 0.5625c-0.03125 0.1875-0.046875 0.39062-0.0625 0.59375-0.03125 0.1875-0.046875 0.39062-0.046875 0.57812-0.015625 0.29688-0.03125 0.57812-0.03125 0.875 0 3.1094 0.3125 6.5469 2.2344 9.3594 0.09375 0.14062 0.20312 0.29688 0.3125 0.4375l-1 0.57812-14.906 8.75c-1.4844 0.95312-2.3281 2.5625-2.25 4.2969 0.0625 1.75 1.0625 3.2812 2.6406 4.1094l2.2031 1.1562 3.4688 1.8281-16.844 23.656-0.875 1.2344-1.3594 1.9219-0.015625 0.03125-0.34375 0.46875c-0.0625 0.078125-0.10938 0.15625-0.15625 0.25-0.34375 0.53125-0.5625 1.1094-0.65625 1.7188-0.10938 0.51562-0.10938 1.0469-0.015625 1.5625 0.015625 0.15625 0.046875 0.29688 0.078125 0.45312 0.09375 0.39062 0.25 0.75 0.42188 1.0938 0.5 0.90625 1.2656 1.6406 2.2344 2.1094l4.3438 2.0781c2.125 1.0312 4.6562 0.48438 6.1406-1.2969l18.203-21.875 2.7188 1.7344-9.0938 13.734c-0.79688 1.2031-1.0156 2.6719-0.59375 4.0469 0.4375 1.4062 1.4844 2.5469 2.8594 3.1094l5.6562 2.3281c0.64062 0.26562 1.3125 0.39062 1.9688 0.39062 1.6875 0 3.3125-0.82812 4.2656-2.3125l9.8125-15.328c1.8438-2.8906 1.8281-6.625-0.046875-9.5156l-5.5938-8.6094 4-6.4062 10.266 3.9531c4.0781 1.5625 8.6406-0.26562 10.375-4.1719 0.875-1.9688 0.89062-4.1406 0.03125-6.1094z" />
            </g>
          </svg>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Let's Go!
          </Typography>

          <div>
            <Button onClick={handleOpenTwo} color="inherit">
              Log In
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openTwo}
              onClose={handleCloseTwo}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openTwo}>
                <Box sx={style}>
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "& > :not(style)": { m: 1 },
                    }}
                  >
                    <h3>Welcome To Let's Go</h3>
                    <TextField
                      helperText="Please enter username or Email"
                      id="demo-helper-text-misaligned"
                      label="Username or Email"
                    />
                    <TextField
                      helperText="Please enter your Password"
                      id="demo-helper-text-misaligned"
                      label="Password"
                    />
                    <Button variant="outlined">Log In</Button>
                  </Stack>
                </Box>
              </Fade>
            </Modal>
          </div>

          <div>
            <Button onClick={handleOpen} color="inherit">
              Sign Up
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "& > :not(style)": { m: 1 },
                    }}
                  >
                    <h3>Welcome To Let's Go</h3>
                    {/* username or email */}
                    <TextField
                      helperText="Please enter username "
                      id="usernameID"
                      label="Username"
                      value={username}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      helperText="Please Enter Email"
                      id="emailID"
                      label="Email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    {/* password */}
                    <TextField
                      helperText="Please select a Password"
                      id="passwordID"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />

                    <Button variant="outlined" type="submit">
                      Sign Up
                    </Button>

                    {username}
                  </Stack>
                </Box>
              </Fade>
            </Modal>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



