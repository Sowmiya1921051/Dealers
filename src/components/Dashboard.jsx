import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [brokers, setBrokers] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [subDealerCount, setSubDealerCount] = useState(0);
  const [monthlyCreditPoints, setMonthlyCreditPoints] = useState(Array(12).fill(0));

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
  
          // Initialize credit points array
          const creditPointsByMonth = Array(12).fill(0);
  
          result.data.forEach(broker => {
            if (broker.credit_points && broker.created_at) {
              const cleanDate = broker.created_at.trim(); // Trim extra spaces
              const parsedDate = new Date(cleanDate); // Parse the date
              if (!isNaN(parsedDate)) { // Check if the date is valid
                const month = parsedDate.getMonth(); // Get the month (0-11)
                creditPointsByMonth[month] += parseInt(broker.credit_points, 10);
              } else {
                console.error(`Invalid date: ${broker.created_at}`);
              }
            }
          });
  
          setMonthlyCreditPoints(creditPointsByMonth);
        } else {
          console.error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const chartData = {
    labels: ['Dealers', 'Sub Dealers'],
    datasets: [
      {
        label: 'Count',
        data: [dealerCount, subDealerCount],
        backgroundColor: ['#D91656', '#EB5B00'], // Colors for bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dealer and Sub Dealer Count',
      },
    },
  };

  const monthlyCreditChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Credit Points by Month',
        data: monthlyCreditPoints, // Ensure this is correctly updated
        backgroundColor: '#F0A8D0', // Bar color
        borderWidth: 1,
      },
    ],
  };
  
  const monthlyCreditChartOptions = {
    responsive: true,
    indexAxis: 'y', // Makes the bar chart horizontal (remove this if vertical is needed)
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Credit Points by Month',
      },
    },
  };
  

  const dealers = brokers.filter(broker => broker.dealerType === 'Dealer');
  const subDealers = brokers.filter(broker => broker.dealerType === 'Sub Dealer');

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="verify-profile-button-container">
          <Link to="/profile" className="verify-profile-button">
            Go to Profile
          </Link>
        </div>
        <h2>Dashboard Overview</h2>
      </header>

      <div className="dashboard-summary">
        <div className="card dealer-card">
          <h3>Dealers</h3>
          <p className="count">{dealerCount}</p>
        </div>
        <div className="card sub-dealer-card">
          <h3>Sub Dealers</h3>
          <p className="count">{subDealerCount}</p>
        </div>
      </div>

      <section className="chart-wrapper">
        <Bar data={chartData} options={chartOptions} />
      </section>

      <section className="broker-details">
        <h3>Broker Details</h3>
        <div className="broker-tables-wrapper">
          <div className="dealers-section">
            <h4>Dealers</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {dealers.map((dealer, index) => (
                  <tr key={index}>
                    <td>{dealer.name}</td>
                    <td>{dealer.dealerType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sub-dealers-section">
            <h4>Sub Dealers</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {subDealers.map((subDealer, index) => (
                  <tr key={index}>
                    <td>{subDealer.name}</td>
                    <td>{subDealer.dealerType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add the credit points chart after the broker details */}
      <section className="credit-points-chart">
        <Bar data={monthlyCreditChartData} options={monthlyCreditChartOptions} />
      </section>
    </div>
  );
};

export default Dashboard;
