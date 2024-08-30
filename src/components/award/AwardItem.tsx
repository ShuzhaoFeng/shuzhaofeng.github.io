import { Box, Grid, Typography } from '@mui/material'
import { AwardItemProps } from './awardTypes'

import goldPattern from '../../assets/gold-pattern.jpg'

const AwardItem = (props: AwardItemProps) => {
    const { item } = props

    return (
        <Box
            className='item-box'
            sx={{
                backgroundImage: `url(${goldPattern})`,
                boxShadow:
                    '0 0 4px 0 rgba(0, 0, 0, 0.9),0 4px 8px 0 rgba(0, 0, 0, 0.81)',
            }}
        >
            <Grid
                className='item-content'
                container
                sx={{
                    boxShadow: 'inset 0 0 10px rgba(250, 160, 0, 0.9)',
                }}
            >
                <Grid item xs={12}>
                    <Typography variant='h6'>{item.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{item.date}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{item.description}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AwardItem
