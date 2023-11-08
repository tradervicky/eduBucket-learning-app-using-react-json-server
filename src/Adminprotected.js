import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashbord from './components/Admin/AdminDashboard/AdminDashbord';
import CourseRead from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseRead';

 // Make sure the path is correct

function AdminProtected(props) {
  const navigate = useNavigate();
  const { component } = props;
  useEffect(() => {
    const login = localStorage.getItem('adminlogin');
    if (!login) {
      navigate('/admin');
    }
  }, []); 

  return (
    <div>
      <AdminDashbord />
      
    </div>
  );
}

export default AdminProtected;
