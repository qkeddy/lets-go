import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../images/Lets-Go-Logo.png'
// import MenuIcon from '@mui/icons-material/Menu';

const styles = {
    imageStyle: {
      width: '3%',
      flexWrap: 'wrap',
    }
  };


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <img style={styles.imageStyle} src={Logo} alt='Me' />
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Let's Go!
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
