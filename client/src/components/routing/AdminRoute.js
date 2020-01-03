import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext1 = useContext(authContext);
  const { isAuthenticated, loading, user, userType, loadAdmin } = authContext1;

  useEffect(() => {
    
    if(!isAuthenticated || !user || userType !== 'Admin') {
      // eslint-disable-next-line
      loadAdmin()
    }
    // eslint-disable-next-line
  }, [])


  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
