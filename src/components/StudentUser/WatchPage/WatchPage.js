import React, { useEffect } from 'react'

import styles from './WatchPage.module.css'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
function WatchPage() {
    const [students, setStudents] = useState([]);
    const [studentscourse, setStudentsCourse] = useState("");
    const [course, setCourse] = useState([]);
    const [unit, setUnit] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');
    const [showAccordion, setShowAccordion] = useState(null);
    // search param logic
    const [searchParams] = useSearchParams();
    const sId = parseInt(searchParams.get("sId"));
    const cIndex = parseInt(searchParams.get("cIndex"));

    // fetch students 
    const fetchStudents = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/students/${sId}`);
          setStudents(response?.data);
          
            setStudentsCourse(response?.data.enrolled[cIndex]);
          
        } catch (error) {
          console.error(error);
        }
      };
   
      useEffect(() => {
        fetchStudents();
        fetchCourse();
        
      }, []);
    //fetch course 
    const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/courses`);
          const filteredCourse = response?.data.filter((data) => data.course === studentscourse);
          setCourse(filteredCourse);
          const courseId = filteredCourse.map((dat) => dat.id); 
          fetchUnit(courseId); 
        } catch (error) {
          console.error(error);
        }
      };

      // fetch unit
      const fetchUnit = async (courseId) => {
        try {
          const response = await axios.get(`http://localhost:8080/units`);
          const filteredUnits = response?.data.filter((data) => data.cid === courseId[0]);
          setUnit(filteredUnits);
          
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchCourse();
      }, [studentscourse]);


      // fetch chapters
      const fetchChapters = async (courseId) => {
        try {
          const response = await axios.get(`http://localhost:8080/chapters`);
          const filteredChapters = response?.data.filter((data) => parseInt(data.cid) === courseId[0]);
          setChapter(filteredChapters);
          console.log(filteredChapters);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        if (studentscourse) {
          fetchCourse();
        }
      }, [studentscourse]);
    
      useEffect(() => {
        if (course.length > 0) {
          const courseId = course.map((dat) => dat.id);
          fetchUnit(courseId);
        }
      }, [course]);
    
      useEffect(() => {
        if (course.length > 0) {
          const courseId = course.map((dat) => dat.id);
          fetchChapters(courseId);
        }
      }, [course]);
  return (
    <div className={styles.FAQcomplete}>
        <div className={styles.FAQimg}>
        <video controls autoPlay src={currentVideo} width="700" height="400" />
        </div>
        <div className={styles.Faqque}>
          
          <h1>Enrolled Course <span>{studentscourse}</span></h1>
          <p className={styles.Faqquep}>A comprehensive program that covers the fundamentals of data structures and algorithms. It includes lectures and exercises to help students design and implement efficient solutions. This course is suitable for beginners and experienced programmers and aims to prepare students for technical interviews and placement exams.</p>
          <h3>Course Material</h3>
          
          
          <ul>
      {unit.map((unitData) => (
        <div key={unitData.id}>
          <div className={styles.Accordion}>
            <div
              className={styles.AccordionHeading}
              onClick={() => setShowAccordion(showAccordion === unitData.id ? null : unitData.id)}
            >
              <h2  className={styles.plusminus}>
                Unit: {unitData.unitname}{' '}
                {showAccordion === unitData.id ? (
                  <img src="/images/minus2.svg" alt="minus" />
                ) : (
                  <img src="/images/plus.svg" alt="plus" />
                )}
              </h2>
            </div>
            {showAccordion === unitData.id && (
              <ul className={styles.AccordionContent}>
                {chapter
                  .filter((chapterData) => parseInt(chapterData.uid) === unitData.id)
                  .map((filteredChapter) => (
                    <li
                    style={{cursor: "pointer", color:"blue", textDecoration:"underline"}}
                      key={filteredChapter.id}
                      onClick={() => setCurrentVideo(filteredChapter.videoLink)}
                    >
                      Chapter {filteredChapter.id}: {filteredChapter.chapter}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </ul>




        </div>
    </div>
  )
}

export default WatchPage