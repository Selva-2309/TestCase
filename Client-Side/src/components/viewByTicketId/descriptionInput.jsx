import React from 'react'
import { TableRow, TableCell } from '@mui/material'
import { Form } from 'react-bootstrap'
const DescriptionInput = ({descrip, inputRef, handleInputChange,handleKeyDown,issueid, groupIndex}) => {
    return (
        <TableRow>
            <TableCell colSpan={4} className="table-cell" >
                <Form.Control
                    style={{ width: '100%', border: 'none', boxSizing: 'border-box', outline: 'none' }}
                    ref={(el) => (inputRef.current[groupIndex] = el)}
                    type="text"
                    onChange={handleInputChange}
                    onKeyDown={descrip ? (event) => handleKeyDown(event, issueid[0].issueid, groupIndex) : null}
                    placeholder="Enter description"
                    onFocus={(e) => { e.target.placeholder = "" }}
                    onBlur={(e) => { e.target.placeholder = "Enter description" }}
                />
            </TableCell>
        </TableRow>
    )
}

export default DescriptionInput;