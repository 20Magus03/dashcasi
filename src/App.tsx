import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import Dashboard from './Dashboard';
import TokenInput from './Touken';
import ClientDashboard from './ClientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Touken" element={<TokenInput />} />
        <Route path="/ClientDashboard" element={<ClientDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
