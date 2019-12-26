import React, {useEffect, useContext, Fragment } from 'react';
import authContext from '../../context/auth/authContext'

const AuthLoader = () => {
  const authContext1 = useContext(authContext);
  const { loadAdmin, loadUser, setAuthLoading } = authContext1;

  useEffect(() => {
    if(localStorage.auth) {
      console.log('Hello from authload');
      
      const auth = JSON.parse(localStorage.auth)
      const {userType} = auth

      if(userType === 'user') loadUser()
      if(userType === 'Admin') loadAdmin()
    } else {  // It means Public and there is no user or admin account
      setAuthLoading(false)
    }
  }, [])

  return (
    <Fragment>
    </Fragment>
  )

}

export default AuthLoader
