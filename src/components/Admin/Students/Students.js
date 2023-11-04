import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './Students.module.css';

function Students() {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetchStudents();
  },[])
  const fetchStudents = async ()=>{
    try{
      const response = await axios.get( "http://localhost:8080/students")
      setData(response?.data)
    }catch(error){
      console.error(error)
    } 
  }
console.log(data)
  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3>Students List</h3>
        </div>
        <table>
  <tr>
    <th>S.L</th>
    <th>Name</th>
    <th>Email</th>
    <th>Enrolled Courses</th>
  </tr>
  {data.map((data, index)=><tr key={index}>
    <td>{index+1}</td>
    <td>{data.name}</td>
    <td>{data.email}</td>
    <td >
        {data.enrolled}
    </td>
  </tr>)}
  
</table>


    </div>
  )
}

export default Students