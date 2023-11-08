import React from 'react'
import Sidebar from './Sidebar'
import styles from './AdminDashboard.module.css';
// import { MdDensityMedium } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    localStorage.removeItem('adminlogin');
    navigate('/admin'); 
  }
  return (
    <div className={styles.dashboard2}>
        <div className={styles.navbar2}>
        <div className={styles.icon}>
            <img src="/images/logo.png" alt="logo" />
        
        </div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleClick}>log out</button>
        </div>

      <Sidebar/>
        

    </div>
  )
}

export default AdminDashBoard