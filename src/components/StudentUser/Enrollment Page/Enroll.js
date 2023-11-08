import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Enroll.module.css';

function Enroll() {
    const [searchParams] = useSearchParams();
    const courseId = parseInt(searchParams.get("cId"));
    const [coueseData, setCourseData] = useState([]);
    const studentId = parseInt(searchParams.get("sid"));
    const [studentData, setStudentData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchCourseData();
        fetchStudentData();
    },[])
    const fetchStudentData =async ()=>{
        try{
            const response = await axios.get(`http://localhost:8080/students/${studentId}`)
            setStudentData(response?.data)
        }catch(error){
            console.log(error)
        }
    }
    const fetchCourseData = async()=>{
        try{
            const response = await axios.get(`http://localhost:8080/courses/${courseId}`)
            setCourseData(response?.data)
        }catch(error){
            console.error(error)
        }
    }


    const isEnrolled = studentData.enrolled?.some((course) => course === coueseData.course);
    // logic for if you have not loggined and click on buy course
    const isLoggedIn = localStorage.getItem('studentlogin');
    const clickhandle = async () => {
      try {
        if(!isLoggedIn){
            navigate('/student-login')
        }
        if (!isEnrolled) {
          const updatedCourses = [...studentData.enrolled, coueseData.course];
          const updatedData = { ...studentData, enrolled: updatedCourses };
          await axios.put(`http://localhost:8080/students/${studentId}`, updatedData);
          navigate(`/?sId=${studentId}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 8) + 1;
    };

   
    if(!isLoggedIn){
        
    }
  return (
    <div className={styles.Enroll}>
        <div className={styles.courseAndDetail}>
            <div className={styles.Coursetext}>
                <p>Welcome to @supreme-dev Family</p>
                <h1>{coueseData.course}</h1>
                <p>A comprehensive program that covers the fundamentals of data structures and algorithms. It includes lectures and exercises to help students design and implement efficient solutions. This course is suitable for beginners and experienced programmers and aims to prepare students for technical interviews and placement exams.</p>
                <div className={styles.language}>
                    <p>Hindi</p>
                    <p>100+ Lectures</p>
                </div>
            </div>
            <div className={styles.courseCard}>
                <div className={styles.imageContainer}>
                    <img src={`/images/course/${getRandomNumber()}.jpg`} alt="" />
                </div>
               {isEnrolled ? (
            <button disabled>Enrolled</button>
          ) : (
            <button onClick={clickhandle}>Buy Now</button>
          )}
                <div className={styles.Description}>
                    <h3>This Course Includes :</h3>
                    <ul>
                        <li>No Pre-requisite Required</li>
                        <li>170+ hours On-Demand Video</li>
                        <li>400+ Coding Questions (asked by Top Companies)</li>
                        <li>Live Resume & Interview Preparation</li>
                        <li>with Doubt Assistance</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={styles.CourseContent}></div>
    </div>
  )
}

export default Enroll