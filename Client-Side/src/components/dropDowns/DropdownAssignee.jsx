import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DropdownAssignee = ({user, item, updateStatus}) => {
  return (
    <Dropdown style={{ display: 'flex', width: '100%' }}>
                      <Dropdown.Toggle variant='' title={item.assignee} key={item.id}>
                        {item.assignee}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{height:"250px", overflowY:'scroll'}}>
                        {user.map((element) => (
                          <Dropdown.Item key={element.id} >
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
  )
}

export default DropdownAssignee;