
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./CourseData.module.css";

function CourseChapterUpdate() {
  
  const navigate = useNavigate();
const [error, setError] = useState(false);

// serch param logic 
const [searchParams] = useSearchParams();
const CourseId = parseInt(searchParams.get("cId"));
const uId = parseInt(searchParams.get("uid"));
const [chapterName, setChapterName] = useState("");
const [videolink, setvideoLink] = useState("");


//   // fetch data
useEffect(() => {
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(` http://localhost:8080/chapters/${uId}`);
      setChapterName(response.data.chapter); 
      setvideoLink(response.data.videoLink)
      
      
    } catch (error) {
      console.error(error);
    }
  };
  fetchCourseData();
}, [uId]);

//   //end
//start

const handleClick = async () => {
  if (!chapterName) {
    setError("Please enter name and email both");
    return;
  }
  try {
    const response = await axios.put(`http://localhost:8080/chapters/${uId}`, {
      cid: CourseId,
      uid: uId,
      chapter: chapterName,
      videoLink: videolink

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
    <h1>Update Chapter</h1>
   
    <input
      type="email"
      placeholder="Enter Educator Email"
      required
      onChange={(e) => setChapterName(e.target.value)}
      value={chapterName}
    />
    <button onClick={handleClick}>Add</button>
    {error ? <p style={{color:"red"}}>{error}</p> : ""}
  </div>
</div>
)
}

export default CourseChapterUpdate

