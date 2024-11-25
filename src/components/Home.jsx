import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [brokers, setBrokers] = useState([]);
  const [filteredBrokers, setFilteredBrokers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/broker/addBroker.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setBrokers(data.data);
          setFilteredBrokers(data.data);

          // Extract unique districts
          const uniqueDistricts = [
            ...new Set(data.data.map((broker) => broker.district)),
          ].filter((district) => district); // Remove undefined/null
          setDistricts(uniqueDistricts);
        }
      })
      .catch((error) => console.error('Error fetching broker data:', error));
  }, []);

  const handleRowClick = (brokerId) => {
    navigate(`/broker-details/${brokerId}`, { state: { brokerId } });
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter brokers by email or phone
    const filtered = brokers.filter(
      (broker) =>
        broker.email.toLowerCase().includes(value) || broker.phone.includes(value)
    );

    // Apply district filter if selected
    setFilteredBrokers(
      selectedDistrict
        ? filtered.filter((broker) => broker.district === selectedDistrict)
        : filtered
    );
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);

    // Filter brokers by district
    const filtered = brokers.filter((broker) =>
      district ? broker.district === district : true
    );

    // Apply search filter if necessary
    setFilteredBrokers(
      searchTerm
        ? filtered.filter(
            (broker) =>
              broker.email.toLowerCase().includes(searchTerm) ||
              broker.phone.includes(searchTerm)
          )
        : filtered
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/add-broker">
        <button className="add-broker-button">Add Broker</button>
      </Link>

      <h1>Broker List</h1>

      {/* District Dropdown */}
      <select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <option value="">All Districts</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by email or phone..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

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
          {filteredBrokers.map((broker) => (
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
