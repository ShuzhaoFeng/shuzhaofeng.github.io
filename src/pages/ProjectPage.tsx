import { Grid, Typography } from '@mui/material'

import Gallery from '../components/gallery/Gallery'
import personal from '../components/gallery/items/personal'
import school from '../components/gallery/items/school'
import GitHubProfile from '../components/github-profile/GitHubProfile'

const MainPage = () => {
    return (
        <Grid container className='page'>
            <Grid item xs={12}>
                <Typography variant='h3'>My Projects</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    I try to be careful about separating my personal projects
                    from my school work
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    (although sometimes, it happens that I would forget to
                    switch GitHub account...)
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h4' className='project-title'>
                    Personal Projects
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    You can find my personal GitHub account as follows:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <GitHubProfile username='ShuzhaoFeng' />
            </Grid>
            <Grid item xs={12}>
                <Gallery name='personal' items={personal} />
            </Grid>
            <Grid item xs={12}>
                <Typography className='project-title' variant='h4'>
                    School Projects
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    You can find my school GitHub account as follows:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <GitHubProfile username='mcgill-sfeng' />
            </Grid>
            <Grid item xs={12}>
                <Gallery name='school' items={school} />
            </Grid>
        </Grid>
    )
}

export default MainPage
