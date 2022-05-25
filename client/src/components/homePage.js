import React from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";


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
  formStyles: {
    margin: '10px',
    display: 'block',
  },
  inputStyles: {
    padding: '12px 20px'
  },
  buttonStyles: {
    paddingTop: '1rem'
  }

}

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <main style={styles.mainStyles}>
          <h1>Hello! Welcome to Let's Go!</h1>

          <form style={styles.formStyles}>
            <label>
              {/* input field to choose activity */}
              <Autocomplete
                style={styles.inputStyles}
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

              <input
                type="text"
                name="name"
                placeholder="Location"
                style={styles.inputStyles}
              />
            </label>
          </form>

          <CustomButton>Button</CustomButton>
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