import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username , setUsername] = useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
  console.log(username);
  return (
    <>
    <Header dashborad/>
    <h1 className='mt-5 ms-5 mb-5'>Welcome!  {username}</h1>
    <Row className='container-fluid mt-5'>
     <Col  md={8} >
      <Myproject/>
     </Col>
     <Col  md={4} style={{marginBottom:"40px"}} >
      <Profile/>
     </Col>

    </Row>
    </>
  )
}

export default Dashboard