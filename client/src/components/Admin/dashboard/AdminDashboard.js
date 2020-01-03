import React, {useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
// import AdminTabs from './TOBEDELETED/AdminTabs'
import AdminTabs from './AdminTabs'

import authContext from '../../../context/auth/authContext'
import M from 'materialize-css'


const AdminDashboard = ({ match }) => {

  useEffect(() => {
    M.AutoInit()
  }, [])

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
    This is AdminDashboard
    <div>
      this is admin main page admin name:{match.params.adminUsername}
    </div>
    <AdminTabs />
    </>

  )
}

export default AdminDashboard;
