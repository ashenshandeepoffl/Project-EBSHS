import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ErrorBoundary from './ErrorBoundary'; 

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}


export default App;
