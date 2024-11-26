// Main.js

import { Grid, TableBody, TableRow, TableCell, TableContainer, Table } from '@mui/material';
import TableHeader from './TableHeader';
import DescriptionTable from './descriptionTable';
import {  useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import '../../../src/App.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
  const [description, setDescription] = useState({});
  const [descrip, setDescrip] = useState("");
  const [filter, setFilter] = useState("");
  const [ungroup, setUnGroup] = useState();
  const inputRef = useRef({});
  const navigate = useNavigate();
  const location = useLocation();
  const [listDes, setListDes] = useState(false);
  const token = sessionStorage.getItem('token');
  const project = sessionStorage.getItem('project');
  const lastedit = sessionStorage.getItem("user");


  const fetchDescription = useCallback(async () => {
    if(filter) return;
    try {
      const response = await axios.get('http://localhost:4000/services/objects/TestCases', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched Descriptions:', response.data);
      const datas = response.data;
      console.log(datas[0].project)

      const filterData = datas.filter((testcase) => {
        return  testcase.project == project; // Add the check here
      });
      
     setUnGroup(filterData);
     if (filterData.length > 0) {
      const groupedData = Object.groupBy(filterData, ({ issueid }) => issueid);
      console.log('Grouped Descriptions:', groupedData);
      setDescription(groupedData); // Set grouped data
    } else {
      setDescription(filterData); // If no grouping is needed, set ungrouped data
    }
    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }
  },[filter,token]);


  const handleInputChange = (e) => {
    setDescrip(e.target.value);
  };

  const createDescription = async (issueid, filter) => {
    try {
      const response = await axios.post('http://localhost:4000/services/objects/TestCases',
        { description: descrip, issueid: issueid ? issueid : parseInt(filter) , project:`${project}`, lastedit:lastedit},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Created Description:', response.data);
      setDescrip('');
      await fetchDescription();
      if(filter){
        await fetchDescripByFilter();
      }
    } catch (error) {
      console.error('Error creating description:', error);
    }
  };

  const handleKeyDown = async (event, issueid, input) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await createDescription(issueid, filter);
      if (inputRef.current[input]) {
        inputRef.current[input].value = '';
        inputRef.current[input].focus();
      }
    }
  };

 
  

  const fetchDescripByFilter = useCallback(async () => {
    if(!filter) return;
    try {
      const query =`http://localhost:4000/services/query?q=select id, description, assignee, status, issueid from TestCases where issueid::text like '%25${filter}%25' and project = '${project}' order by id`;
      const response = await axios.get( query,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      const groupedData = Object.groupBy(response.data.record, ({ issueid }) => issueid);
      console.log('Grouped Descriptions2:', groupedData);
      setDescription(groupedData);
      
    } catch (error) {
      console.error(error);
    }
  },[token, filter]);

  useEffect(() => {
    if (!token) return;
  
    if (filter) {
      fetchDescripByFilter();
    } else {
      fetchDescription();
    }
  }, [filter,token, fetchDescription, fetchDescripByFilter]);

  useEffect(() => {
    if (filter === "" || filter === null) {
      navigate(`/auth/${project}/testcases`);  // Navigate only if filter is null or empty
    } else {
      navigate(`/auth/${project}/testcases/?filterQuery=${filter}`);
    }
  }, [filter, navigate, project]);  // Make sure the navigate and project are part of the dependency array
  

  return (
    <div className='grid-container'>
      <Grid container>
        <Grid item xs={2} className='sidebar'>
          <TableBody>
            {description &&
              Object.keys(description).map((element, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell onClick={() => setFilter(element) } className="table-cell">{element}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Grid>
        <Grid item xs={10} style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 50px)', 
              overflowY: 'auto',
              position: 'fixed',
              right: 0,
              width: '90%', 
            }} className="main-content">
          {/* Input Field */}
          <div style={{display:'block'}}>
          <input
           className="input-field"
           placeholder='enter ticketid'
            onChange={(e) => {
              e.preventDefault();
              setFilter(e.target.value);
            }}
            
          />
          </div>
          

          {/* Table Container */}
          <TableContainer
             className="table-container" 
          >
            <Table size='small' >
              <TableHeader  />
              <DescriptionTable
                description={description}
                descrip={descrip}
                handleKeyDown={handleKeyDown}
                handleInputChange={handleInputChange}
                inputRef={inputRef}
                fetchDescription={fetchDescription}
                filter={filter}
                fetchDescripByFilter={fetchDescripByFilter}
              />
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Main;
