import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [brokers, setBrokers] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [subDealerCount, setSubDealerCount] = useState(0);

  useEffect(() => {
    // Example data fetch (replace with your actual API call)
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/broker/addBroker.php');
        const result = await response.json();
        
        console.log('Fetched Data:', result.data); // Log the fetched data

        // Check if data is valid
        if (result.data && Array.isArray(result.data)) {
          setBrokers(result.data);

          // Filter dealers and sub-dealers with trimming to avoid hidden whitespaces
          const dealerCount = result.data.filter(broker => broker.dealerType.trim() === 'Dealer').length;
          const subDealerCount = result.data.filter(broker => broker.dealerType.trim() === 'Sub Dealer').length;

          console.log('Dealer Count:', dealerCount); // Log dealer count
          console.log('Sub Dealer Count:', subDealerCount); // Log sub-dealer count

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
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Dealers</h3>
          <p>{dealerCount}</p>
        </div>
        <div className="stat-card">
          <h3>Sub Dealers</h3>
          <p>{subDealerCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
