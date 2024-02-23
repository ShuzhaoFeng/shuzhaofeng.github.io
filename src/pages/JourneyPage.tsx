import { Grid, Typography } from '@mui/material'

import Journey from '../components/journey/Journey'
import journey from '../components/journey/items/journey'

const JourneyPage = () => {
    return (
        <Grid container className='page'>
            <Grid item xs={12}>
                <Typography variant='h3'>My Journey</Typography>
            </Grid>
            <Grid item xs={12}>
                <Journey items={journey} />
            </Grid>
        </Grid>
    )
}

export default JourneyPage
