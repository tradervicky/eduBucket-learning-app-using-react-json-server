import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CoursesCrud from '../Courses/CoursesCrud';
import Students from '../Students/Students';
import Teacher from '../Teachers/Teacher';



import styles from './sidebar.module.css';

function Sidebar() {
    const navigate = useNavigate();
    
    const [adminPage, setAdminPage] = useState(true)
    const [teacherPage, setTeacherPage] = useState(false)
    const [coursePage, setcoursePage] = useState(false)
    const [studentPage, setStudentPage] = useState(false)
const handleAdmin = (e)=>{
    e.preventDefault()
    setTeacherPage(false)
    setStudentPage(false)
    setcoursePage(false)
    navigate('/dashboard')
}
const handleTeacher = (e)=>{
    e.preventDefault()
    setTeacherPage(true)
    setStudentPage(false)
    setcoursePage(false)
    setAdminPage(false)
}
const handleCourses = (e)=>{
    e.preventDefault()
    setTeacherPage(false)
    setStudentPage(false)
    setcoursePage(true)
    setAdminPage(false)
}
const handleStudents = (e)=>{
    e.preventDefault()
    setTeacherPage(false)
    setStudentPage(true)
    setcoursePage(false)
    setAdminPage(false)
}
  return (
    <div className={styles.sidebar}>
        
        <div className={styles.componentList}>
            <ul>
                <li onClick={handleAdmin}> Admin</li>
                <li onClick={handleTeacher}>Teacher</li>
                <li onClick={handleCourses}>Courses</li>
                <li onClick={handleStudents}>Students</li>
            </ul>
        </div>
        <div>
        {
            teacherPage? <Teacher/> : studentPage ? <Students/> : coursePage ? <CoursesCrud/> : <h2 style={{marginLeft:"500px"}}>welcome to Dashboard</h2>
        }
        </div>

    </div>
  )
}

export default Sidebar