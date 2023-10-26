import { Box, Grid, Typography } from "@mui/material";
import profilePicture from "../../assets/profile_picture.jpg";
import { RefObject, createRef } from "react";

const images = [
  // placeholder images
  profilePicture,
  profilePicture,
  profilePicture,
  profilePicture,
  profilePicture,
];

const Gallery = () => {
  const refMap = new Map<string, RefObject<HTMLInputElement>>();

  for (let i = 0; i < images.length; i++) {
    refMap.set(`carousel_radio_${i + 1}`, createRef<HTMLInputElement>());
  }
  const refs = Object.fromEntries(refMap);
  return (
    <Box className="carousel">
      {images.map((image, index) =>
        index === 0 ? (
          <Box
            id={`carousel_radio_${index + 1}`}
            component="input"
            type="radio"
            name="position"
            sx={{
              gridColumn: `${index + 2} / ${index + 3}`,
              gridRow: `2 / 3`,
            }}
            ref={refs[`carousel_radio_${index + 1}`]}
            defaultChecked
            onChange={() => {

            }}
          />
        ) : (
          <Box
            id={`carousel_radio_${index + 1}`}
            component="input"
            type="radio"
            name="position"
            sx={{
              gridColumn: `${index + 2} / ${index + 3}`,
              gridRow: `2 / 3`,
            }}
            ref={refs[`carousel_radio_${index + 1}`]}
          />
        )
      )}
      <Box component="div" id="gallery">
        {images.map((image, index) => (
          <Box
            component="div"
            className="item"
            sx= {{
              '--offset': index + 1,
            }}
            onClick={() => {
              console.log("Clicked. Index: " + index);
              const checkbox = refs[`carousel_radio_${index + 1}`].current;
              if (checkbox) {
                if (checkbox.checked) {
                  // TODO: open new tab.
                } else {
                  checkbox.checked = true;
                }
              }
            }}
          >
            <Box key={index} className="box" p={2}>
              <Box
                className="imgBx"
                display="flex"
                alignItems="center"
                sx={{ "--gradient-color": "#fff" }}
              >
                <Box component="img" src={image} alt={`Image ${index + 1}`} />
              </Box>
              <Box className="content">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      className="title"
                      variant="h5"
                      component="div"
                      textAlign="start"
                    >
                      Placeholder Title
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" textAlign="start">
                      This is a placeholder description.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Gallery;
