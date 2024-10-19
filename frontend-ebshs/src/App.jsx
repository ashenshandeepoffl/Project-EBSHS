import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ErrorBoundary from './ErrorBoundary'; 
import Login from './components/LoginPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}


export default App;
