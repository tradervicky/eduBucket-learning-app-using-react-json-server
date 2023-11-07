import React from 'react';
import styles from './NavBar.module.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <div className={styles.mainNav} >
        
        <div className={styles.logo}>
            <img src="/images/logo.png" alt="logo" />
        </div>
        
        <div className={ styles.menu}>
            <ul>
                <li>Courses</li>
                <li>Services</li>
                <li>Contact Us</li>
                <li>Our Teachers</li>
                <li>Enrolled Courses</li>
            </ul>
        </div>
        <div className={styles.navbtn}>
          <input type="text" placeholder='Enter course' />
            <button>search</button>
        </div>
        <div className={styles.userIcon}>
       <Link to={'/student-login'}><FaRegCircleUser size={38} style={{cursor:"pointer", color:"rgb(100 21 255)"}}/></Link> 
        </div>
        
    </div>


  );
}

export default NavBar;
