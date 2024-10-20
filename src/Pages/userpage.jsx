import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

        const response = await fetch(`http://localhost:4000/user-profile?email=${storedEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

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
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name || ""}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone || ""}
            onChange={handleChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address || ""}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Address: {userData.address}</p>
          <button onClick={toggleEditMode}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
