
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./CourseData.module.css";

function CourseNameUpdate() {
    const [updatedData, SetUpdatedData] = useState('')
    const navigate = useNavigate();
  const [error, setError] = useState(false);

  // serch param logic 
  const [searchParams] = useSearchParams();
  const CourseId = parseInt(searchParams.get("cId"));
  const [courseName, setCourseName] = useState("");
  const [educatorName, setEducatorName] = useState("");

//   // fetch data
useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/${CourseId}`);
        setCourseName(response.data.course); 
        setEducatorName(response.data.educator);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourseData();
  }, [CourseId]);

//   //end
//start

const handleClick = async () => {
    if (!courseName || !educatorName) {
      setError("Please enter name and email both");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/courses/${CourseId}`, {
        course: courseName,
        educator: educatorName
      });

      setCourseName("")
      setEducatorName("");
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
        type="text"
        placeholder="Enter Educator name"
        required
        onChange={(e) => setCourseName(e.target.value)}
        value={courseName}
      />
      <input
        type="email"
        placeholder="Enter Educator Email"
        required
        onChange={(e) => setEducatorName(e.target.value)}
        value={educatorName}
      />
      <button onClick={handleClick}>Add</button>
      {error ? <p style={{color:"red"}}>{error}</p> : ""}
    </div>
  </div>
  )
}

export default CourseNameUpdate

