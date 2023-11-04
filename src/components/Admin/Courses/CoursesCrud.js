import React from 'react'
import styles from './CoursesCrud.module.css';
import { IoCreateOutline } from "react-icons/io5";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
function CoursesCrud() {
  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3>Courses List</h3>
            <span><IoCreateOutline size={24}/> Create</span>
        </div>
        <table>
  <tr>
    <th>Courses</th>
    <th>Educator</th>
    <th>Actions</th>
  </tr>
  <tr>
    <td>JavaScript</td>
    <td>alfred@doe.com</td>
    <td >
        <AiFillEye size={24} style={{ cursor:"pointer"}}/>
        <BiEdit size={24} style={{color:"#6674cc", cursor:"pointer"}}/>
        <AiOutlineDelete size={24} style={{color:"red" , cursor:"pointer"}}/>
    </td>
  </tr>
  
</table>


    </div>
  )
}

export default CoursesCrud