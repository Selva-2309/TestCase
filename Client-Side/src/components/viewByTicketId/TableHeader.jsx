import React from 'react'
import { TableHead,TableRow, TableCell } from '@mui/material';
const TableHeader = () => {
  return (
    <TableHead style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}>
      <TableRow>
        <TableCell  align="left" style={{ width: '10%' }}>TestCaseId</TableCell>
        <TableCell  align="left" style={{ width: '40%' }}>Description</TableCell>
        <TableCell  align="left" style={{ width: '25%' }}>Assignee</TableCell>
        <TableCell  align="left" style={{ width: '25%' }}>Status</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeader;