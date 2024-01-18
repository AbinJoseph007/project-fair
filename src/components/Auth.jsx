import React, { useContext, useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import gif from '../images/giphy-unscreen.gif'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../contexts/Contexts'

function Auth({ register }) {
    const { isAuthToken , setIsAuthToken}= useContext(isAuthTokenContext)

    //1 create a state to hold the value of user registration details
    const [userData , setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    //7 to navigate
    const navigate = useNavigate()

    const registerform = register ? true : false
    console.log(userData);

    //2 button click function to register
    const handleRegister = async (e)=>{
        // to 
        e.preventDefault()

        //3 destructuring the content to registration
        const {username,email,password}=userData
 
        // if the elments are not filled
        if(!username || !email || !password){
            toast.info('please fill the form completely')
        }
        else{
            //4 api call in else (its an async function)
            const result = await registerAPI(userData)
            console.log(result.data);
            if(result.status === 200){
                toast.success(`${result.data.username} is successfully registered`)
                //6 for empty register page after registering and navigate to login page
                setUserData({
                    username:"",
                    email:"",
                    password:"" 
                })
                //8 navigate to login page
                navigate('/login')
            }
            //5 alert for error response
            else{
                toast.error(result.response.data)
            }
        }
    }

    // function to login 
    const handleLogin = async (e)=>{
        e.preventDefault()
       
        // destructuring email and password
        const{email,password}=userData
        //  checking email and password
        if(!email || !password){
            toast.info('please fill the form compleately')
        }
        else{
            // api call
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status === 200){
                 //  alert
                 toast.success('login successfull')
                 setIsAuthToken(true)
                // store data 
                sessionStorage.setItem("existingUser" ,JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token" ,result.data.token)

                // empty state
                setUserData({
                    email:"",
                    password:"" 
                })
                // navigate
                // navigate('/')     
                setTimeout(()=>{
                    navigate('/') 
                },2500)
            }
            else{
               toast.dark(result.response.data)
            }

        }
    }

    return (
        <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div className="w-75 container">
                <Link to={'/'} style={{ textDecoration: "none" }} ><i class="fa-solid fa-arrow-right fa-xs fa-rotate-180 me-3"></i>Back to Home</Link>
                <div className="card bg-success p-5 rounded">
                    <Row className='align-items-center'>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src={gif} alt="" width={'100%'} />
                            </div>
                            <div className="col-lg-6">
                                <div className='d-flex align-items-center justify-content-center flex-column '>
                                    <h1>Project Fair</h1>
                                    <h5 style={{ color: "black" }} className='mt-3'>
                                        {
                                            registerform ? "sign up to your Account" : "sign in to your account"
                                        }
                                    </h5>
                                    <Form className='mt-3 w-50'>
                                        { registerform &&
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                            
                                            <Form.Control type="text" placeholder="Enter username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                                            
                                        </Form.Group>}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            
                                            <Form.Control type="email" placeholder="Enter email" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                                            
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            
                                            <Form.Control type="password" placeholder="Enter your password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} />
                                            
                                        </Form.Group>
                                    </Form>

                                    { registerform ?
                                        <div onClick={handleRegister} className='d-flex align-items-center flex-column '>
                                            <button className='btn btn-warning rounded mb-3'>
                                              Register
                                            </button> 
                                          <p className='text-danger'>Already a user? Click here to <Link  style={{textDecoration:"none", color:"black"}} to={'/login'}>login</Link></p>

                                        </div>:
                                         <div onClick={handleLogin} className='d-flex align-items-center flex-column '>
                                         <button className='btn btn-warning rounded mb-3'>
                                           login
                                         </button>
                                       <p className='text-danger'>Already have an Acoount? Click here to <Link style={{textDecoration:"none", color:"black"}} to={'/register'}>register</Link></p>

                                     </div>

                                    }

                                </div>
                            </div>
                        </div>

                    </Row>
                </div>
            </div>
            {/* toastify */}
            <ToastContainer autoClose={2000} theme='colored' position='top-center' />
        </div>
    )
}

export default Auth