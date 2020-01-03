import React, {useEffect, useContext, Fragment } from 'react';
import authContext from '../../context/auth/authContext'

const AuthLoader = () => {
  const authContext1 = useContext(authContext);
  const { loadAdmin, loadUser, setAuthLoading } = authContext1;

  useEffect(() => {
    // eslint-disable-next-line
    if(localStorage.auth) {
      // console.log('Hello from authload');

      const auth = JSON.parse(localStorage.auth);
      const { userType } = auth;

      // eslint-disable-next-line
      if (userType === "user") loadUser();
      // eslint-disable-next-line
      if (userType === "Admin") loadAdmin();
    } else {  // It means Public and there is no user or admin account
      // eslint-disable-next-line
      setAuthLoading(false)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
    </Fragment>
  )

}

export default AuthLoader
