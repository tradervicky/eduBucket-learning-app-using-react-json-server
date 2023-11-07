
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./CourseData.module.css";

function CourseUnitUpdate() {
    const navigate = useNavigate();
  const [error, setError] = useState(false);

  // serch param logic 
  const [searchParams] = useSearchParams();
  const CourseId = parseInt(searchParams.get("cId"));
  const uId = parseInt(searchParams.get("uid"));
  const [unitName, setUnitName] = useState("");


//   // fetch data
useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`  http://localhost:8080/units/${uId}`);
        setUnitName(response.data.unitname); 
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourseData();
  }, [uId]);

//   //end
//start

const handleClick = async () => {
    if (!unitName) {
      setError("Please enter name and email both");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/units/${uId}`, {
        cid: CourseId,
        unitname: unitName
      });
      navigate('/dashboard');
      
    } catch (error) {
      console.error(error);
    }
  };


//end


  return (
    <div className={styles.Createpage}>
    <div className={styles.card}>
      <h1>Update Course and Educator</h1>
     
      <input
        type="email"
        placeholder="Enter Educator Email"
        required
        onChange={(e) => setUnitName(e.target.value)}
        value={unitName}
      />
      <button onClick={handleClick}>Add</button>
      {error ? <p style={{color:"red"}}>{error}</p> : ""}
    </div>
  </div>
  )
}

export default CourseUnitUpdate;

