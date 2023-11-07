import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './CourseRead.module.css';

function CourseRead() {
  const [searchParams] = useSearchParams();
  const cId = parseInt(searchParams.get("cId"));
  const [course, setCourse] = useState(null);
  const [units, setUnits] = useState([]);
  const [chapters, setChapters] = useState([]);
const navigate = useNavigate();
  // fetch course from course id
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/courses/${cId}`);
      setCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch units from course id
  const fetchUnits = async (courseId) => {
    try {
      const response = await axios.get("http://localhost:8080/units");
      const filteredUnits = response.data.filter((unit) => unit.cid === courseId);
      setUnits(filteredUnits);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch chapters from courseId
  const fetchChapters = async (courseId) => {
    try {
      const response = await axios.get("http://localhost:8080/chapters");
      const filteredChapters = response?.data.filter((chapter) => parseInt(chapter.cid) === courseId);
      setChapters(filteredChapters);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchUnits(cId);
    fetchChapters(cId);
  }, [cId]);

  // update course functionality

  const updateCourse = async (cId) => {
   navigate(`/course-name-update?cId=${cId}`)
    
  };

  //update Description

  //units update delete functionality
  const updateUnit = (uid, cid)=>{
    navigate(`/course-unit-update?uid=${uid}&cId=${cid}`)
  }
  //delete unit
  const deleteUnit = async (uid) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this unit?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/units/${uid}`);
        const updatedUnits = units.filter((unit) => unit.id !== uid);
        setUnits(updatedUnits);
      }
    } catch (error) {
      console.error("Error deleting unit: ", error);
    }
  };

  // chapter update delete functionality
  const updateChapter = (uid, cid)=>{
    navigate(`/course-chapter-update?uid=${uid}&cId=${cid}`)
  }

  // delete chapter
  const deleteChapter = async (uid) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/chapters/${uid}`);
        const updatedChapters = chapters.filter((chapter) => chapter.id !== uid);
        setChapters(updatedChapters);
      }
    } catch (error) {
      console.error("Error deleting chapter: ", error);
    }
  };
  
  //video  update delete functionality
  const updateVideos = (uid, cid)=>{
    navigate(`/course-video-update?uid=${uid}&cId=${cid}`)

  }

  // delete video
  const deleteVideo = async (videoId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this video?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/chapters/${videoId}`);
        
        const updatedChapters = chapters.map((chapter) => {
          if (chapter.videoLink.id === videoId) {
            return {
              ...chapter,
              videoLink: null 
            };
          }
          return chapter;
        });
        setChapters(updatedChapters);
      }
    } catch (error) {
      console.error("Error deleting video: ", error);
    }
  };
  

  
  return (
    <div className={styles.container}>
      <div className={styles.course}>
        {course && (
          <div>
            <h2>Course Details:</h2>
            <div className={styles.CourseDetail}>
              <p>Course : {course.course}</p>
              <p>Educator : {course.educator}</p>

              <button onClick={()=>updateCourse(course.id)}>update</button>
            </div>
            <p>Description: {course.description}</p>
          </div>
        )}
      </div>
      <div className={styles.units}>
        {units.length > 0 && (
          <div>
            <h2>Units:</h2>
            <ul>
              {units.map((unit, index) => (
              <div> <li key={index}>{unit.unitname} </li> <div><button onClick={()=>updateUnit(unit.id,unit.cid)}>update</button> <button style={{backgroundColor:"#fe6464"}} onClick={()=>deleteUnit(unit.id)}>delete</button></div></div> 
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.chapters}>
  
    <div>
      <h2>Chapters:</h2>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index}>
            <div>
              <div className={styles.chapterTitle} >
              <strong>Chapter Title:</strong> {chapter.chapter} </div> <div><button onClick={()=>updateChapter(chapter.id,chapter.cid)}>update</button> <button style={{backgroundColor:"#fe6464"}} onClick={()=>deleteChapter(chapter.id)}>delete</button></div>
            </div>
              <div>
                <strong>Videos</strong>
                <ul>
                  
                    <li key={index}>
                     
                        {chapter.videoLink}<div><button onClick={()=>updateVideos(chapter.uid, chapter.cid)} style={{marginLeft:"5px"}}>update</button> <button style={{backgroundColor:"#fe6464"}} onClick={()=>deleteVideo(chapter.uid)}>delete</button></div>
                      
                    </li>
                  
                </ul>
              </div>
            
          </li>
        ))}
      </ul>
    </div>
 
</div>



    </div>
  );
}

export default CourseRead;
