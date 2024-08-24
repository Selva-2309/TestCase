import { Children, createContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import '../../../src/App.css';
import axios from 'axios';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {FormGroup} from '@mui/material';
import TableHeader from '../viewByTicketId/TableHeader';
import DescriptionTable from '../viewByTicketId/descriptionTable';

export const userContext = createContext();
function App() {
  // State variables
  const [token, setToken] = useState(null);
  const [description, setDescription] = useState({});
  const [descrip, setDescrip] = useState("");
  const inputRef = useRef({});

  

  // Fetch token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('http://localhost:4000/server/data/token', { user: 'demo', password: '123' });
        console.log('Token:', response.data.token);
        setToken(response.data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  // Fetch descriptions when token is available
  useEffect(() => {
    if (!token) return;    
    fetchDescription();
  }, [token]);

  const fetchDescription = async () => {
    try {
      const response = await axios.get('http://localhost:4000/services/objects/TestCases', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched Descriptions:', response.data);

      // Use the custom Object.groupBy method
      const groupedData = Object.groupBy(response.data, ({issueid}) => issueid);
      console.log('Grouped Descriptions:', groupedData);
      setDescription(groupedData);
    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setDescrip(e.target.value);
  };

  // Handle creating a new description
  const createDescription = async (issueid) => {
    try {
      const response = await axios.post('http://localhost:4000/services/objects/TestCases', 
        { description: descrip,issueid:issueid }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Created Description:', response.data);
      setDescrip(''); // Clear input field
      await fetchDescription(); // Refresh the description list
    } catch (error) {
      console.error('Error creating description:', error);
    }
  };

  // Handle key press event for input field
  const handleKeyDown = async (event,issueid,input) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      await createDescription(issueid);
      if (inputRef.current[input]) {
        inputRef.current[input].value = ''; // Clear input field using ref
        inputRef.current[input].focus(); // Optionally, focus the input field
      }
    }
  };

  // Render the component
  return (
    <>
      <TableContainer style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <Table stickyHeader>
            <TableHeader />
            <userContext.Provider value={{token}}>
      <DescriptionTable 
              description ={description}
              descrip={descrip}
              handleKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              inputRef={inputRef}
              fetchDescription={fetchDescription}
            />
      </userContext.Provider>
        </Table>
      </TableContainer>
      
    </>
  );
}

export default App;
