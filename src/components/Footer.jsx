import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <div style={{ width: "100%", height: "auto", backgroundColor: "purple" }} className='d-flex justify-content-center align-items-center flex-column'>
      <div className="footer container py-4">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <h4 className='text-light'>
              <i className="fa-brands fa-stack-overflow me-3"></i>
              Project Fair
            </h4>
            <p style={{ textAlign: 'justify' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam autem tenetur dolorum voluptas ipsam doloribus a exercitationem maxime, id dicta suscipit veniam perferendis est, eius ab, minima sint amet?
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-2 mb-4">
            <h4 className='mb-4 text-light'>Links</h4>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home page</Link>
            <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login page</Link>
            <Link to='/register' style={{ textDecoration: 'none', color: 'white' }}>Registration</Link>
          </div>
          <div className="col-12 col-md-6 col-lg-2 mb-4">
            <h4 className='mb-4 text-light'>Guides</h4>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>React</Link>
            <Link to='https://react-bootstrap.netlify.app/' style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</Link>
            <Link to='https://bootswatch.com/' style={{ textDecoration: 'none', color: 'white' }}>Bootswatch</Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <h4 className='mb-3 text-light'>Contacts</h4>
            <div className='d-flex mb-4'>
              <input type="text" className='form-control' placeholder='Enter your email ID' />
              <button className='btn btn-danger text-white ms-2'>Subscribe</button>
            </div>
            <div className='icons d-flex justify-content-evenly'>
              <Link to='https://bootswatch.com/' style={{ textDecoration: 'none', color: 'white' }}>
                <i className="fa-brands fa-instagram fa-2x"></i>
              </Link>
              <Link to='https://bootswatch.com/' style={{ textDecoration: 'none', color: 'white' }}>
                <i className="fa-brands fa-linkedin fa-2x"></i>
              </Link>
              <Link to='https://bootswatch.com/' style={{ textDecoration: 'none', color: 'white' }}>
                <i className="fa-brands fa-bootstrap fa-2x"></i>
              </Link>
              <Link to='https://bootswatch.com/' style={{ textDecoration: 'none', color: 'white' }}>
                <i className="fa-brands fa-facebook fa-2x"></i>
              </Link>
            </div>
          </div>
        </div>
        <p className='mt-5 text-light'>Copyright @ 2024 Project Fair. Built with React.</p>
      </div>
    </div>
  );
}

export default Footer;
