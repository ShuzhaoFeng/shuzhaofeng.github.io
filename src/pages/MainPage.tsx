import { Grid, Typography, Link } from '@mui/material'

import Profile from '../components/profile/Profile'

const MainPage = () => {
    return (
        <Grid container className='page'>
            <Grid item xs={12}>
                <Grid container display='flex'>
                    <Grid item xs={6}>
                        <Profile />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container className='intro'>
                            <Grid item xs={12}>
                                <Typography
                                    variant='h3'
                                    className='intro-title'
                                >
                                    Hello, I'm Shuzhao Feng
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className='intro-body'>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>
                                            Hello, I'm Shuzhao Feng, and this is
                                            my personal website.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>
                                            I consider myself a problem-solver:
                                            I like to use my programming skills
                                            to make solutions that can help
                                            people solve their problems.
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            However, I can't just magically
                                            solve all the problems... I'm still
                                            in my early career after all. Which
                                            is why I keep an open mind for
                                            learning opportunities. I'm always
                                            eager to learn new things from
                                            people I encounter. With an open
                                            mind and eagerness to learn, I'm
                                            able to quickly adapt to any new
                                            situations and find myself quite
                                            comfortable in a short time. All
                                            these learnings will further enhance
                                            my skill, and eventually contribute
                                            to my programming skills when I try
                                            to solve problems for others.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} pt={5}>
                <Typography variant='h6'>
                    Visit the <Link href='/#/journey'>Journey</Link> page to see
                    my journey that made me who I am today.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Visit the <Link href='/#/projects'>Projects</Link> page to
                    see what I am or have been working on with my software
                    engineering skills.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Visit the <Link href='/#/awards'>Awards</Link> page to see
                    some of the awards I have received.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default MainPage
