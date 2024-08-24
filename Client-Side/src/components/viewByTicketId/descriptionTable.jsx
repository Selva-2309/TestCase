import React, { useContext, useEffect, useState } from 'react';
import { TableBody, TableRow, TableCell, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DescriptionInput from './descriptionInput';
import { userContext } from './App';
import EditDescription from './editDescription';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';

const DescriptionTable = ({ description, descrip, handleKeyDown, handleInputChange, inputRef, fetchDescription }) => {
  const { token } = useContext(userContext);
  const [user, setUser] = useState([]);
  const [flag, setFlag] = useState({ flag: false, id: '' });
  const [click, setClick] = useState({});

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const updateStatus = async (input, id, checked) => {
    try {
      const payload = input === 'Pass' || input === 'Fail' ? { status: input } : { assignee: input };
      await axios.put(`http://localhost:4000/services/objects/TestCases/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (fetchDescription) {
        await fetchDescription();
      }

      
    } catch (error) {
      console.error('Error updating descriptions:', error);
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
      {description && Object.values(description).map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <TableRow>
            <TableCell colSpan={4} style={{ padding: 0 }}>
              <Typography style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', paddingLeft: '5px', paddingTop: '5px' }}>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => handleClick(groupIndex)}
                >
                  {!click[groupIndex] ? <KeyboardArrowUpIcon style={{outline:'none'}} /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {group[0].issueid == null ? "General" : group[0].issueid}
              </Typography>
            </TableCell>
          </TableRow>
          { !click[groupIndex] ?
          <>
            { group.map((item, index) => (
                <TableRow>
                  <TableCell align='left' >{item.issueid}</TableCell>
                  <TableCell align="left" onDoubleClick={() => doubleClick(item.id)} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}>
                    {flag.flag && flag.id === item.id
                      ? <EditDescription
                        description={item.description}
                        id={item.id}
                        fetchDescription={fetchDescription}
                        setFlag={setFlag}
                        token={token}
                      />
                      : item.description}
                  </TableCell> {/* Description column */}
                  <TableCell align="left">
                    <Dropdown style={{ display: 'flex', width: '100%' }}>
                      <Dropdown.Toggle variant='' title={item.assignee} key={item.id}>
                        {item.assignee}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {user.map((element) => (
                          <Dropdown.Item key={element.id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={item.assignee === element.name}
                                  onClick={() => updateStatus(element.name, item.id)}
                                />
                              }
                              label={element.name}
                            />
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </TableCell> {/* Assignee column */}
                  <TableCell align="left">
                    <Dropdown style={{ display: 'flex', width: '100%' }}>
                      <Dropdown.Toggle variant='' title={item.status} key={item.id}>
                        {item.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => updateStatus('Pass', item.id, true)}>Pass</Dropdown.Item>
                        <Dropdown.Item  onClick={() => updateStatus('Fail', item.id, true) }><DoneIcon />
                        Fail</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </TableCell> {/* Status column */}
                </TableRow>
              
          ))}
          
          <DescriptionInput
            descrip={descrip}
            inputRef={inputRef}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            group={group}
            groupIndex={groupIndex}
          /> </>
          : null}
          <TableRow>
            <TableCell colSpan={4} style={{ backgroundColor: 'green', opacity: '0.5' }} />
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default DescriptionTable;
