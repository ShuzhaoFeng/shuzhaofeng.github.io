import { Box } from '@mui/material';

import Profile from './components/profile/Profile';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Box component='div' className='App'>
      <Profile />
      <Box component='header' className='App-header'>
        <Box component='a' href="https://vitejs.dev" target="_blank">
          <Box component='img' src={viteLogo} className="logo" alt="Vite logo" />
        </Box>
        <Box component='a' href="https://react.dev" target="_blank">
          <Box component='img' src={reactLogo} className="logo react" alt="React logo" />
        </Box>
        <Box component='p'>
          Hello, I'm Shuzhao Feng, and this will be my personal website.
        </Box>
        <Box component='p'>
          I'm actively developing this website in my free time, so please check back later!
        </Box>
        <Box component='a'
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Box>
      </Box>
    </Box>
  );
}

export default App
