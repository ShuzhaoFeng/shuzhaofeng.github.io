import { Grid, Typography } from '@mui/material'
import Award from '../components/award/Award'
import awards from '../components/award/items/award'
const AwardPage = () => {
    return (
        <Grid container className='page'>
            <Grid item xs={12}>
                <Typography variant='h3'>My Awards</Typography>
            </Grid>
            <Grid item xs={12}>
                <Award items={awards} />
            </Grid>
        </Grid>
    )
}

export default AwardPage
