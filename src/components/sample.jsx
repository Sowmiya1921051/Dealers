import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [brokers, setBrokers] = useState([]);
  const [expandedDealer, setExpandedDealer] = useState(null);

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

  const toggleExpandDealer = (dealerId) => {
    setExpandedDealer((prev) => (prev === dealerId ? null : dealerId));
  };

  // Separate dealers and sub-dealers
  const dealers = brokers.filter((broker) => broker.dealerType === 'Dealer');
  const subDealers = brokers.filter((broker) => broker.dealerType === 'Sub Dealer');

  // Calculate total credit points for a dealer, including their sub-dealers
  const getTotalCredits = (dealerId) => {
    const dealerCredit = parseInt(dealers.find((dealer) => dealer.id === dealerId)?.credit_points || 0, 10);
    const subDealerCredits = subDealers
      .filter((subDealer) => subDealer.parent_dealer === dealerId)
      .reduce((total, subDealer) => total + parseInt(subDealer.credit_points || 0, 10), 0);

    return dealerCredit + subDealerCredits;
  };

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <Link to="/add-broker">
        <button className="add-broker-button">Add Broker</button>
      </Link>

      <h1>Broker List</h1>

      {/* Dealers Table */}
      <h2>Dealers</h2>
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
            <th>Dealer Credits</th>
            <th>Total Credits (Including Sub-Dealers)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map((dealer) => (
            <React.Fragment key={dealer.id}>
              <tr
                style={{
                  cursor: 'pointer',
                  backgroundColor: expandedDealer === dealer.id ? '#e6f7ff' : '#f9f9f9',
                }}
                onClick={() => toggleExpandDealer(dealer.id)}
              >
                <td>{dealer.id}</td>
                <td>{dealer.name}</td>
                <td>{dealer.email}</td>
                <td>{dealer.phone}</td>
                <td>{dealer.company}</td>
                <td>{dealer.dealerType}</td>
                <td>{dealer.district}</td>
                <td>{dealer.address}</td>
                <td>{dealer.created_at}</td>
                <td>{dealer.credit_points || 0}</td> {/* Dealer's own credits */}
                <td>{getTotalCredits(dealer.id)}</td> {/* Total credits (dealer + sub-dealers) */}
                <td>
                  {expandedDealer === dealer.id ? 'Hide Sub-Dealers' : 'View Sub-Dealers'}
                </td>
              </tr>
              {expandedDealer === dealer.id && (
                <tr>
                  <td colSpan="12">
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#f1f1f1',
                        marginTop: '10px',
                      }}
                      border="1"
                    >
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
                          <th>Credits Points</th> {/* Sub-dealer credits */}
                        </tr>
                      </thead>
                      <tbody>
                        {subDealers
                          .filter((subDealer) => subDealer.parent_dealer === dealer.id)
                          .map((subDealer) => (
                            <tr key={subDealer.id}>
                              <td>{subDealer.id}</td>
                              <td>{subDealer.name}</td>
                              <td>{subDealer.email}</td>
                              <td>{subDealer.phone}</td>
                              <td>{subDealer.company}</td>
                              <td>{subDealer.dealerType}</td>
                              <td>{subDealer.district}</td>
                              <td>{subDealer.address}</td>
                              <td>{subDealer.created_at}</td>
                              <td>{subDealer.credit_points || 0}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
