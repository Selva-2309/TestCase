import React, {useEffect, useRef, useState } from 'react'
import axios from 'axios';
const EditDescription =  ({description, id,fetchDescription, setFlag, token})=>{
    
    const [editDes, setEditDes] =useState(description);
    const ref = useRef(null)

 const updateDescription = async (input, id)=>{
        try {
            
            const response = await axios.put(`http://localhost:4000/services/objects/TestCases/${id}`,
                {description:input}, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            
            
            if(fetchDescription){
                await fetchDescription();
            }
            
            setFlag({flag:false, id:''});
            
          } catch (error) {
            console.error('Error update descriptions:', error);
          }
    };
  

    const getUpdateDes =  (e) =>{
      setEditDes(e.target.value);
    }
    const handleEnterKey =  (event)=>{
      if(event.key === 'Enter'){
        event.preventDefault();
        updateDescription(editDes,id);
       
      }
    }
    useEffect(()=>{
      const clickOutside =(event)=>{
        if(ref.current && !ref.current.contains(event.target)){
          updateDescription(editDes, id);
        }
      }
      document.addEventListener('mousedown', clickOutside);
    
      // Cleanup listener on component unmount
      return () => {
        document.removeEventListener('mousedown', clickOutside);
      };
    },[editDes, id, updateDescription])
       
   
    return(
      <>
      <input ref={ref} style={{ width: '100%', border: 'none', boxSizing: 'border-box', outline: 'none', fontSize:'19px' }}
       value={editDes} onChange={getUpdateDes} onKeyDown={handleEnterKey}></input>
      </>
    )
  };

export default EditDescription;