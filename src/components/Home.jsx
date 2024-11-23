import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [brokers, setBrokers] = useState([]);
  const navigate = useNavigate();

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

  const handleRowClick = (brokerId) => {
    navigate(`/broker-details/${brokerId}`, { state: { brokerId } });
  };

  return (
    <div style={{ padding: '20px' }}>
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
            <th>Credit Points</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr
              key={broker.id}
              onClick={() => handleRowClick(broker.id)}
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
              <td>{broker.credit_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
