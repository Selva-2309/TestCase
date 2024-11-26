import React, { useState } from 'react';
import { Navbar, Offcanvas, Container } from 'react-bootstrap';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuIcon from '@mui/icons-material/Menu';

const TopNav = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Navbar sticky='top' style={{ backgroundColor: 'rgb(2, 110, 49)' }}>
        <Container fluid style={{ display: 'inline' }}>
          <MenuIcon onClick={() => setFlag(true)} style={{ marginRight: '15px', fontSize: '45px', height: '26px' }} />
          <BugReportIcon style={{ color: 'white', fontSize: '40px' }} />
          <Navbar.Brand style={{ color: 'white', padding: '3px', fontSize: '24px', fontWeight: 'bold' }}>TC Tracker</Navbar.Brand>
        </Container>
      </Navbar>

      <Offcanvas show={flag} onHide={() => setFlag(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Hello</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TopNav;
