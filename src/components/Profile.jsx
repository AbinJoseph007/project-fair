import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../services/allAPI';


function Profile() {
  const [open, setOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    Profile: ""
  })

  const [isUpdate , setIsUpdate] =useState(false)

  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))

    setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin, Profile: "" })

    setExistingImage(user.Profile)

  }, [isUpdate])

  useEffect(() => {
    if (userProfile.Profile) {
      setPreview(URL.createObjectURL(userProfile.Profile))

    }
    else {
      setPreview("")
    }
  }, [userProfile.Profile])

  const handleProfileUpdate = async () => {
    const { username, email, password, github, linkedin, Profile } = userProfile
    if (!github || !linkedin) {
      toast.info("please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profile", Profile) : reqBody.append("profile", existingImage)
    
    const token = sessionStorage.getItem("token")

    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody, reqHeader)
      console.log(result);
      if (result.status === 200) {
        toast.success('profile updated successfully')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
       setIsUpdate(true)

      }
      else {
        console.log(result.response.data);
      }
    }
    else {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody, reqHeader)

      if (result.status === 200) {
        toast.success('profile updated successfully')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
      
      setIsUpdate(true)
      }
      else {
        console.log(result.response.data);
      }
    }
  }
}


  return (
    <div className='card shadow p-5'>
      <div className='d-flex justify-content-between'>
        <h5>Profile</h5>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row justify-content-center mt-4'>
          <label htmlFor="profile" className=''>
            <input id='profile' type="file" style={{ display: "none" }} onChange={(e) => setUserProfile({ ...userProfile, Profile: e.target.files[0] })} />
            {existingImage == "" ? <img src={preview ? preview : "https://images.ctfassets.net/vztl6s0hp3ro/2Zg9Mth4qC5EGGWHoJIy9T/3f0dbdf8884231a3e9e7998c514cc1fa/Unleash-employee-potential-with-personal-professional-development-examples.jpg"} alt="no image" width={'200px'} height={'200px'} className='rounded-circle' /> : <img src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="no image" width={'200px'} height={'200px'} className='rounded-circle' />}
          </label>
          <div className="mb-3 mt-3">
            <input type="text" placeholder='Git-hub' className='form-control' value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />
          </div>
          <div className="mb-3 mt-2">
            <input type="text" placeholder='LinkedIn' className='form-control' value={userProfile.linkedin} onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })} />
          </div>
          <div className="mb-3 mt-2">
            <button onClick={handleProfileUpdate} className='btn btn-success rounded w-100'>update</button>
          </div>

        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />

    </div>
  )
}



export default Profile