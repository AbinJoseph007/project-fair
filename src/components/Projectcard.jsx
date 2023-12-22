import React from 'react'
import Card from 'react-bootstrap/Card';
import video from '../images/mediaplayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function Projectcard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className='btn shadow' onClick={handleShow}>
                <Card.Img  variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:video}/>
                <Card.Body>
                    <Card.Title className='text-center'>{project.title}</Card.Title>

                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ height: "150px" }}>
                        <Col md={6}>
                            <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:video} width={'100%'} alt="" />
                        </Col>
                        <Col md={6}>
                            <h4>Description</h4>
                            <p>{project.overview}</p>
                            <p className='fw-bolder'>Technologies <span>:{project.language}</span></p>
                        </Col>
                    </Row>
                    <div className='d-flex'>
                        <a style={{ color: "red" }} href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5"></i></a>
                        <a style={{ color: "red" }} href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>
                    </div>
                </Modal.Body>
            </Modal>

        </>


    )
}

export default Projectcard