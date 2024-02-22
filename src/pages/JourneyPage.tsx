import { Grid, Typography } from '@mui/material'

import Journey from '../components/journey/Journey'

const JourneyPage = () => {
    return (
        <Grid container className='page'>
            <Grid item xs={12}>
                <Typography variant='h3'>My Journey</Typography>
            </Grid>
            <Grid item xs={12}>
                <Journey />
            </Grid>
        </Grid>
    )
}

export default JourneyPage
