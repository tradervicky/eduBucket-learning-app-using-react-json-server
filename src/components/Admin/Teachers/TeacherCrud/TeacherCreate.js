import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./TeacherCreate.module.css";

function TeacherCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleClick = async () => {
    
    if(!name || !email){
      setError("Please enter name and email both");
      return;
    }
    try{
      const response = await axios.post(" http://localhost:8080/teachers",{name: name, email: email});
      console.log("before",name)
      
        setEmail("");
        setName("");
        setError("");
        navigate('/dashboard');
      console.log("After cleared",name)
    }catch(error){
      console.error(error)
    }
  };
  return (
    <div className={styles.Createpage}>
      <div className={styles.card}>
        <h1>Add New Educator</h1>
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

export default TeacherCreate;
