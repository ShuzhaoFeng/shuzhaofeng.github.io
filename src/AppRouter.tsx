import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import MainPage from './pages/MainPage'

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter
