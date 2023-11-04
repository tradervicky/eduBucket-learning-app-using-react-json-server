import React from 'react'
import Sidebar from './Sidebar'
import styles from './AdminDashboard.module.css';
import { MdDensityMedium } from "react-icons/md";

function AdminDashBoard() {
  return (
    <div className={styles.dashboard2}>
        <div className={styles.navbar2}>
        <div className={styles.icon}>
            <img src="/images/logo.png" alt="logo" />
         <MdDensityMedium style={{ color: 'black', fontSize: '32px', cursor: 'pointer' }}/>
        </div>
            <h1>Admin Dashboard</h1>
        </div>

      <Sidebar/>
        

    </div>
  )
}

export default AdminDashBoard