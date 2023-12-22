import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allProjectAPI } from '../services/allAPI'
import logins from '../images/10-47-58-930-512-unscreen.gif'
import { Link } from 'react-router-dom'


function Project() {

  const [allProject, setAllProject] = useState([])


  const [searchKey , setSearchKey] = useState("")

  const [isToken , setIsToken] = useState(false)



  const GetAllProject = async () => {


    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      console.log(result.data);
      setAllProject(result.data)
    }
  }

  console.log(searchKey);

  useEffect(() => {
    GetAllProject()
  }, [searchKey])
  
  useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setIsToken(true)
     }
  },[])

  return (
    <>
      <Header />
      <div className='text-center mt-5' style={{ fontSize: "50px", marginTop: "30px" }}>
        <h1>All Project</h1>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex w-25 ">
            <input type="text" value={searchKey} onChange={e=>setSearchKey(e.target.value)}  className='form-control' placeholder='search here' />
            <i class="fa-solid fa-magnifying-glass  fa-rotate-90 fa-2xs " style={{ marginLeft: "-70px", color: "black", }}></i>
          </div>
        </div>
      </div>
      <Row className='mt-5 container-fluid mb-5'>
        {allProject?.length>0?
          allProject?.map((item)=>(
            <Col className='mb-5' sm={12} md={6} lg={4}>
              <Projectcard project={item} />
            </Col>))
          : 
          <div>
            {
              isToken?  <p>no such projects</p>:
              <div className='d-flex justify-content-center align-items-center flex-column'>
              <img src={logins} alt="login" height={'300px'} width={'300px'} />
              <p className='text-danger fw-2 fs-2'>please <Link style={{textDecoration:"none"}} className='text-info' to={'/login'}>Login</Link> to view Projects</p>
              </div>
              }
          </div>}
 
      </Row>
    </>
  )
}

export default Project

