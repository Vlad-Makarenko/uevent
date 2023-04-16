/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ResetPassword } from '../pages/ResetPassword';
import { Main } from '../pages/Main';
import { Home } from '../pages/Home';
import { CalendarPage } from '../pages/CalendarPage';
import { EventPage } from '../pages/EventPage';
import { Companies } from '../pages/Companies';
import { Auth } from '../pages/Auth';
import { CheckLogin } from '../components/CheckLogin';
import { User } from '../pages/User';

export const useRoutes = () => {
  const { isAuthenticated, buf } = useSelector((state) => state.auth);

  return (
    <Routes path>
      <Route element={<CheckLogin />}>
        {isAuthenticated || buf ? (
          <>
            <Route path='/home' element={<Home />} exact />
            <Route path='/calendar' element={<CalendarPage />} exact />
            <Route path='/user/:id' element={<User />} exact />
            <Route path='/companies' element={<Companies />} exact />
            <Route path='/eventPage' element={<EventPage />} exact />
            <Route
              path='/password-reset/:token'
              element={<ResetPassword />}
              exact
            />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Main />} exact />
            <Route path='/home' element={<Home />} exact />
            {/* <Route path='/calendar' element={<CalendarPage />} exact /> */}
            <Route path='/user/:id' element={<User />} exact />
            <Route path='/companies' element={<Companies />} exact />
            <Route path='/eventPage' element={<EventPage />} exact />
            <Route path='/auth' element={<Auth />} exact />
            <Route
              path='/password-reset/:token'
              element={<ResetPassword />}
              exact
            />
            <Route path='*' element={<Navigate to='/auth' replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
