import React, {useContext} from 'react';
import authContext from '../../context/auth/authContext';
import {makeStyles} from '@material-ui/core/styles';


const ContentBody = ({children}) =>  {
  const authContext1 =  useContext(authContext);
  const {
    userType, 
    user, 
    isAuthenticated,
  } = authContext1;
  let desktopPublic =  {
    paddingTop: 47,
    width: '100vw',
    minHeight: '90vh'
  };
  let desktopPrivate =  {
    top: 64,
    // width: 'calc(100vw-180px) !important',
    paddingTop: 47,
    paddingLeft: 180,
    minHeight: '90vh',
    overflow: 'scroll'
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      paddingLeft: 180
    }
  }));
  const classes = useStyles();
  return (    
    (
      userType === "Admin" 
      ||  userType === "user"
    ) && isAuthenticated
    && user
      ?   (
        <div
          className={classes.content}
          // style={desktopPrivate}
        >
          {children}
        </div>
      )
      : (
        <div
          // style={desktopPublic}
        >
          {children}
        </div>
      )
  );  
}
export default ContentBody;