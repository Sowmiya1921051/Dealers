import React, { useState } from "react";
import axios from "axios";

const BrokerDetails = () => {
  const [brokerDetails, setBrokerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    dealerType: "", // Initial empty value
    district: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrokerDetails({ ...brokerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!brokerDetails.name || !brokerDetails.email || !brokerDetails.phone || !brokerDetails.dealerType) {
      setMessage("All fields are required.");
      setMessageType("error");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost/broker/addBroker.php",
        brokerDetails,
        { headers: { "Content-Type": "application/json" } }
      );
  
      setMessage(response.data.message);
      setMessageType(response.data.status === "success" ? "success" : "error");
  
      if (response.data.status === "success") {
        setBrokerDetails({
          name: "",
          email: "",
          phone: "",
          company: "",
          dealerType: "",
          district: "",
          address: "",
        });
      }
    } catch (error) {
      setMessage("Failed to save broker details.");
      setMessageType("error");
      console.error(error);
    }
  };
  

  return (
    <div className="animated-container">
      <div className="animated-card">
        <h2 className="animated-title">Broker Details</h2>
        <form onSubmit={handleSubmit} className="animated-form">
          {/* Name */}
          <div className="input-container">
            <input
              type="text"
              name="name"
              value={brokerDetails.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="animated-input"
            />
          </div>

          {/* Email */}
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={brokerDetails.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="animated-input"
            />
          </div>

          {/* Phone */}
          <div className="input-container">
            <input
              type="text"
              name="phone"
              value={brokerDetails.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="animated-input"
            />
          </div>

          {/* Company */}
          <div className="input-container">
            <input
              type="text"
              name="company"
              value={brokerDetails.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="animated-input"
            />
          </div>

          {/* Dealer Type */}
          <div className="input-container">
            <select
              name="dealerType"
              value={brokerDetails.dealerType}
              onChange={handleChange}
              className="animated-input"
              placeholder="Select Dealer Type"
              required
            >
                <option value="" disabled>
                  Select Dealer Type
                </option>
              <option value="Dealer">Dealer</option>
              <option value="Sub Dealer">Sub Dealer</option>
            </select>
          </div>

           
          {/* District */}
          <div className="input-container">
            <input
              type="text"
              name="district"
              value={brokerDetails.district}
              onChange={handleChange}
              placeholder="District"
              className="animated-input"
              required
            />
          </div>

          {/* Address */}
          <div className="input-container">
            <textarea
              name="address"
              value={brokerDetails.address}
              onChange={handleChange}
              placeholder="Full Address"
              className="animated-input"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="animated-btn">
            Submit
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerDetails;
