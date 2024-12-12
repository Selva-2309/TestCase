import React, { useEffect, useState } from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import Main from '../viewByTicketId/mainDescription';
import { Link, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import DescriptionByStatus from '../viewByTable/descriptionByStatus';
import '../../../src/App.css'
import { useNavigate } from 'react-router-dom';

const ViewTabs = () => {

  const project = Cookies.get('project');
  const navigate = useNavigate();
  const {id} = useParams();
  const [viewID, setViewID] = useState(id ? id : Cookies.get('viewID') ? Cookies.get('viewID') : 1);
  const location = useLocation();
  
  const handleSelect = (eventKey) => {
    Cookies.set('viewID', eventKey);
    setViewID(eventKey);
   
  };

  useEffect(() => {
    if (viewID) {
      console.log(viewID);
      navigate(`/auth/${project}/testcases/view/${viewID}`);
      
    }
  }, [viewID]);

  return (
    <>
    <div style={{padding:'10px',paddingBottom:'0px', fontSize:'20px', position:'static'}}>
        <p ><Link to={`/auth/dashboard`} className='breadcrumbs'>Dashboard</Link>/<Link to={`/auth/${project}/testcases/view/${viewID}`} className='breadcrumbs'>{project}</Link></p>
      </div>
    <Tabs activeKey={viewID} onSelect={handleSelect} style={{margin:'10px'}}>
    
        <Tab eventKey={1} title='viewById' >
            <Main />
        </Tab>
        <Tab eventKey={2} title='view2' >
          <DescriptionByStatus />
        </Tab>
        <Tab eventKey={3} title='viewByAssignee' >
            <Main />
        </Tab>
    </Tabs>
    </>
  )
}

export default ViewTabs;