import { Box } from '@mui/material'
import TopBar from './components/topbar/TopBar'
import AppRouter from './AppRouter'
import './App.css'

const App = () => {
    return (
        <Box component='div' className='App'>
            <TopBar />
            <AppRouter />
        </Box>
    )
}

export default App
