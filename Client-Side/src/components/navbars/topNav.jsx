import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Offcanvas, Container } from 'react-bootstrap';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuIcon from '@mui/icons-material/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link, Outlet, useAsyncError, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import '../../../src/App.css';
import CreateProject from './createProject';
import Profile from './profile';
import ViewTabs from './tabs';


const TopNav = () => {
  const [flag, setFlag] = useState(false);
  const user = Cookies.get("user");
  const token = Cookies.get("token");
  const id = Cookies.get("userId");
  const [profilePic, setProfilePic] = useState();
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(!token){
      navigate('/auth/login')
    }
    fetchUsers();
    fetchProjects();
  }, [token, id])

  

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/services/objects/User/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setProfilePic(data[0])

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/services/objects/Project", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    clearAllCookies();
    navigate('/auth/login')
  }

  const clearAllCookies = ()=>{
    const item = Cookies.get();
    for(let i in item){
      Cookies.remove(i);
    }
  }


  const fetchToken = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/server/data/token', { user: 'demo', password: '123' });
      Cookies.set('token',data.token,{expires:1/24,path:'/'});
      
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <>
      <Navbar sticky='top' style={{ backgroundColor: 'rgb(2, 110, 49)' }}>
        <Container fluid style={{ display: 'flex', flexDirection: "row", justifyContent: "start", gap: "3px" }}>
          <div style={{ flexGrow: '1' }}>
            <MenuIcon onClick={() => setFlag(true)} style={{ margin: '5px', paddingLeft: "5px", paddingRight: "5px", fontSize: '60px', height: '26px', color: "white", cursor:'pointer' }} />
            <BugReportIcon style={{ color: 'white', fontSize: '40px' }} />
            <Navbar.Brand style={{ color: 'white', padding: '3px', fontSize: '24px', fontWeight: 'bold' }}>TC Tracker</Navbar.Brand>
          </div>
          <div style={{ display: 'flex', flexDirection: "row", gap: "5px", paddingRight: "10px", justifyContent: 'center', alignContent: "center" }}>
            <img src={profilePic && profilePic?.picture} style={{ width: "40px", height: '40px', borderRadius: '25px' }} />
            <h6 style={{ color: "#f5f9fa", paddingTop: '7px', fontFamily: "Cursive" }}>{user}</h6>
          </div>
        </Container>
      </Navbar>
     
      <Offcanvas show={flag} onHide={() => setFlag(false)} placement="start" style={{ width: "300px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><div style={{ display: 'flex', flexDirection: "row", gap: "5px", paddingRight: "10px", justifyContent: 'center', alignContent: "center" }}>
          <BugReportIcon style={{ fontSize: '40px' }} />
            <p style={{ padding: '5px', fontFamily: "Cursive" }}>TC Tracker</p>
          </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: 'flex', flexDirection: "column" }}>

          <div  style={{flexGrow:1}}>
            <h4 className='nav-ls'>
              <Link
                to={`/auth/dashboard`}

                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={()=>{setFlag(false);}}

              >Dashboard
              </Link>
            </h4>
            <div className='nav-ls' ><Profile ProfileDetails={profilePic} fetchUsers={fetchUsers}/></div>
            <h4><u>Projects</u></h4>
            <ul>
              {project && project.map((element, index) => (
                <li
                  key={index}
                  style={{ listStyleType: "none", padding: "5px", width: "100%" }}
                  className='nav-ls' 
                >
                  <Link
                    to={`/auth/${element.name}/testcases/view/1`}
                    key={element.id}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={() => {Cookies.set('project', element.name, { expires: 1, path: '/' }); setFlag(false);}}
                  >
                    {element.name}
                  </Link>
                </li>

              ))}
              <li className='nav-ls'  style={{ listStyleType: "none", padding: "5px", width: "100%", cursor: "pointer" }} onClick={(e) => { setShow(true) }}>
                Create project
              </li>
              {
                show && <CreateProject show={show} setShow={setShow} fetchProjects={fetchProjects} />
              }

            </ul>
          </div>
         
         
        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', justifyItems:'center'}} onClick={handleLogout} className='nav-ls' >
            <LogoutIcon />
            <p>Log out</p>
          </div>
       
        </Offcanvas.Body>
       
      </Offcanvas>

    </>
  );
}

export default TopNav;
