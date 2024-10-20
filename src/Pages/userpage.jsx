import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/userpage.css";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Properly set email state

  // Fetch user data from MongoDB backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("email")?.trim();
        console.log(storedEmail);
        if (!storedEmail) {
          navigate("/login");
          return;
        }
        setEmail(storedEmail);

        const response = await fetch(
          `http://localhost:4000/user-profile?email=${storedEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setUserData(data.data); // Assuming API response has a data object
        } else {
          console.error("Error fetching user data:", data.message);
          navigate("/login"); // Navigate to login on failure
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Navigate to login on error
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:4000/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userData }), // Send email and updated data
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully");
        setEditMode(false);
        localStorage.setItem("email", userData.email); // Save the updated email
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-profile-container">
      <h1 className="profile-header">User Profile</h1>
      {editMode ? (
        <div className="profile-edit-form">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone:</label>
            <input
              className="form-input"
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address:</label>
            <input
              className="form-input"
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={handleChange}
            />
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="profile-view">
          <p className="profile-info">Name: {userData.name}</p>
          <p className="profile-info">Email: {userData.email}</p>
          <p className="profile-info">Phone: {userData.phone}</p>
          <p className="profile-info">Address: {userData.address}</p>
          <button className="edit-button" onClick={toggleEditMode}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
