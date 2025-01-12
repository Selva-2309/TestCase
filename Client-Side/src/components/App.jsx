// Dashboard

import { createContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
//import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { toast, ToastContainer } from 'react-toastify';



function App() {
  const location = useLocation();
  const [list, setList] = useState({});
  const [users, setUsers] = useState([]);
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [click, setClick] = useState({});
 
  useEffect(()=>{
    const toastMessage = Cookies.get('toastMessage');
    if(toastMessage){
      toast.success(toastMessage,{autoClose:3000});
      Cookies.remove('toastMessage');
    }
  },[])

  useEffect(() => {
    if (!token) {
      navigate('/auth/login')
    };
    fetchDescription();
    fetchUsers();

  }, [token, location]);

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
      console.log(grouped)
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
      console.log('Fetched users:', data.record);
      setUsers(data.record); // Ensure users is an array
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClick = (key) => {
    setClick((prevstate) => ({
      ...prevstate,
      [key]: !prevstate[key]
    }))
  }



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
    if (!items || !users.length) return [];
    return users.map(user => {
      const count = items.filter(item => item.assignee === user.name).length;
      return { name: user.name, count: count };
    });
  };

  console.log(getAssigneeData(list['project1']))



  ChartJS.register(CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);



  return (

    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '30px' }}>
<ToastContainer position="top-right" autoClose={3000} />

      <div  >
        {location.pathname === '/auth/dashboard' && Object.keys(list).length > 0 && (
          Object.keys(list).sort().map((project, key) => (
            <div key={key} style={{
              borderRadius: '5px',

              boxShadow: '1px 1px 1px 1px rgba(140, 149, 159, 0.15)',
              border: '1px solid rgba(140, 149, 159, 0.15)',
              paddingBottom: '10px',
              marginBottom: '30px',
             

            }}>
              <div style={{ display: 'flex',
              flexDirection: 'row', justifyContent:'space-between' }}>
                <div>


                  <h4 style={{ margin: '10px' }} >
                    <Link
                      to={`/auth/${project}/testcases/view/1`}
                      onClick={() => { Cookies.set('project', `${project}`, { expires: 1, path: '/' }); }}
                    >
                      {project}
                    </Link>
                  </h4>


                </div >
                <div style={{ margin: '10px' }} >
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => handleClick(key)}
                  >
                    {!click[key] ? <KeyboardArrowUpIcon style={{ outline: 'none' }} /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </div>
              </div>
              {!click[key] && <hr />}

              {list[project] && !click[key] && (

                <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
                  <div style={{ width: '40%', paddingTop: '50px' }}>

                    <Pie
                      data={{
                        labels: getPieChartData(list[project]).map(item => item.label),
                        datasets: [
                          {
                            data: getPieChartData(list[project]).map(item => item.value), // Correct mapping for values
                            backgroundColor: [
                              'rgba(75, 192, 192, 0.6)',  // Color for 'Pass'
                              'rgba(255, 99, 132, 0.6)',  // Color for 'Fail'
                              'rgba(255, 205, 86, 0.6)',  // Color for 'Hold'
                              'rgba(54, 162, 235, 0.6)',  // Color for 'Deferred'
                            ],
                            borderColor: [
                              'rgba(75, 192, 192, 1)',  // Border color for 'Pass'
                              'rgba(255, 99, 132, 1)',  // Border color for 'Fail'
                              'rgba(255, 205, 86, 1)',  // Border color for 'Hold'
                              'rgba(54, 162, 235, 1)',  // Border color for 'Deferred'
                            ],
                            borderWidth: 1, // Border width for all slices

                          }
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: false,
                            text: 'none',
                          },
                        },

                      }}

                    />




                  </div>

                  <div style={{ flexGrow: 1, paddingTop: '100px' }}>
                    <Bar
                      data={{
                        labels: getAssigneeData(list[project]).map((user) => user.name),
                        datasets: [
                          {
                            data: getAssigneeData(list[project]).map((user) => user.count),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            barThickness: 30,
                            maxBarThickness: 50,
                            minBarLength: 20,
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            ticks: {
                              autoSkip: false,
                            },
                          },
                          y: {
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1, // You can adjust this based on your dataset
                            },
                          },
                        },
                      }}
                    />

                  </div>
                </div>

              )
              }
            </div>
          ))
        )}
      </div>
      <Outlet />


    </div>

  );

}

export default App;