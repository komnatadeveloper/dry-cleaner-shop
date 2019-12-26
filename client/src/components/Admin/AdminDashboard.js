import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
// import AdminTabs from './TOBEDELETED/AdminTabs'
import authContext from '../../context/auth/authContext'


const AdminDashboard = ({ match }) => {

  // // Redirect if not Authenticated
  // const authContext1 = useContext(authContext)
  // const {user, isAuthenticated, userType, loading } = authContext1
  // // console.log(user, isAuthenticated, userType);
  // if( ! loading && (!user || !isAuthenticated || userType !== 'Admin')) {
  //   return (
  //     <Redirect to={'/'} />
  //   )
  // }
  return (
    <>
    This is AdminDashboard
    {/* <div>
      this is admin main page admin name:{match.params.adminUsername}
    </div>
    <AdminTabs /> */}
    </>

  )
}

export default AdminDashboard;
