import React, { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import '../../../src/App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = ({ ProfileDetails,fetchUsers }) => {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState(ProfileDetails);
    const token = Cookies.get('token');
    {console.log(details)}

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageUpload  = (e)=>{
        const file = e.target.files[0]

        if(file){
            const readFile = new FileReader();
           readFile.onloadend =()=>{
                setDetails((prev)=>(
                    {...prev, picture: readFile.result}
                ) );
            }
            readFile.readAsDataURL(file);
           

        }
    }

    const UpdateUserDetails  = async () => {
        try {
            const {data} = await axios.put(`http://localhost:4000/services/objects/User/${ProfileDetails.id}`,
               details,
                {
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                }
            );
            console.log(data);
            fetchUsers(); // Fetch users after update
            setShow(false); // Close modal after update
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h4 onClick={handleShow}>
                Your Profile
            </h4>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header  >

                    <div style={{  display: 'flex', flexDirection: 'row',  gap: '20px'  }}>
                        <Image
                            src={ProfileDetails?.picture}
                            roundedCircle
                            width="120"
                            height="120"

                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end'  }}>
                            <h6>{ProfileDetails.name}</h6>
                            <p>{`${ProfileDetails.firstname ?ProfileDetails.firstname :'' } ${ProfileDetails.lastname ? ProfileDetails.lastname : ''}`}</p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Form.Group className='profile-head'>
                            <Form.Label style={{ flexBasis: '23%' }}>Name</Form.Label>
                          
                           <div style={{flexGrow:'1'}}>
                           <div style={{ display:'flex', flexDirection:'row', gap:'10px'}}>
                            <Form.Control type="text"  value={ details.firstname  } onChange={(e)=>{setDetails((prev)=>({...prev, firstname:e.target.value}))}}/>
                           <Form.Control type="text" value={ details.lastname} onChange={(e)=>{setDetails((prev)=>({...prev, lastname:e.target.value}))}} />
                           </div>
                           </div>
                           
                        </Form.Group>


                        <Form.Group className='profile-head'>
                            <Form.Label style={{flexBasis:'30%'}}>Email address</Form.Label>
                            <Form.Control type="email" value={ProfileDetails.email} style={{ flexGrow: 1 }} disabled/>
                        </Form.Group>

                        <Form.Group className='profile-head'>
                            <Form.Label style={{flexBasis:'30%'}}>Username</Form.Label>

                            <Form.Control type="text" value={ProfileDetails.name} style={{ flexGrow: 1 }} disabled />

                        </Form.Group>

                        <Form.Group className='profile-head'>
                            <Form.Label style={{flexBasis:'30%'}}>Profile photo</Form.Label>
                            <div style={{flexGrow:'1',display:'flex', gap:'4px'}}>
                                <Image
                                    src={!details?.picture ?  ProfileDetails.picture : details.picture}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                               <Form.Control type='file' onChange={handleImageUpload}/>
                               
                            </div>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" style={{ color: "red", border: "1px solid red" }} onClick={() => { setShow(false) }} >
                        Cancel
                    </Button>
                    <Button variant="success"  onClick={UpdateUserDetails}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Profile;
