import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import App from './App';
import Main from './viewByTicketId/mainDescription';
import Login from './loginPage/login';
import TopNav from './navbars/topNav';
import DescriptionView from './descriptionView/descriptionView';
import ViewTabs from './navbars/tabs';

const RoutesWithNav = () => {
  const location = useLocation();
  const noNavPaths = ['/auth/login', '/auth/signup'];
  const showNav = !noNavPaths.includes(location.pathname);

  return (
    <>
      {showNav && <TopNav  />}
      <Routes>
        {/* Default redirect from root to /auth/login */}
        <Route path="/" element={<Navigate to="/auth/login" />} />
        
        <Route path='/auth'>
          <Route path='/auth/demo'  />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Login />} />
          <Route path='/auth/dashboard' element={<App />} />
          <Route path='/auth/:project/testcases/view/:id' element={<ViewTabs />} />
          <Route path='/auth/:project/testcases/view/:id/viewTestCase/:ids' element={<ViewTabs />} />
          <Route path='/auth/:project/testcases/view/:id/?filterQuery=ids' element={<ViewTabs />} />
          
          {/* Catch-all route for undefined paths within /auth 
          <Route path='*' element={<Navigate to='/auth/login' />} /> */}
        </Route>
      </Routes>
    </>
  );
};

const Routers = () => (
  <BrowserRouter>
    <RoutesWithNav />
  </BrowserRouter>
);

export default Routers;
