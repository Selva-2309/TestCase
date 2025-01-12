import { BrowserRouter, Routes, Route, useLocation, Navigate,matchPath } from 'react-router-dom';
import React from 'react';
import App from './App';
import Main from './viewByTicketId/mainDescription';
import Login from './loginPage/login';
import TopNav from './navbars/topNav';
import DescriptionView from './descriptionView/descriptionView';
import ViewTabs from './navbars/tabs';
import PasswordReset from './loginPage/passwordReset';

const RoutesWithNav = () => {
  const location = useLocation();
  const noNavPaths = ['/auth/login', '/auth/signup','/auth/reset-password/:id'];
  const showNav = noNavPaths.some(path => matchPath({ path, exact: true }, location.pathname));

  return (
    <div>
      {!showNav && <TopNav  />}
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
          <Route path='/auth/reset-password/:email' element={<PasswordReset />} />
          
          {/* Catch-all route for undefined paths within /auth 
          <Route path='*' element={<Navigate to='/auth/login' />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

const Routers = () => (
  <BrowserRouter>
    <RoutesWithNav />
  </BrowserRouter>
);

export default Routers;
