import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import abinj from '../images/abin.jpg'
import { addProjectAPI } from '../services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Addproject() {
    //    to hold the value of the image url
    const [preview, setPreview] = useState("")


    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    const [show, setShow] = useState(false);

    // state to hold the token
    const [token, setToken] = useState("")

    const handleClose = () => {
        setShow(false);
        handleClose1()
    }
    const handleShow = () => setShow(true);

    console.log(projectDetails);

    const handleClose1 = () => {
        setProjectDetails({
            title: "",
            language: "",
            github: "",
            website: "",
            overview: "",
            projectImage: ""
        })
    }
    useEffect(() => {
        if (projectDetails.projectImage) { (setPreview(URL.createObjectURL(projectDetails.projectImage))) }
        else {
            setPreview("")
        }
    }, [projectDetails.projectImage])

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])

    console.log(preview);

    //  ad project
    const handleAdd = async (e) => {
        e.preventDefault()

        const { title, language, github, website, overview, projectImage } = projectDetails

        if (!title || !language || !github || !website || !overview || !projectImage) {
            alert("please fill the form")
        }
        else {
            // reqbody
            ///create object for form data
            const reqBody = new FormData()
            //add data to form data - append()
            reqBody.append("title", title)
            reqBody.append("language", language)

            reqBody.append("github", github)

            reqBody.append("website", website)

            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await addProjectAPI(reqBody, reqHeader)
                console.log(result);
                if(result.status === 200){
                    console.log(result.data);
                    toast.success('project added successfully')
                    handleClose()
                }
                else{
                    console.log(result.response.data);
                }
            }
        }
    }
    return (
        <>
            <div className='ms-auto'>
                <Button variant="success" onClick={handleShow}>
                    Add project
    
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="imagess" className=''>
                                <input id='imagess' type="file" style={{ display: "none" }} onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : { abinj }} alt="no image" width={'100%'} />
                            </label>
                        </Col>
                        <Col md={6}>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='project title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='project language' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='project github Link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='project website Link' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <textarea type="text" className='form-control' placeholder='project Overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
                            </div>

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAdd} >Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer autoClose={2000} theme='colored' position='top-center' />

            </>
    )
}

export default Addproject
