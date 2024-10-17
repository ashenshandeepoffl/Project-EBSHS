import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ErrorBoundary from './ErrorBoundary'; 
// import Login from './components/Login';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}


export default App;
