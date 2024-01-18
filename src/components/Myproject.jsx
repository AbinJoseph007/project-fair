import React, { useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { useContext } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/Contexts'
import EditProject from './EditProject'

function Myproject() {

  const {editProjectResponse , setEditProjectResponse}= useContext(editProjectResponseContext)
   
  const[userProject , setUserProject] = useState()

  const {addProjectResponse , setAddProjectResponse}= useContext(addProjectResponseContext)


  const getUserProject = async()=>{

   const  token = sessionStorage.getItem('token')
   const reqHeader ={
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
   }

   const result = await userProjectAPI(reqHeader)
   console.log(result.data);
   setUserProject(result.data)
  } 

  useEffect(()=>{
    getUserProject()
  },[addProjectResponse , editProjectResponse])

  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
     }
     const result = await deleteProjectAPI (id,reqHeader)
     console.log(result);
     if(result.status === 200){
      getUserProject()
     }
     else{
      console.log(result.response.data);
     }
  }
  return (
    <div className='card shadow p-5 mb-5'>
     <div className='d-flex justify-content-between'>
        <h3 className='text-success'>My Projects</h3>
        <Addproject/>
     </div>
     <div className='mt-4'>
      {userProject?.length>0?
      userProject?.map((item)=>(  <div className='border d-flex align-items-center p-3 rounded mb-3'>
      <h5>{item.title}</h5>
      <div className="ms-auto d-flex">
        <EditProject project ={item}/>

       <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-info"></i></a>

       <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
      </div>

   </div>))
    :
      <p className='text-danger fw-bolder fs-4 mt-3'>No Project Uploaded here!!!!</p>
}
     </div>
    </div>
  )
}

export default Myproject

// <i class="fa-brands fa-github text-info"></i>