import React from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import Main from '../viewByTicketId/mainDescription';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import DescriptionByStatus from '../viewByTable/descriptionByStatus';

const ViewTabs = () => {

  const project = Cookies.get('project');
  return (
    <>
    <div style={{padding:'10px',paddingBottom:'0px', fontSize:'20px', position:'static'}}>
        <p><Link to={`/auth/dashboard`}>Dashboard</Link>/<Link to={`/auth/${project}/testcases`}>{project}</Link></p>
      </div>
    <Tabs defaultActiveKey="viewById" style={{margin:'10px'}}>
    
        <Tab eventKey='viewById' title='viewById'>
            <Main />
        </Tab>
        <Tab eventKey='view2' title='view2'>
          <DescriptionByStatus />
        </Tab>
        <Tab eventKey='view3' title='viewByAssignee'>
            <Main />
        </Tab>
    </Tabs>
    </>
  )
}

export default ViewTabs;