import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthPage} from '../modules/auth'
//import Login from '../../app/pages/login'

export function PublicRoutes() {
  return (
    <Routes>
      {/* <Route path="/auth" component={Login} exact /> 
      <Redirect to='/auth' />
      */}
      <Route path='/auth' element={<AuthPage/>} />
      <Route element={<Navigate to='auth'/>} />

    </Routes>
  )
}
