import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [brokers, setBrokers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState(null);

  useEffect(() => {
    fetch('http://localhost/broker/addBroker.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setBrokers(data.data);
        }
      })
      .catch((error) => console.error('Error fetching broker data:', error));
  }, []);

  const handleRowClick = (broker) => {
    setSelectedBroker(broker);
  };

  const handleCloseDetails = () => {
    setSelectedBroker(null);
  };

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <Link to="/add-broker">
        <button className="add-broker-button">Add Broker</button>
      </Link>

      <h1>Broker List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Dealer Type</th>
            <th>District</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Parent Dealer</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr
              key={broker.id}
              onClick={() => handleRowClick(broker)}
              style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
            >
              <td>{broker.id}</td>
              <td>{broker.name}</td>
              <td>{broker.email}</td>
              <td>{broker.phone}</td>
              <td>{broker.company}</td>
              <td>{broker.dealerType}</td>
              <td>{broker.district}</td>
              <td>{broker.address}</td>
              <td>{broker.created_at}</td>
              <td>{broker.parent_dealer || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the selected broker details */}
      {selectedBroker && (
        <div
          className="broker-details"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            borderRadius: '8px',
            zIndex: '1000',
          }}
        >
          <h2 style={{ marginBottom: '10px' }}>Broker Details</h2>
          <p><strong>ID:</strong> {selectedBroker.id}</p>
          <p><strong>Name:</strong> {selectedBroker.name}</p>
          <p><strong>Email:</strong> {selectedBroker.email}</p>
          <p><strong>Phone:</strong> {selectedBroker.phone}</p>
          <p><strong>Company:</strong> {selectedBroker.company}</p>
          <p><strong>Dealer Type:</strong> {selectedBroker.dealerType}</p>
          <p><strong>District:</strong> {selectedBroker.district}</p>
          <p><strong>Address:</strong> {selectedBroker.address}</p>
          <p><strong>Created At:</strong> {selectedBroker.created_at}</p>
          <p><strong>Parent Dealer:</strong> {selectedBroker.parent_dealer || 'N/A'}</p>
          <button
            onClick={handleCloseDetails}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
