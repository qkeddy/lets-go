// import React from 'react'
// import "./footer.css"
// import ContactSupportIcon from '@mui/icons-material/ContactSupport';
// import MessageIcon from '@mui/icons-material/Message';

// export default function Footer() {
//   return (
//     <div className="App footer">
//       <header className="App-header">
//         <main>
//           <h1 icon={<ContactSupportIcon />}>you can see me</h1>
//         </main>
//       </header>
//     </div>
//   );
// }

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
// import MessageIcon from '@mui/icons-material/Message'
import { Link } from "react-router-dom";
import './assets/css/footer.css'

const styles = {
  footerStyle: {
    background: 'transparent',
    justifyContent: 'flex-wrap',
    width: '8vw',
    position: 'fixed',
    bottom: '0',
    margin: '0px',
    flexWrap: 'wrap',

  },
};


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className='copyright'>
      <div className='letters'>© 2022 Let's Go All Rights Reserved </div> 
      </div>
    <BottomNavigation style={styles.footerStyle} sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        color="primary"
        label="Contact Support"
        value="Support"
        component={Link} to='/support'
        icon={<ContactSupportIcon />}
      />
    </BottomNavigation>
    </div>
  );
}