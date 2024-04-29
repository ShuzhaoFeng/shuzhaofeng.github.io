import {
    AppBar,
    Box,
    Button,
    Container,
    Link,
    Toolbar,
    Typography,
} from '@mui/material'
import Icon from '../../assets/icon.jpg'

const TopBar = () => {
    return (
        <AppBar position='static' className='topbar'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Link href='/'>
                        <Box
                            component='img'
                            src={Icon}
                            sx={{
                                width: 30,
                                display: { xs: 'none', md: 'flex' },
                                paddingRight: 1,
                            }}
                        />
                    </Link>
                    <Typography
                        className='home'
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                    >
                        Home
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Button className='navigation' href='/#/journey'>
                            Journey
                        </Button>
                        <Button className='navigation' href='/#/projects'>
                            Projects
                        </Button>
                        <Button className='navigation' href='/#/awards'>
                            Awards
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default TopBar
