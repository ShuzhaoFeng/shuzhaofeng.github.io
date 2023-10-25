import { Box, Typography } from '@mui/material';
import profilePicture from '../../assets/profile_picture.jpg'

const images = [ // placeholder images
    profilePicture,
    profilePicture,
    profilePicture,
  ];

const ImageGallery = () => {
    return (
      <Box className="gallery" display="flex">
        {images.map((image, index) => (
          <Box key={index} className="box" p={2}>
            <Box className="imgBx" display="flex" alignItems="center">
              <img src={image} alt={`Image ${index + 1}`} />
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
        ))}
      </Box>
    );
  }
  
export default ImageGallery;
  
  
  
  
  
