import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import MainPage from './pages/MainPage'
import ProjectPage from './pages/ProjectPage'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/projects' element={<ProjectPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
