import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

function App() {
  const location = useLocation();
  const [list, setList] = useState({});
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchDescription = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/services/objects/TestCases', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.project]) {
            acc[item.project] = [];
          }
          acc[item.project].push(item);
          return acc;
        }, {});
        setList(grouped);
      } catch (error) {
        console.error('Error fetching descriptions:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/services/query?q=select name from users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setUsers(data.record || []); // Ensure users is an array
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDescription();
    fetchUsers();
  }, [token, location]);

  const getPieChartData = (items) => {
    const passCount = items.filter(item => item.status === 'Pass').length;
    const failCount = items.filter(item => item.status === 'Fail').length;
    const holdCount = items.filter(item => item.status === 'Hold').length;
    const deferCount = items.filter(item => item.status === 'Deferred').length;
    return [
      { id: 'Pass', value: passCount, label: "Pass" },
      { id: 'Fail', value: failCount, label: "Fail" },
      { id: 'Hold', value: holdCount, label: "Hold" },
      { id: 'Deferred', value: deferCount, label: 'Deferred' }
    ];
  };

  const getAssigneeData = (items) => {
    return users.map(user => {
      const count = items.filter(item => item.assignee === user.name).length;
      return { name: user.name, count: count };
    });
  };

  return (
   <div  style={{display:'flex', flexDirection:'column', overflowY:'auto', padding:'30px'}}>
      <Grid  spacing={4} >
      {location.pathname === '/auth/dashboard' && Object.keys(list).length > 0 && (
        Object.keys(list).map((project) => (
          <div >
            <Grid item xs={12} style={{boxSizing:'border-box', boxShadow:'2px solid rgb(2, 110, 49)'}}>
              
              <h4 className="project-header" style={{gridRow:'grid-row-2',justifyContent:'start', alignItems:'start'}}  onClick={() => { sessionStorage.setItem('project', `${project}`) }}>
              <Link 
                to={`/auth/${project}/testcases`} 
               
              >
                {project}
              </Link>
            </h4>
              
            </Grid>
            
              <Grid container spacing={4}>
              <Grid item xs={5}>
              <PieChart
                series={[
                  {
                    data: getPieChartData(list[project]),
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5
                  },
                ]}
                height={200}
                width={500}
              />
              </Grid>
            
             
              <Grid size={7}>
              <BarChart
                width={500}
                height={300}
                data={getAssigneeData(list[project])}
                
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
              </Grid>
              </Grid>
          
          </div>
        ))
      )}
      </Grid>
      <Outlet />
   </div>
   
  );

}

export default App;
