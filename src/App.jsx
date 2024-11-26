import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AddBroker from './components/addBroker'
import SideNav from './components/SideNav';
import Sample from './components/sample'
import BrokerDetails from './components/BrokerDetails';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideNav /> {/* Render the sidebar */}
        <div className="main-content" style={{ marginLeft: '250px', padding: '20px' }}>
          {/* Main content section adjusted for the sidebar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/broker-details/:id" element={<BrokerDetails />} />
            <Route path="/add-broker" element={<AddBroker />} />
            <Route path="/sample" element={<Sample />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
