import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnrolledCourses from './components/StudentUser/EnrolledCourse/EnrolledCourses';
function StudentProtected(props) {
    const navigate = useNavigate();
    const { component } = props;
    useEffect(() => {
      const login = localStorage.getItem('studentlogin');
      if (!login) {
        navigate('/student-login');
      }
    }, []); 
  return (
    <div>
        <EnrolledCourses/>
    </div>
  )
}

export default StudentProtected