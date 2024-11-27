import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const CreateProject = ({ show, setShow, fetchProjects }) => {

    const [project, setProject] = useState();
    const token = Cookies.get('token');

    const handleClose = (e) => {
        setShow(false);
    };

    const CreateProject = async () => {
        try {
            const { data } = await axios.post('http://localhost:4000/services/objects/Project'
                , {
                    name: project
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data);
            setProject('');
            setShow(false);
            fetchProjects();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ marginTop: '100px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Enter Project Name</label>
                            <input type='text' onChange={(e) => { setProject(e.target.value) }} 
                                style={{
                                    width: '100%', padding: '12px 20px',
                                    margin: '8px 0',
                                    display: 'inline-block',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}>
                            
                            </input>
                        </div>
                        <br />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '5px' }}>
                            <Button variant="light" style={{ color: "red", border: "1px solid red" }} onClick={() => { setProject(""); setShow(false) }} >
                                Cancel
                            </Button>
                            <Button variant="success" onClick={CreateProject}>
                                Save
                            </Button>
                        </div>
                    </div>



                </Modal.Body>



            </Modal>
        </>
    )
}

export default CreateProject;