import { Box, Typography } from "@mui/material";
import profilePicture from "../../assets/profile_picture.jpg";

const images = [
  // placeholder images
  profilePicture,
  profilePicture,
  profilePicture,
  profilePicture,
  profilePicture,
];

const Carousel = () => (
  <Box className="carousel">
    <Box component="input" type="radio" name="position" defaultChecked />
    <Box component="input" type="radio" name="position" />
    <Box component="input" type="radio" name="position" />
    <Box component="input" type="radio" name="position" />
    <Box component="input" type="radio" name="position" />
    <Box component="main" id="gallery">
      {images.map((image, index) => (
        <Box component="div" className="item">
          <Box key={index} className="box" p={2}>
            <Box className="imgBx" display="flex" alignItems="center">
              <Box component="img" src={image} alt={`Image ${index + 1}`} />
            </Box>
            <Box className="content" mt={2}>
              <Typography className="title" variant="h5" component="div">
                Placeholder Title
              </Typography>
              <Typography variant="body2">
                This is a placeholder description.
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default Carousel;
