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
            }}
        >
            <Grid className='item-content' container>
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
