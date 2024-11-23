    import React, { useEffect, useState } from 'react';
    import { useLocation, Link } from 'react-router-dom';

    function BrokerDetails() {
    const location = useLocation();
    const { brokerId } = location.state || {};
    const [brokerDetails, setBrokerDetails] = useState(null);

    useEffect(() => {
        if (brokerId) {
        fetch(`http://localhost/broker/addBroker.php?id=${brokerId}`)
            .then((response) => response.json())
            .then((data) => {
            if (data.status === 'success') {
                setBrokerDetails(data.data);
            }
            })
            .catch((error) => console.error('Error fetching broker details:', error));
        }
    }, [brokerId]);

    if (!brokerDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
        <h1>Broker Details</h1>
        <p><strong>ID:</strong> {brokerDetails.id}</p>
        <p><strong>Name:</strong> {brokerDetails.name}</p>
        <p><strong>Email:</strong> {brokerDetails.email}</p>
        <p><strong>Phone:</strong> {brokerDetails.phone}</p>
        <p><strong>Company:</strong> {brokerDetails.company}</p>
        <p><strong>Dealer Type:</strong> {brokerDetails.dealerType}</p>
        <p><strong>District:</strong> {brokerDetails.district}</p>
        <p><strong>Address:</strong> {brokerDetails.address}</p>
        <p><strong>Created At:</strong> {brokerDetails.created_at}</p>
        <p><strong>Parent Dealer:</strong> {brokerDetails.parent_dealer || 'N/A'}</p>

        <h2>Sub-Dealers</h2>
        {brokerDetails.sub_dealers.length === 0 ? (
            <p>No sub-dealers found.</p>
        ) : (
            <ul>
            {brokerDetails.sub_dealers.map((subDealer) => (
                <li key={subDealer.id}>
                <strong>{subDealer.name}</strong> ({subDealer.dealerType})
                </li>
            ))}
            </ul>
        )}

        <Link to="/">
            <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
            Back to Broker List
            </button>
        </Link>
        </div>
    );
    }

    export default BrokerDetails;
