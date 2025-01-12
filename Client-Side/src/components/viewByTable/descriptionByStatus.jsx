import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import DescriptionView from '../descriptionView/descriptionView';
import { Form } from 'react-bootstrap';

const DescriptionByStatus = () => {
    const token = Cookies.get('token');
    const [list, setList] = useState();
    const viewId = Cookies.get('viewID');

    useEffect(()=>{
        fetchDescription();
    }, [token, viewId])

    const fetchDescription = async () => {
        try {
          const { data } = await axios.get('http://localhost:4000/services/objects/TestCases', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const grouped = data.reduce((acc, item) => {
            if (!acc[item.status]) {
              acc[item.status] = [];
            }
            acc[item.status].push(item);
            return acc;
          }, {});
          setList(grouped);
          console.log(grouped);
        } catch (error) {
          console.error('Error fetching descriptions:', error);
        }
      };

  return (
    <Grid item xs={11} style={{
                display: 'flex',
                flexDirection: 'column',
                height: '75vh',
                overflowY: 'auto',
                position: 'relative',
                right: 0,
              }} className="main-content">
    
    <div style={{display:'flex', overflowY:'hidden'}}>
       
            {
                
              list &&  Object.keys(list).map((element, index)=>(
                    <div key={index}  style={{
                        display:'flex',
                        flexDirection:'column',
                        minWidth:'350px',
                        width:'350px',
                        padding:'10px',
                        borderRadius:'5px',
                        backgroundColor:'#f6f8fa',
                        margin:'10px',
                        border:'1px solid #d1d9e0',
                        position:'relative'
                        
                        
                    }}>
                            <div style={{
                              paddingLeft:'10px',
                              display:'flex'
                            }}>
                               <p style={{fontWeight:'700'}}>{element == 'null' ?   'No TicketId' : element}</p>
                               <p style={{paddingLeft:'10px'}}>{list[element].length}</p>
                              </div>
                              <div style={{
                                overflowX:'hidden'
                              }}>

                              { list[element].map((ele, index)=>(
                                    <div key={index}
                                    style={{
                                        borderRadius:'5px',
                                        margin:'5px',
                                        padding:'10px',
                                        boxShadow: '1px 1px 1px 1px rgba(140, 149, 159, 0.15)',
                                        border: '1px solid rgba(140, 149, 159, 0.15)',
                                        backgroundColor:'white',
                                        display:'flex',
                                        flexWrap:'wrap'
                                    }}
                                    ><DescriptionView item={ele} /></div>
                                ))
                            }
                                </div>

                            
                    </div>
                ))
            }
        
    </div>
    </Grid>
    
  )
}

export default DescriptionByStatus;