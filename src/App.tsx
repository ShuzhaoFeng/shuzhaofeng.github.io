import { Box, Typography } from '@mui/material'

import Profile from './components/profile/Profile'

import Gallery from './components/gallery/Gallery'
import './App.css'

function App() {
    return (
        <Box component='div' className='App'>
            <Profile />
            <Box component='section'>
                <Box component='p'>
                    Hello, I'm Shuzhao Feng, and this will be my personal
                    website.
                </Box>
                <Box component='p'>
                    I'm actively developing this website in my free time, so
                    please check back later!
                </Box>
            </Box>
            <Box component='section'>
                <Typography variant='h4'>My Projects</Typography>
                <Gallery />
            </Box>
            <Box
                component='a'
                className='App-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
            >
                Learn React
            </Box>
        </Box>
    )
}

export default App
