import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./TeacherUpdate.module.css";

function TeacherUpdate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  
  // serch param logic 
  const [searchParams] = useSearchParams();
  const TeacherId = parseInt(searchParams.get("Id"));
  const [teacherData, setTeacherData] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teachers/${TeacherId}`);
        setTeacherData(response.data);
        setName(response.data.name); 
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeacherData();
  }, [TeacherId]);

  //end
  console.log(teacherData)

  const handleClick = async () => {
    if (!name || !email) {
      setError("Please enter name and email both");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/teachers/${TeacherId}`, {
        name: name,
        email: email
      });

      setEmail("");
      setName("");
      setError("");
      navigate('/dashboard');
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.Createpage}>
      <div className={styles.card}>
        <h1>Update Educator</h1>
        <input
          type="text"
          placeholder="Enter Educator name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter Educator Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button onClick={handleClick}>Add</button>
        {error ? <p style={{color:"red"}}>{error}</p> : ""}
      </div>
    </div>
  );
}

export default TeacherUpdate;
