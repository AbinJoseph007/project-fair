import React, { useEffect, useState } from 'react'
import Addproject from './Addproject'
import { userProjectAPI } from '../services/allAPI'

function Myproject() {
  const[userProject , setUserProject] = useState()

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
  },[])
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
       <button className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>
       <button className='btn'><i class="fa-brands fa-github text-info"></i></button>
       <button className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
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