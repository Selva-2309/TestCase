import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from '../contextFile';


const DropdownAssignee = ({ item}) => {
 
  const {users, updateStatus} = useContext(UserContext);


  return (
    <Dropdown style={{ display: 'flex', width: '100%', justifyContent:'space-between' }}>
                      <Dropdown.Toggle variant='' title={item.assignee} key={item.id}>
                        {item.assignee}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{height:"250px", overflowY:'scroll'}}>
                        { users && users.map((element, index) => (
                          <Dropdown.Item key={index} >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={item.assignee === element.name}
                                  onClick={() => {updateStatus(element.name, item.id);  console.log(item)}}
                                />
                              }
                              label={element.name}
                            />
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
  )
}

export default DropdownAssignee;