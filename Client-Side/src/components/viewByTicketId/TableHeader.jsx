import React from 'react'
import { TableHead,TableRow, TableCell } from '@mui/material';
const TableHeader = () => {
  return (
    <TableHead style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff', borderBottom:'1px solid green'}}>
      <TableRow>
        <TableCell  align="left" style={{ width: '10%',  fontWeight:'bold'  }} className='table-cell'>TestCaseId</TableCell>
        <TableCell  align="left" style={{ width: '40%',  fontWeight:'bold'  }} className='table-cell'>Description</TableCell>
        <TableCell  align="left" style={{ width: '25%',  fontWeight:'bold'  }} className='table-cell'>Assignee</TableCell>
        <TableCell  align="left" style={{ width: '25%',  fontWeight:'bold'  }} className='table-cell'>Status</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeader;