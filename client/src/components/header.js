import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Logo from '../images/Lets-Go-Logo.png'


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

const styles = {
    imageStyle: {
      width: '3%',
      flexWrap: 'wrap',
    }
  };


export default function Header() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img style={styles.imageStyle} src={Logo} alt="Me" />

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
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Login Modal 
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Input here
                  </Typography>
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
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sign Up Modal
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Test
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>


        </Toolbar>
      </AppBar>
    </Box>
  );
}



