import React, {useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';

const EditDescription =  ({description, id,updateDescription})=>{
    
    const [editDes, setEditDes] =useState(description);
    const ref = useRef(null)
    const token = sessionStorage.getItem('token');

 
  

    const getUpdateDes =  (e) =>{
      setEditDes(e.target.value);
    }
    const handleEnterKey =  (event)=>{
      if(event.key === 'Enter'){
        event.preventDefault();
        updateDescription({description:editDes}, id);
       
      }
    }



    useEffect(()=>{
      const clickOutside =(event)=>{
        if(ref.current && !ref.current.contains(event.target)){
          updateDescription({description:editDes}, id);
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
       value={editDes} onChange={getUpdateDes} onKeyDown={handleEnterKey} type='image/text' ></input>
      </>
    )
  };

export default EditDescription;