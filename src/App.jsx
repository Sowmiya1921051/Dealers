import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AddBroker from './components/addBroker'  
import SideNav from './components/SideNav'; 
import Sample from './components/sample'

function App() {
  return (
    <div>
    <BrowserRouter>
      <SideNav /> {/* Render the sidebar */}
      <div className="main-content" style={{ marginLeft: '250px', padding: '20px' }}>
        {/* Main content section adjusted for the sidebar */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/add-broker" element={<AddBroker />} />
          <Route path="/sample" element={<Sample />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App
