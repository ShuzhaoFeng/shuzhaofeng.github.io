import { Box, Typography } from '@mui/material'

import Gallery from '../components/gallery/Gallery'

const MainPage = () => {
    return (
        <Box component='div' className='page'>
            <Typography variant='h3'>My Projects</Typography>
            <Gallery />
        </Box>
    )
}

export default MainPage
