import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import {
    createGallery,
    setTimer,
    setFocusedPosition,
    incrementFocusedPosition,
} from '../../redux/slices/gallerySlice'
import { GalleryProps } from './galleryTypes'

const Gallery = (props: GalleryProps) => {
    const { name, items } = props

    const gallery = useSelector((state: RootState) => state.gallery[name])

    const dispatch = useDispatch()

    const autoScroll = () => {
        dispatch(
            setTimer({
                gallery: name,
                timer: setInterval(() => {
                    dispatch(
                        incrementFocusedPosition({
                            gallery: name,
                            length: items.length,
                        })
                    )
                }, 4000),
            })
        )
    }

    useEffect(() => {
        dispatch(createGallery(name))
        autoScroll()

        return () => {
            clearInterval(gallery?.timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid
            container
            className='gallery'
            onMouseLeave={autoScroll}
            onMouseEnter={() => {
                clearInterval(gallery?.timer)
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
                                -10 * (gallery?.focusedPosition - index)
                            }deg) translateX(${
                                -300 * (gallery?.focusedPosition - index)
                            }px)`,
                            zIndex:
                                gallery?.focusedPosition -
                                Math.max(
                                    gallery?.focusedPosition - index,
                                    -gallery?.focusedPosition + index
                                ),
                        }}
                        onClick={() => {
                            if (
                                _item.url &&
                                index === gallery?.focusedPosition
                            ) {
                                window.open(_item.url, '_blank')
                            } else {
                                dispatch(
                                    setFocusedPosition({
                                        gallery: name,
                                        focusedPosition: index,
                                    })
                                )
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
                        name={`position_${name}`}
                        sx={{
                            gridColumn: `${index + 2} / ${index + 3}`,
                            gridRow: '2 / 3',
                        }}
                        onChange={() => {
                            dispatch(
                                setFocusedPosition({
                                    gallery: name,
                                    focusedPosition: index,
                                })
                            )
                        }}
                        checked={gallery && index === gallery.focusedPosition}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default Gallery
