import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownStatus = ({item,updateStatus}) => {
  return (
                    <Dropdown style={{ display: 'flex', width: '100%' }}>
                      <Dropdown.Toggle variant='' title={item.status} key={item.id}>
                        {item.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ overflowY:'scroll'}}>
                        <Dropdown.Item onClick={() => updateStatus('Pass', item.id, true)}>Pass</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateStatus('Fail', item.id, true)}>Fail</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateStatus('Hold', item.id, true)}>Hold</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateStatus('Deferred', item.id, true)}>Deferred</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
  )
}

export default DropdownStatus