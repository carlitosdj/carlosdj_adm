import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useDispatch} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {logoutUser} from '../../../store/ducks/me/actions'
import { User } from '../../../store/ducks/me/types'
// import * as auth from './redux/AuthRedux'

export function Logout() {
  const dispatch = useDispatch()

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const cookieUser: User = cookies.user
  console.log('########### cookies Começo', cookies)
  removeCookie('user', {path: '/'})

  useEffect(() => {
    // dispatch(auth.actions.logout())
    //Destroi cookie e remove user da redux:
    console.log("LOGOUT")
    
    //cookies.remove("user");
    console.log("cookies user - logout", cookieUser)
    dispatch(logoutUser())
    
    localStorage.removeItem('TOKEN')
    
    document.location.reload()

  }, [cookieUser])

  return (
    // <Switch>
    //   <Redirect to='/auth/login' />
    // </Switch>
    <Routes>
      <Route index element={<Navigate to='/'/>} />
    </Routes>
  )
}
