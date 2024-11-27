import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import DescriptionView from '../descriptionView/descriptionView';

const DescriptionByStatus = () => {
    const token = Cookies.get('token');
    const [list, setList] = useState();

    useEffect(()=>{
        fetchDescription();
    }, [token])

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
    <div style={{display:'flex', overflowY:'hidden'}}>
       
            {
                
              list &&  Object.keys(list).map((element, index)=>(
                    <div key={index}  style={{
                        display:'flex',
                        flexDirection:'column',
                        minWidth:'350px',
                        width:'450px',
                        padding:'10px',
                        borderRadius:'5px',
                        backgroundColor:'#f6f8fa',
                        margin:'10px',
                        border:'1px solid #d1d9e0',
                        position:'relative',
                        overflowX:'hidden',
                        height:'70vw'
                        
                    }}>
                            <div>
                            <p style={{fontSize:'400'}}>{element}</p>
                              </div>
                              <div >

                              { list[element].map((ele, index)=>(
                                    <div key={index}
                                    style={{
                                        borderRadius:'5px',
                                        margin:'5px',
                                        padding:'10px',
                                        boxShadow: '2px 2px 2px 2px rgba(140, 149, 159, 0.15)))',
                                        border: '1px solid rgba(140, 149, 159, 0.15)))',
                                        backgroundColor:'white'
                                    }}
                                    ><DescriptionView item={ele} /></div>
                                ))
                            }
                                </div>

                            
                    </div>
                ))
            }
        
    </div>
  )
}

export default DescriptionByStatus;