import React, {useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
// import AdminTabs from './TOBEDELETED/AdminTabs'
import AdminTabs from './AdminTabs'

import authContext from '../../../context/auth/authContext'



const AdminDashboard = ({ match }) => {


  // Redirect if not Authenticated
  const authContext1 = useContext(authContext)
  const {user, isAuthenticated, userType, loading } = authContext1
  // console.log(user, isAuthenticated, userType);
  if( ! loading && (!user || !isAuthenticated || userType !== 'Admin')) {
    return (
      <Redirect to={'/'} />
    )
  }
  return (
    <>
    <AdminTabs />
    </>

  )
}

export default AdminDashboard;
