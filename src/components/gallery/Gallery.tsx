import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import galleryItems from './GalleryItems'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setFocusedPosition, setTimer } from '../../redux/slices/gallerySlice'

const Gallery = () => {
    const timer = useSelector((state: RootState) => state.gallery.timer)
    const focusedPosition = useSelector(
        (state: RootState) => state.gallery.focusedPosition
    )

    const dispatch = useDispatch()

    const autoScroll = () => {
        dispatch(
            setTimer(
                setInterval(() => {
                    dispatch(
                        setFocusedPosition(
                            (focusedPosition + 1) % galleryItems.length
                        )
                    )
                }, 4000)
            )
        )
    }

    useEffect(() => {
        autoScroll()

        return () => {
            clearInterval(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid
            container
            className='gallery'
            onMouseLeave={autoScroll}
            onMouseEnter={() => {
                clearInterval(timer)
            }}
        >
            <Grid item xs={12} className='display'>
                {galleryItems.map((galleryItem, index) => (
                    <Box
                        component='div'
                        className='item'
                        sx={{
                            transform: `rotateY(${
                                -10 * (focusedPosition - index)
                            }deg) translateX(${
                                -300 * (focusedPosition - index)
                            }px)`,
                            zIndex:
                                focusedPosition -
                                Math.max(
                                    focusedPosition - index,
                                    -focusedPosition + index
                                ),
                        }}
                        onClick={() => {
                            if (index === focusedPosition) {
                                window.open(galleryItem.url, '_blank')
                            } else {
                                dispatch(setFocusedPosition(index))
                            }
                        }}
                    >
                        <Box key={index} className='box' p={2}>
                            <Box
                                className='imgBx'
                                display='flex'
                                alignItems='center'
                                sx={{ '--gradient-color': galleryItem.color }}
                            >
                                <Box
                                    component='img'
                                    src={galleryItem.image}
                                    alt={`Image ${index + 1}`}
                                />
                            </Box>
                            <Box className='content'>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography
                                            className='title'
                                            variant='h5'
                                            component='div'
                                            textAlign='start'
                                            sx={{ color: galleryItem.color }}
                                        >
                                            {galleryItem.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant='body2'
                                            textAlign='start'
                                        >
                                            {galleryItem.desc}
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
                className='navigation'
                sx={{
                    gridTemplateColumns: `1fr repeat(${galleryItems.length}, 30px) 1fr`,
                }}
            >
                {galleryItems.map((_item, index) => (
                    <Box
                        id={`carousel_radio_${index + 1}`}
                        component='input'
                        type='radio'
                        name='position'
                        sx={{
                            gridColumn: `${index + 2} / ${index + 3}`,
                            gridRow: '2 / 3',
                        }}
                        onChange={() => {
                            dispatch(setFocusedPosition(index))
                        }}
                        checked={index === focusedPosition}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default Gallery
