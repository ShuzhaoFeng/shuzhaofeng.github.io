import { Box, Grid, Typography } from "@mui/material";
import profilePicture from "../../assets/profile_picture.jpg";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Item 1",
    desc: "This is a placeholder description for Item 1",
    image: profilePicture,
    color: "#f00",
  },
  {
    title: "Item 2",
    desc: "This is a placeholder description for Item 2",
    image: profilePicture,
    color: "#0f0",
  },
  {
    title: "Item 3",
    desc: "This is a placeholder description for Item 3",
    image: profilePicture,
    color: "#00f",
  },
  {
    title: "Item 4",
    desc: "This is a placeholder description for Item 4",
    image: profilePicture,
    color: "#ff0",
  },
  {
    title: "Item 5",
    desc: "This is a placeholder description for Item 5",
    image: profilePicture,
    color: "#0ff",
  },
  {
    title: "Item 6",
    desc: "This is a placeholder description for Item 6",
    image: profilePicture,
    color: "#f0f",
  },
];

const Gallery = () => {
  const [timer, setTimer] = useState(0);
  const [focusedPosition, setFocusedPosition] = useState(0);

  const autoScroll = () => {
    setTimer(setInterval(() => {
      setFocusedPosition(focusedPosition => (focusedPosition + 1) % items.length);
    }, 4000));
  };

  useEffect(() => {
    autoScroll();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container className="gallery" onMouseLeave={() => {
        console.log("Mouse left gallery");
        console.log("Putting timer on");
        autoScroll()
        console.log("Timer: " + timer);
      }} onMouseEnter={() => {
        console.log("Mouse entered gallery");
        console.log("Clearing" + timer);
        clearInterval(timer)
        console.log("Timer: " + timer);
        }}>
      <Grid item xs={12} className="display">
        {items.map((item, index) => (
          <Box
            component="div"
            className="item"
            sx={{
              transform: `rotateY(${
                -10 * (focusedPosition - index)
              }deg) translateX(${-300 * (focusedPosition - index)}px)`,
              zIndex:
                focusedPosition -
                Math.max(focusedPosition - index, -focusedPosition + index),
            }}
            onClick={() => {
              console.log("Clicked. Index: " + index);
              setFocusedPosition(index);
            }}
          >
            <Box key={index} className="box" p={2}>
              <Box
                className="imgBx"
                display="flex"
                alignItems="center"
                sx={{ "--gradient-color": item.color }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={`Image ${index + 1}`}
                />
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
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" textAlign="start">
                      {item.desc}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        className="navigation"
        sx={{
          gridTemplateColumns: `1fr repeat(${items.length}, 30px) 1fr`,
        }}
      >
        {items.map((_item, index) => (
          <Box
            id={`carousel_radio_${index + 1}`}
            component="input"
            type="radio"
            name="position"
            sx={{
              gridColumn: `${index + 2} / ${index + 3}`,
              gridRow: `2 / 3`,
            }}
            onChange={() => {
              setFocusedPosition(index);
            }}
            checked={index === focusedPosition}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Gallery;
