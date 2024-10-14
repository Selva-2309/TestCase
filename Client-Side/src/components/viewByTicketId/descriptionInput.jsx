import React from 'react'
import { TableRow, TableCell } from '@mui/material'
const DescriptionInput = ({descrip, inputRef, handleInputChange,handleKeyDown,issueid, groupIndex}) => {
    return (
        <TableRow >
            <TableCell colSpan={4} >
                <input
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