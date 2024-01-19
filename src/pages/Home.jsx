import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../images/What-Is-Information-Technology-Project-Management-removebg-preview.png'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectAPI()
    console.log(result.data);
    setHomeProject(result.data)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)

    }
  }, [])

  useEffect(() => {
    getHomeProject()
  }, [])

  console.log(isLogin);
  return (
    <>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "purple" }}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-5 '>
            <Col sm={12} md={6} className='p-5 mt-5'>
              <h1 style={{ fontSize: "100px", marginTop: "50px" }}>Project Fair</h1>
              <p>one stop destination for all software project</p>
              {isLogin ?
                <Link to={'/dashborad'} className='btn btn-success rounded'>manage Project<i className='fa-solid fa-arrow-right ms-3'></i></Link> :

                <Link to={'/login'} className='btn btn-success rounded'>Get started<i className='fa-solid fa-arrow-right ms-3'></i></Link>}
            </Col>
            <Col sm={12} md={6}>
              <img src={titleimage} alt="" className='w-100 p-5' style={{ marginTop: "100px" }} />
            </Col>
          </Row>
        </div>
      </div>

      <div className='all-project mt-5'>
        <h1 className='text-center mt-5 mb-5'>explore our project</h1>
        <marquee scrollAmount={30} className=" mb-5">
          <div className='d-flex'>
            {homeProject?.length>0?
              homeProject.map((item) => (
                <div className='ms-5 mb-3' style={{ width: "400px" }}>
                  <Projectcard project={item} />
                </div>
              ))
              : null}

          </div>
        </marquee>

        <div className='text-center mb-5 mt-2'>
          <Link style={{textDecoration:"none"}} to={'/project'}>
            see more Projects
          </Link>

        </div>
      </div>
    </>
  )
}

export default Home