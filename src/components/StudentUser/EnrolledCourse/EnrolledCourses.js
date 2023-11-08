import React from "react";
import styles from "./EnrolledCourses.module.css";
import { AiFillEye} from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";

function EnrolledCourses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [courses, setCourses] =useState([]);
  const sId = parseInt(searchParams.get("sId"));
  useEffect(()=>{
    fetchStudents();
  },[])
  const fetchStudents = async ()=>{
    try{
      const response = await axios.get( `http://localhost:8080/students`)

      const filteredData = response.data.filter((data,index)=> data.id === sId)
      setData(filteredData)
      if (filteredData.length > 0) {
        setData(filteredData);
        const enrolledCourses = filteredData.map((student) => student.enrolled).flat();
        setCourses(enrolledCourses);
      }
      
    }catch(error){
      console.error(error)
    } 
  }
const showCourse = (id)=>{
navigate(`/watch-page?sId=${sId}&cIndex=${id}`)
}

// Check if the user is logged in
const isLoggedIn = localStorage.getItem('studentlogin');

if (!isLoggedIn) {
  return (
    <div>
      <p>Please login first and <span onClick={()=> navigate('/student-login')} style={{color:"blue", cursor:"pointer"}}>click here</span> </p>
    </div>
  );
}

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Enrolled  Courses</h2>
        
      </div>
      <table>
      {data.map((data, index) => (
        <tr key={index}>
          <th style={{backgroundColor:"#d1e7dd"}}>Student Name</th>                  
          <th colSpan={2} style={{backgroundColor:"#d1e7dd"}}>{data.name}</th>
        </tr>))}
        {data.map((data, index) => (
        <tr key={index}>
          <th style={{backgroundColor:"#e2e3e5"}}>Student Email</th>         
         <th colSpan={2} style={{backgroundColor:"#e2e3e5"}}>{data.email}</th>
        </tr>))}
        <tr>
          <th style={{backgroundColor:"#cff4fc"}}> S. N</th>
          <th style={{backgroundColor:"#cff4fc"}}>enrolled Courses</th>
          <th style={{backgroundColor:"#cff4fc"}}>Go to Course</th>
        </tr>
        {courses.map((data, index) => (
          <tr key={data.id}>
            <td>{index + 1}</td>
            
            <td>{data}</td>
            <td>
              <AiFillEye size={24} style={{ cursor: "pointer" }} onClick={()=>showCourse(index)} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default EnrolledCourses;
