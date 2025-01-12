// Main.js

import { Grid, TableBody, TableRow, TableCell, TableContainer, Table, Paper } from '@mui/material';
import TableHeader from './TableHeader';
import DescriptionTable from './descriptionTable';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import '../../../src/App.css'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Tab, Tabs } from 'react-bootstrap';

const Main = ({status}) => {
  const [description, setDescription] = useState({});
  const [descrip, setDescrip] = useState("");
  const [filter, setFilter] = useState("");
  const [ungroup, setUnGroup] = useState();
  const inputRef = useRef({});
  const navigate = useNavigate();
  const location = useLocation();
  const [listDes, setListDes] = useState(false);
  const token = Cookies.get('token');
  const { project } = useParams();
  const lastedit = Cookies.get("user");
  const viewID = Cookies.get('viewID');
  const [Status, setStatus] = useState(status);
  const [listByAssignee, setList] =  useState({});
 

  const fetchDescription = useCallback(async () => {
    if (filter) return;
    try {
      const response = await axios.get('http://localhost:4000/services/objects/TestCases', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const datas = response.data;

      const filterData = datas.filter((testcase) => {
        return testcase.project == project; // Add the check here
      });

      setUnGroup(filterData);
      if (filterData.length > 0) {
        const groupedData = Object.groupBy(filterData, ({ issueid }) => issueid);
        setDescription(groupedData); // Set grouped data
        console.log(description)
        const groupByAssignee = Object.groupBy(filterData, ({assignee}) => assignee);
        setList(groupByAssignee);
        console.log(groupByAssignee);
      } else {
        setDescription(filterData); // If no grouping is needed, set ungrouped data
      }
    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }
  }, [filter, token, project]);


  const handleInputChange = (e) => {
    setDescrip(e.target.value);
  };

  const createDescription = async (issueid, filter) => {
    try {
      const response = await axios.post('http://localhost:4000/services/objects/TestCases',
        { description: descrip, issueid: issueid ? issueid : parseInt(filter), project: `${project}`, lastedit: lastedit, createdby: lastedit },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setDescrip('');
      await fetchDescription();
      if (filter) {
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


  const fetchDescriptionByClick = useCallback(async ({name, id})=>{
    if(!token){
      navigate('/auth/login');
    }
      try{
        const response = await axios.get(`http://localhost:4000/services/query?q=select id, description, assignee, status, issueid,details from TestCases where ${name} ='${id}' and project = '${project}' order by id`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const groupedData = Object.groupBy(response.data.record, ({ issueid }) => issueid);
        setDescription(groupedData);
  
        const groupByAssignee = Object.groupBy(response.data.record, ({assignee}) => assignee);
        setList(groupByAssignee);
      }catch(error){
        console.log(error);
      }
    
  })

  const fetchDescripByFilter = useCallback(async () => {
    if (!filter) return;
    try {
      
      const query = `http://localhost:4000/services/query?q=select id, description, assignee, status, issueid from TestCases where issueid::text like '%25${filter}%25' and project = '${project}' order by id`;
      const response = await axios.get(query,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const groupedData = Object.groupBy(response.data.record, ({ issueid }) => issueid);
      setDescription(groupedData);

      const groupByAssignee = Object.groupBy(response.data.record, ({assignee}) => assignee);
      setList(groupByAssignee);

    } catch (error) {
      console.error(error);
    }
  }, [token, filter]);



  useEffect(() => {
    if (!token) return;

    if (filter) {
      console.log('filter'+filter)
      fetchDescripByFilter();
    } else {
      fetchDescription();
    }
  }, [filter, token, fetchDescription, fetchDescripByFilter]);


  useEffect(() => {
    if (filter === "" || filter === null) {
      navigate(`/auth/${project}/testcases/view/${viewID}`); // Navigate only if filter is null or empty
    } else {
      navigate(`/auth/${project}/testcases/view/${viewID}/?filterQuery=${filter}`);
    }
  }, [filter, project]);  // Make sure the navigate and project are part of the dependency array


  return (
    <div className='grid-container'>
      <Grid>
        <Grid container>
          <Grid item xs={1.5} sx={{ padding: '0' }}>
            <Dropdown>
              <DropdownToggle variant='' title={Status}>
                {Status}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={()=>{setStatus('issueId')}}>IssueId</DropdownItem>
                <DropdownItem onClick={()=>{setStatus('assignee')}}>Assignee</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {
              Status && Status === 'issueId' ?
              (
                <ul style={{ padding: '3px', margin: '0' }}>
              
              {description &&
                Object.keys(description).map((element, index) => (

                  <li key={index} onClick={() => fetchDescriptionByClick({name:'issueId', id:element})}
                    style={{ listStyleType: "none", padding: "5px", width: "100%" }} className='list-issueid' >
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%', borderBottom: '1px solid #ccc' }}>
                      <p style={{ flexGrow: 1 }}>{element}</p>
                      <p>{description[element].length}</p>
                    </div>
                  </li>

                ))}
            </ul>
              ) : (
                <ul style={{ padding: '3px', margin: '0' }}>
              
              {listByAssignee &&
                Object.keys(listByAssignee).map((element, index) => (

                  <li key={index} onClick={() => fetchDescriptionByClick({name:'assignee', id:element})}
                    style={{ listStyleType: "none", padding: "5px", width: "100%" }} className='list-issueid' >
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%', borderBottom: '1px solid #ccc' }}>
                      <p style={{ flexGrow: 1 }}>{element}</p>
                      <p>{listByAssignee[element].length}</p>
                    </div>
                  </li>

                ))}
            </ul>
              )
            }
          </Grid>
          <Grid item xs={10.5} style={{
            display: 'flex',
            flexDirection: 'column',
            height: '75vh',
            overflowY: 'auto',
            position: 'relative',
            right: 0,
          }} className="main-content">
            {/* Input Field */}
            <div style={{ display: 'block' }}>
              <Form.Group style={{ margin: '10px' }}>
                <Form.Control
                  className="input-field"
                  placeholder='enter ticketid'
                  onChange={(e) => {
                    e.preventDefault();
                    setFilter(e.target.value);
                  }}

                />
              </Form.Group>
            </div>
            {/* Table Container */}
            <TableContainer
              component={Paper}
            >
              <Table size='small' >
                <TableHeader />
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

      </Grid>

    </div>
  );
}

export default Main;
