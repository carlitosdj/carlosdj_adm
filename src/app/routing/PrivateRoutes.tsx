import React, {Suspense, lazy} from 'react'
// import { Provider } from 'react-redux';
// import store from '../../store';
import {Navigate, Route, Routes} from 'react-router-dom'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
// import {MenuTestPage} from '../pages/MenuTestPage'
import Wppcamp from '../pages/admin/wppcamp'
import Wppgroup from '../pages/admin/wppgroup'
import Leads from '../pages/admin/leads'
import Users from '../pages/admin/users'
import EmailsEnviados from '../pages/admin/emailsenviados'
import Support from '../pages/admin/supports'
import Annotations from '../pages/admin/annotations'
import Launch from '../pages/admin/launch/Launch'
import Fases from '../pages/admin/launch/fases/Fases'
import LaunchExtra from '../pages/admin/launch/launchextra/LaunchExtra'
import Contact from '../pages/admin/contact'

export function PrivateRoutes() {
  // const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const Manage = lazy(() => import('../pages/admin/component/Manage'))

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path='dashboard' element={<DashboardWrapper/>} />

        <Route path="manage">
          <Route path=":id" element={<Manage/>}/>
        </Route>

        <Route path="launch" element={<Launch/>} /> 
        <Route path="fases">
          <Route path=":id" element={<Fases/>}/>
        </Route>
        <Route path="launchextra">
          <Route path=":id" element={<LaunchExtra/>}/>
        </Route>

        <Route path='/wppcamp' element={<Wppcamp/>} />

        <Route path="wppgroup">
          <Route path=":id" element={<Wppgroup/>}/>
        </Route>

        <Route path='leads/:page/:take' element={<Leads/>} />

        <Route path='users/:page/:take' element={<Users/>} />
        <Route path='emailsenviados' element={<EmailsEnviados/>} />
        <Route path='support' element={<Support/>} />
        <Route path='annotations' element={<Annotations/>} /> 
        <Route path='contact' element={<Contact/>} />
        {/* 
        <Route path ="/auth/login" element={<Navigate to="/dashboard"/>} />
        <Route index element={<Navigate to="/dashboard"/>} />
        <Route path ="/auth/login" element={<Navigate to="/dashboard"/>} />
        <Route path="index.html" element={<Navigate to="/dashboard"/>} />
        <Route path="/index.html" element={<Navigate to="/dashboard"/>} />
        <Route index element={<Navigate to="/dashboard"/>} /> */}


        {/* <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/onlinecourses' />
        <Redirect to='error/404' /> */}
        <Route path ="/auth/login" element={<Navigate to="/dashboard"/>} />
        <Route path="index.html" element={<Navigate to="/dashboard"/>} />
        <Route path="/index.html" element={<Navigate to="/dashboard"/>} />
        <Route index element={<Navigate to="/dashboard"/>} />
        {/* <Route path="*" element={<Navigate to="error"/>} /> */}

        {/* <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' /> */}
      </Routes>
    </Suspense>
  )
}
