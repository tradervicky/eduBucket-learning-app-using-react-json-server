import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Enroll.module.css';

function Enroll() {
    const [searchParams] = useSearchParams();
    const courseId = parseInt(searchParams.get("cId"));
    const [coueseData, setCourseData] = useState([]);

    useEffect(()=>{
        fetchCourseData();
    },[])

    const fetchCourseData = async()=>{
        try{
            const response = await axios.get(`http://localhost:8080/courses/${courseId}`)
            setCourseData(response?.data)
            
        }catch(error){
            console.error(error)
        }
    }
    const clickhandle =async  ()=>{
        try {
          await  axios.put(` http://localhost:8080/students/`,{
            
          })
        }catch(error){
            console.error(error)
        }
    }
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 8) + 1;
    };
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
                <button onClick={clickhandle}>Buy Now</button>
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