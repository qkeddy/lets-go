import React from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { style, styled } from "@mui/system";
import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { ACTIVITY_CITY } from "../utils/queries";
// import { ADD_ACTIVITY } from "../utils/mutations";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
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
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
`;

const styles = {
  mainStyles: {
    textAlign: "center",
  },
  // formStyles: {
  //   margin: '10px',
  //   display: 'block',
  // },
  labelStyles: {
    display: "flex",
    justifyContent: "center",
  },
  inputStyles: {
    padding: "12px 20px",
  },
  buttonStyles: {
    paddingTop: "1rem",
  },
};

const eventStyle = {
  // display: 'felx',
  width: "24%",
};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Home() {
  // const [activity, { error }] = useMutation(ADD_ACTIVITY);

  const [searchedEvents, setSearchedEvents] = React.useState("");
  const [searchedLocation, setSearchedLocation] = React.useState("");
  const [activities, setActivities] = React.useState([]);

  const [activitiesByActivityCity, { called, data, loading }] =
    useLazyQuery(ACTIVITY_CITY);

  const handleChange = (e) => {
    if (e.target.name === "searchedEvents") {
      console.log(e.target.value);
      setSearchedEvents(e.target.value);
    } else if (e.target.name === "searchedLocation") {
      console.log(e.target.value);
      setSearchedLocation(e.target.value);
    }
    // console.log(e.target.id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await activitiesByActivityCity({
        variables: {
          city: searchedLocation,
          activity: searchedEvents,
        },
      });
      setActivities(data.activitiesByActivityCity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <main style={styles.mainStyles}>
          <h1>Hello! Welcome to Let's Go!</h1>

          <form onSubmit={handleFormSubmit} style={styles.formStyles}>
            <label style={styles.labelStyles}>
              {/* input field to choose activity */}
              <Autocomplete
                onChange={(event, value) => setSearchedEvents(value)}
                value={searchedEvents}
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
                    id="activityID"
                    name="searchedEvents"
                    // value={searchedEvents}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />

              {/* input field to choose Location */}

              <Autocomplete
                onChange={(event, value) => setSearchedLocation(value)}
                value={searchedLocation}
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
                    id="locationID"
                    // value={searchedLocation}
                    name="searchedLocation"
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </label>
            <CustomButton type="submit">Search</CustomButton>
          </form>

          <container
            style={{
              display: "flex",
              margin: "0 auto",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>{activities.length ? `Viewing ${activities.length} results:` : ""}</h2>
            {activities.map((e) => {
              return (
                <Card
                  sx={{
                    border: "2px solid black",
                    width: "25%",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    margin: "5px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <h1>{e.city}</h1>
                    </Typography>
                    <Typography variant="h5" component="div">
                      {e.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {e.description}
                    </Typography>
                    <Typography variant="body2">
                      {e.participants}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">Learn More</Button> */}
                  </CardActions>
                </Card>
              );
            })}
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
