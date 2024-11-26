import React, { useContext, useEffect, useState } from 'react';

import { TableBody, TableRow, TableCell, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DescriptionInput from './descriptionInput';
import EditDescription from './editDescription';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DescriptionView from '../descriptionView/descriptionView';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DropdownStatus from '../dropDowns/DropdownStatus';
import DropdownAssignee from '../dropDowns/DropdownAssignee';
import Cookies from 'js-cookie';


const DescriptionTable = ({ description, descrip, handleKeyDown, handleInputChange, inputRef, fetchDescription, filter, fetchDescripByFilter }) => {
  const token = Cookies.get('token');
  const [user, setUser] = useState([]);
  const [flag, setFlag] = useState({ flag: false, id: '' });
  const [click, setClick] = useState({});
  const [horiz, setHoriz] = useState();
  const lastedit = sessionStorage.getItem("user");

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const updateStatus = async (input, id, checked) => {
    try {
      const payload = input === 'Pass' || input === 'Fail' || input === 'Hold' || input === 'Deferred' ? { status: input } : { assignee: input };
      await axios.put(`http://localhost:4000/services/objects/TestCases/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (filter) {
        await fetchDescripByFilter();
      }
      await fetchDescription();


    } catch (error) {
      console.error('Error updating descriptions:', error);
    }
  };

  const updateDescription = async (payload, id) => {
    try {
      payload.lastedit = lastedit;
      const response = await axios.put(`http://localhost:4000/services/objects/TestCases/${id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });


      if (fetchDescription) {
        await fetchDescription();
      }
      if (filter) {
        await fetchDescripByFilter();
      }

      setFlag({ flag: false, id: "" });

    } catch (error) {
      console.error('Error update descriptions:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/services/objects/User", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTestCase = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/services/objects/TestCases/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (fetchDescription) {
        await fetchDescription();
      }
      if (filter) {
        await fetchDescripByFilter();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const doubleClick = (id) => {
    setFlag({ flag: true, id });
  };

  const handleClick = (groupIndex) => {
    setClick((prevState) => ({
      ...prevState,
      [groupIndex]: !prevState[groupIndex]
    }));
  };



  return (
    <TableBody>
      {description && Object.values(description).length > 0 ? (Object.values(description).map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <TableRow>
            <TableCell colSpan={4} style={{ padding: 0 }}>
              <Typography style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', paddingLeft: '5px', paddingTop: '5px' }}>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => handleClick(groupIndex)}
                >
                  {!click[groupIndex] ? <KeyboardArrowUpIcon style={{ outline: 'none' }} /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {group.length > 0 ? (group[0].issueid == null ? "General" : group[0].issueid) : `${filter}`}


                <Dropdown>
                  <Dropdown.Toggle variant='' className='toggledropdown' style={{ background: 'none' }}><MoreHorizIcon /></Dropdown.Toggle>  {/* ... symbol component*/}
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { deleteTestCase(group[0].issueid) }}><DeleteIcon />Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Typography>
            </TableCell>
          </TableRow>
          {!click[groupIndex] ?
            <>
              {group.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align='left' >
                    <div style={{ display: 'flex', flexDirection:'row' }}>
                    <Dropdown>
                      <Dropdown.Toggle variant='' key={item.id} ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item ><VisibilityIcon />View</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteTestCase(item.id)}><DeleteIcon />Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div style={{alignContent:"space-around"}}>{item.issueid}</div>
                    </div>
                  </TableCell>
                  <TableCell align="left" onDoubleClick={() => doubleClick(item.id)} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'revert', width: '100px' }}>
                    <div>
                    {flag.flag && flag.id === item.id
                      ? <EditDescription
                        description={item.description}
                        id={item.id}
                        fetchDescription={fetchDescription}
                        setFlag={setFlag}
                        filter={filter}
                        fetchDescripByFilter={fetchDescripByFilter}
                        updateDescription={updateDescription}

                      />
                      : <DescriptionView user={user} item={item} updateDescription={updateDescription} updateStatus={updateStatus} />}
                    </div>
                  </TableCell> {/* Description column */}

                  <TableCell align="left">
                    {<DropdownAssignee user={user} item={item} updateStatus={updateStatus} />}
                  </TableCell> {/* Assignee column */}
                  
                  <TableCell align="left">
                    {<DropdownStatus item={item} updateStatus={updateStatus} />}
                  </TableCell> {/* Status column */}
                </TableRow>

              ))}

              <DescriptionInput
                descrip={descrip}
                inputRef={inputRef}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                issueid={group}
                groupIndex={groupIndex}
              /> </>
            : (
              <DescriptionInput
                descrip={descrip}
                inputRef={inputRef}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                issueid={filter}
                groupIndex={groupIndex}
              />
            )}
          <TableRow>
            <TableCell colSpan={4} style={{ backgroundColor: 'green', opacity: '0.5' }} />
          </TableRow>
        </React.Fragment>
      ))) : (
        <DescriptionInput
          descrip={descrip}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          issueid={filter}
        />
      )}
    </TableBody>
  );
};

export default DescriptionTable;
