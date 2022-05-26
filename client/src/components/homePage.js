import React from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { style, styled } from '@mui/system';
import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

`;

const styles = {
  mainStyles: {
    textAlign: 'center'
  },
  // formStyles: {
  //   margin: '10px',
  //   display: 'block',
  // },
  labelStyles: {
    display: 'flex',
    justifyContent: 'center',

  },
  inputStyles: {
    padding: '12px 20px'
  },
  buttonStyles: {
    paddingTop: '1rem'
  }

};

const eventStyle ={
  // display: 'felx',
  width: '24%'
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);



export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <main style={styles.mainStyles}>
          <h1>Hello! Welcome to Let's Go!</h1>

          <form style={styles.formStyles}>
            <label style={styles.labelStyles}>
              {/* input field to choose activity */}
              <Autocomplete
                style={styles.inputStyles}
                sx={eventStyle}
                freeSolo
                // id="free-solo-2-demo"
                disableClearable
                options={eventList.map((option) => option.activity)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Events"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />

              {/* input field to choose Location */}

              <Autocomplete
                style={styles.inputStyles}
                sx={eventStyle}
                freeSolo
                // id="free-solo-2-demo"
                disableClearable
                options={locationList.map((option) => option.location)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Location"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </label>
          </form>

          <CustomButton>Search</CustomButton>

          <container>
            <Card
              sx={{
                border: "10px solid black",
                width: "25%",
                display: "block",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </container>
          
        </main>
      </header>
    </div>
  );
}

const eventList = [
  { activity: "Hiking" },
  { activity: "Dinner" },
  { activity: "Clubbing" },
  { activity: "Movies" },
  { activity: "Workout" },
];

const locationList = [
  { location: "Seattle" },
  { location: "Philadelphia" },
  { location: "Washington D.C." },
  { location: "New York" },
  { location: "Atlanta" },
];