import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

// Import Pages (To be created)
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';
import Gamification from './pages/Gamification/Gamification';
import Profile from './pages/Profile/Profile';
import InitialTest from './pages/Tests/InitialTest';
import EvolutionTest from './pages/Tests/EvolutionTest';
import Bonus from './pages/Bonus/Bonus';
import Celebration from './pages/Celebration/Celebration';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <div>Carregando...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/program" element={
          <PrivateRoute>
            <Program />
          </PrivateRoute>
        } />
        <Route path="/gamification" element={
          <PrivateRoute>
            <Gamification />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/initial-test" element={
          <PrivateRoute>
            <InitialTest />
          </PrivateRoute>
        } />
        <Route path="/evolution-test" element={
          <PrivateRoute>
            <EvolutionTest />
          </PrivateRoute>
        } />
        <Route path="/bonus" element={
          <PrivateRoute>
            <Bonus />
          </PrivateRoute>
        } />
        <Route path="/celebration" element={
          <PrivateRoute>
            <Celebration />
          </PrivateRoute>
        } />
        
        {/* Placeholder for others */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
