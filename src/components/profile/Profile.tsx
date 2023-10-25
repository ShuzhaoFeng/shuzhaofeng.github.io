import { Box } from "@mui/material";
import profilePicture from "../../assets/profile_picture.jpg";

const Profile = () => (
  <Box component="div" className="profile">
    <Box className="shadow" />
    <Box
      component="img"
      src={profilePicture}
      className="image"
      alt="Profile Picture"
    />
  </Box>
);

export default Profile;
