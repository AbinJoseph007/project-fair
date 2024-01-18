import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../contexts/Contexts';

function Header({dashborad}) {
  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)
   const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{backgroundColor:"purple"}}>
        <Container >
          <Navbar.Brand style={{color:"white"}}>
          <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
              <i  class="fa-brands fa-stack-overflow fa-3x"></i>{' '}
                 Project Fiar
          </Link>
          </Navbar.Brand>
          {
            dashborad &&
            <button onClick={handleLogout} className='btn btn-warning'>logOut<i class="fa-solid fa-power-off ms-2"></i></button>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header