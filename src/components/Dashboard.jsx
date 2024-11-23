import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [brokers, setBrokers] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [subDealerCount, setSubDealerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/broker/addBroker.php');
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setBrokers(result.data);
          const dealerCount = result.data.filter(broker => broker.dealerType === 'Dealer').length;
          const subDealerCount = result.data.filter(broker => broker.dealerType === 'Sub Dealer').length;
          setDealerCount(dealerCount);
          setSubDealerCount(subDealerCount);
        } else {
          console.error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard Overview</h2>
      </header>
      <div className="dashboard-cards">
        <div className="card dealer-card">
          <h3>Dealers</h3>
          <p className="count">{dealerCount}</p>
        </div>
        <div className="card sub-dealer-card">
          <h3>Sub Dealers</h3>
          <p className="count">{subDealerCount}</p>
        </div>
      </div>
      <section className="details-section">
        <h3>Broker Details</h3>
        <ul className="broker-list">
          {brokers.map((broker, index) => (
            <li key={index} className="broker-item">
              <span className="broker-name">{broker.name}</span>
              <span className="broker-type">{broker.dealerType}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
