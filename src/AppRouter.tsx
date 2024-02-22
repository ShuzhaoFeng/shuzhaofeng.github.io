import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import MainPage from './pages/MainPage'
import ProjectPage from './pages/ProjectPage'
import JourneyPage from './pages/JourneyPage'
import AwardPage from './pages/AwardPage'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/journey' element={<JourneyPage />} />
                <Route path='/projects' element={<ProjectPage />} />
                <Route path='/awards' element={<AwardPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
