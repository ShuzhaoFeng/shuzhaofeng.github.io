import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import {
    setTimer,
    setFocusedPosition,
    incrementFocusedPosition,
} from '../../redux/slices/gallerySlice'
import { GalleryProps } from './galleryTypes'

const Gallery = (props: GalleryProps) => {
    const { items } = props

    const timer = useSelector((state: RootState) => state.gallery.timer)
    const focusedPosition = useSelector(
        (state: RootState) => state.gallery.focusedPosition
    )

    const dispatch = useDispatch()

    const autoScroll = () => {
        dispatch(
            setTimer(
                setInterval(() => {
                    dispatch(incrementFocusedPosition(items.length))
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
            {...props}
        >
            <Grid item xs={12} className='display'>
                {items.map((_item, index) => (
                    <Box
                        key={_item.title}
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
                                window.open(_item.url, '_blank')
                            } else {
                                dispatch(setFocusedPosition(index))
                            }
                        }}
                    >
                        <Box key={_item.title} className='box' p={2}>
                            <Box
                                className='imgBx'
                                display='flex'
                                alignItems='center'
                                sx={{ '--gradient-color': _item.color }}
                            >
                                <Box
                                    component='img'
                                    src={_item.image}
                                    alt={`Image ${_item.title}`}
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
                                            sx={{ color: _item.color }}
                                        >
                                            {_item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant='body2'
                                            textAlign='start'
                                        >
                                            {_item.desc}
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
                    gridTemplateColumns: `1fr repeat(${items.length}, 30px) 1fr`,
                }}
            >
                {items.map((_item, index) => (
                    <Box
                        id={`carousel_radio_${_item.title}`}
                        key={`carousel_radio_${_item.title}`}
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
