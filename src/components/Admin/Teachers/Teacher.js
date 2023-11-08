import React from 'react'
import styles from './Teacher.module.css';
import { IoCreateOutline } from "react-icons/io5";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react'

function Teacher() {
  const [data, setData] = useState([]);
  
  // const [id, setId] = useState("");
  // console.log(id)
  useEffect(()=>{
    fetchTeachers();
  },[])
  const fetchTeachers = async ()=>{
    try{
      const response = await axios.get( " http://localhost:8080/teachers")
      setData(response?.data)
    }catch(error){
      console.error(error)
    } 
  }
// Delete functionality
const teacherDelete = async (id) => {
  try {
    const confirmed = window.confirm("confirm if you want to delete");
    if (confirmed) {
      const response = await axios.delete(`http://localhost:8080/teachers/${id}`);
      fetchTeachers();
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3>Teachers List</h3>
         <Link to='/teacher-add' style={{textDecoration:"none"}}><span><IoCreateOutline size={24}/> Create</span></Link> 
        </div>
        <table>
  <tr>
    <th>S.N</th>
    <th>Name</th>
    <th>Email</th>
    <th>Actions</th>
  </tr>
  {data.map((data, index)=><tr key={data.id}>
    <td>{index+1}</td>
    <td>{data.name}</td>
    <td>{data.email}</td>
    <td >
        
       <Link to={`/teacher-update?Id=${data.id}`}><BiEdit size={24} style={{color:"#6674cc" , cursor:"pointer"}} /></Link> 
        <AiOutlineDelete size={24} style={{color:"red" , cursor:"pointer"}} onClick={()=>teacherDelete(data.id)} />
    </td>
  </tr>)}
  
</table>


    </div>
  )
}

export default Teacher