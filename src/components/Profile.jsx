import React from 'react'
import abin from '../images/abin.jpg'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
    const [open, setOpen] = useState(false);

  return (
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
          <h5>Profile</h5>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
        </div>
       <Collapse  in={open}>
            <div className='row justify-content-center mt-4'>
                <label htmlFor="profile" className=''>
                    <input id='profile' type="file" style={{display:"none"}} />
                    <img src={abin} alt="no image"  width={'200px'} height={'200px'} className='rounded-circle'/>
                </label>
                <div className="mb-3 mt-3">
                    <input type="text" placeholder='Git-hub' className='form-control' />
                </div>
                <div className="mb-3 mt-2">
                    <input type="text" placeholder='LinkedIn' className='form-control' />
                </div>
                <div className="mb-3 mt-2">
                  <button className='btn btn-success rounded w-100'>update</button>
                </div>
    
            </div>
       </Collapse>
    </div>
  )
}



export default Profile