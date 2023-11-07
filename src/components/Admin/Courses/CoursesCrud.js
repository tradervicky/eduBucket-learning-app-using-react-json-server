import React, { useEffect, useState } from 'react'
import styles from './CoursesCrud.module.css';
import { IoCreateOutline } from "react-icons/io5";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
function CoursesCrud() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  // const [id, setId] = useState("");
  // console.log(id)
  useEffect(()=>{
    CourseEducator();
  },[])
  const CourseEducator = async ()=>{
    try{
      const response = await axios.get( " http://localhost:8080/courses")
      setData(response?.data)
    }catch(error){
      console.error(error)
    } 
  }
// Delete functionality
const CourseDelete = async (id) => {
  try {
    const confirmed = window.confirm("Confirm if you want to delete the complete course");
    if (confirmed) {
      // Get all units 
      const unitsResponse = await axios.get(`http://localhost:8080/units?cid=${id}`);
      const unitsData = unitsResponse.data;

      // Delete all units 
      if (unitsData.length > 0) {
        for (let i = 0; i < unitsData.length; i++) {
          const unitId = unitsData[i].id;
          await axios.delete(`http://localhost:8080/units/${unitId}`);
          
          // Get all chapters 
          const chaptersResponse = await axios.get(`http://localhost:8080/chapters?uid=${unitId}`);
          const chaptersData = chaptersResponse.data;

          // Delete all chapters of this the unit
          if (chaptersData.length > 0) {
            for (let j = 0; j < chaptersData.length; j++) {
              const chapterId = chaptersData[j].id;
              await axios.delete(`http://localhost:8080/chapters/${chapterId}`);
            }
          }
        }
      }

      // Delete the course 
      await axios.delete(`http://localhost:8080/courses/${id}`);
      CourseEducator(); 
    }
  } catch (error) {
    console.error(error);
  }
};

// Read Fetch and render to Read page
const handleRead = (id)=>{
  navigate(`/course-read?cId=${id}`)
}

  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3>Courses List</h3>
          <Link to={'/course-create'} style={{textDecoration:"none"}}>  <span><IoCreateOutline size={24}/> Create</span></Link>
        </div>
        <table>
  <tr>
    <th>S.N</th>
    <th>Courses</th>
    <th>Educator</th>
    <th>Actions</th>
  </tr>
  {data.map((data, index)=>
  <tr key={index}>
    <td>{index+1}</td>
    <td>{data.course}</td>
    <td>{data.educator}</td>
    <td >
        <AiFillEye size={24} style={{ cursor:"pointer"}} onClick={()=>handleRead(data.id)}/>
        
        <AiOutlineDelete size={24} style={{color:"red" , cursor:"pointer"}} onClick={()=>CourseDelete(data.id)}/>
    </td>
  </tr>)}
  
</table>


    </div>
  )
}

export default CoursesCrud