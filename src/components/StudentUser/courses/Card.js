import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

function Card({sid}) {
    const [data, setData] =useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchCourseData();
    },[])

    const fetchCourseData =async ()=>{
        try{
            const response = await axios.get(" http://localhost:8080/courses")
            setData(response?.data)
        }catch(error){
            console.error(error)
        }
    };
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 8) + 1;
    };
    const handleClick = (courseId)=>{
        navigate(`/enroll-course?cId=${courseId}&sid=${sid}`)
    }

  return (
    <div className={styles.CardContainer}>
        <h1>Our Courses</h1>
        <div className={styles.allCards}>
            {data.map((item, iedex)=>(
    <div className={styles.card}>
            <div className={styles.img}>
            <img src={`/images/course/${getRandomNumber()}.jpg`} alt={item.course} />
            </div>
            <div className={styles.Coursename}>
                <h3 onClick={()=>handleClick(item.id)}>{item.course}</h3>
            </div>
            <p id={styles.para}>Far advanced settling say finished raillery. Offered chiefly farther</p>
            <div className={styles.TeacherName}>
                <p>{item.educator}</p>
                <span>72 hours</span>
            </div>
        </div>
        ))}
        </div>
        </div>
  )
}

export default Card



