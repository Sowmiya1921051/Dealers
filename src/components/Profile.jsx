import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/broker/addBroker.php')
      .then(response => {
        setProfileData(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleVerify = (id, currentStatus) => {
    const newStatus = !currentStatus; // Toggle the verification status

    axios.put('http://localhost/broker/updateVerified.php', {
      id,
      verified: newStatus
  })
  
    .then(response => {
        if (response.data.status === 'success') {
            // Update the local state to reflect the changes
            setProfileData(prevData =>
                prevData.map(profile =>
                    profile.id === id ? { ...profile, verified: newStatus } : profile
                )
            );
        } else {
            console.error("Error:", response.data.message);
        }
    })
    .catch(error => {
        console.error("Error updating verification status:", error);
    });
};

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile List</h1>
      {profileData && profileData.length > 0 ? (
        <table className="profile-table">
          <thead>
            <tr className="profile-table-header">
              <th className="profile-table-cell">Name</th>
              <th className="profile-table-cell">Email</th>
              <th className="profile-table-cell">Phone</th>
              <th className="profile-table-cell">Company</th>
              <th className="profile-table-cell">Dealer Type</th>
              <th className="profile-table-cell">District</th>
              <th className="profile-table-cell">Address</th>
              <th className="profile-table-cell">Verified</th>
              <th className="profile-table-cell">Credit Points</th>
              <th className="profile-table-cell">Created At</th>
            </tr>
          </thead>
          <tbody>
            {profileData.map(profile => (
              <tr key={profile.id} className="profile-table-row">
                <td className="profile-table-cell">{profile.name}</td>
                <td className="profile-table-cell">{profile.email}</td>
                <td className="profile-table-cell">{profile.phone}</td>
                <td className="profile-table-cell">{profile.company}</td>
                <td className="profile-table-cell">{profile.dealerType}</td>
                <td className="profile-table-cell">{profile.district}</td>
                <td className="profile-table-cell">{profile.address}</td>
                <td className="profile-table-cell">
                  {/* Button to toggle the verification status */}
                  <button 
                    className={`verify-button ${profile.verified ? 'verified' : 'unverified'}`}
                    onClick={() => handleVerify(profile.id, profile.verified)}
                  >
                    {profile.verified ? 'Unverify' : 'Verify'}
                  </button>
                </td>
                <td className="profile-table-cell">{profile.credit_points}</td>
                <td className="profile-table-cell">{profile.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="profile-no-data">No profiles found</div>
      )}
    </div>
  );
}

export default Profile;
