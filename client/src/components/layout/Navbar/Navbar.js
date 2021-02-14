import React, { useContext, useState } from 'react';
import {
  NavLink,
  withRouter
} from 'react-router-dom';
import authContext from '../../../context/auth/authContext'

import {
  AppBar, 
  Drawer,
  Toolbar, 
  Button,
  makeStyles,
  // FOR MODAL
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  // End of FOR MODAL
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = ({
  location
}) => {
  const authContext1 = useContext(authContext)
  const { loading, userType, user, isAuthenticated, logout } = authContext1 
  
  let classes;
  const useStyles = makeStyles( () => ({
    mobileDrawer: {
      width: 180
    },
    desktopDrawer: {
      width: 180,
      top: 64,
      backgroundColor:'#777'
    }
  }));
  classes=useStyles();  
  
  const _CustomNavButton = ({content, navPath, onClick, isAppbar = false}) => {
    const _sidebarButtonTheme = createMuiTheme({
      palette: {
        primary: {
          main: '#fafafa',  // you can not write any hex color here. there is a list of colors supported. For further info, look at material ui colors
        },
      }
    });
    if ( isAppbar ) {
      return (
        <ThemeProvider theme={_sidebarButtonTheme}>
          <Button
            component={NavLink}
            color={  'primary'  }
            to={navPath}
            variant= { location.pathname === navPath ? 'outlined' : 'inherit'}
          >
            {content}
          </Button>
        </ThemeProvider>
      );
    }
    if ( onClick ) {
      return (
        <ThemeProvider theme={_sidebarButtonTheme}>
          <Button
            onClick={onClick}
          >
            {content}
          </Button>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={_sidebarButtonTheme}>
        <Button
          component={NavLink}
          color={ location.pathname === navPath ? 'secondary' : 'primary'  }
          to={navPath}
        >
          {content}
        </Button>
      </ThemeProvider>
    );
  }  // End of _CustomNavButton

  const [_isLogoutModalOpen, _setIsLogoutModalOpen] = useState(false);
  const _handleClickOpenLogoutModal = () => {
    _setIsLogoutModalOpen(true);
  }
  const _handleClickCloseLogoutModal = () => {
    _setIsLogoutModalOpen(false);
  }
  const _LogoutModalDialog = () => {    
    return (
      <Dialog
          open={_isLogoutModalOpen}
          onClose= {_handleClickCloseLogoutModal}
          aria-labelledby={`logout-modal-title`}
          aria-describedby={`logout-modal-description`}
        >
          <DialogTitle
            id={`logout-modal-title`}
          >
            Logout Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={`logout-modal-description`}>
              Are you sure you want to Logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={_handleClickCloseLogoutModal} color='inherit'>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                _handleClickCloseLogoutModal();
                logout();
              }}
              color='secondary'
            >Logout</Button>
          </DialogActions>          
        </Dialog>
    );
  }
  


  const adminMenu = () => (
    <> 
        <div className='pt-2'></div>
        <_CustomNavButton
          navPath= '/dashboard'
          content='Dashboard'
        />    
        <_CustomNavButton
          navPath= '/dashboard/customers'
          content='Customers'
        />     
        <_CustomNavButton
          navPath= '/dashboard/orders'
          content='Orders'
        />
        <_CustomNavButton
          navPath= '/dashboard/payments'
          content='Payments'
        />
        <_CustomNavButton
          navPath= '/dashboard/categories'
          content='Categories'
        />
        <_CustomNavButton
          navPath= '/dashboard/services'
          content='Services'
        />
        <_CustomNavButton
          navPath= '/dashboard/employee-list'
          content='Employee'
        />
        <_CustomNavButton
          navPath= '/dashboard/settings'
          // content={<TuneIcon />}
          content={'Settings'}
        />     
        <_CustomNavButton
          onClick= { _handleClickOpenLogoutModal }
          content={
            <>
              <p style={{color:'#fafafa', marginLeft:'.75rem'}}>Logout</p>
              <ExitToAppIcon color='primary'/>
            </>
          }
        />
        <_LogoutModalDialog/>
    </>
  );  // End of adminMenu 
  
  const userMenu = () => (
    <>
      <_CustomNavButton
        navPath= '/user-main'
        content='Orders'
      />  
      <_CustomNavButton
        navPath= '/user-main/account'
        content='Account'
      />  
      <_CustomNavButton
        onClick= { _handleClickOpenLogoutModal }
        content={
          <>
            <p style={{color:'#fafafa', marginLeft:'.75rem'}}>Logout</p>
            <ExitToAppIcon color='primary'/>
          </>
        }
      />
      <_LogoutModalDialog/>
    </>
  )

  const publicMenu = () => (
    <>      
      <_CustomNavButton
        isAppbar={true}
        navPath={'/user-login'}
        content={
          <>
            <ExitToAppIcon color='primary'/>
            <p style={{color:'#fafafa', marginLeft:'.75rem'}}>Login</p>
          </>
        }
      />
    </>
  );  
 

  return (
    <>      
      {
        (
          userType === "Admin" 
          ||  userType === "user"
        ) && isAuthenticated
        && user && (
          <Drawer
            anchor='left'
            variant='permanent'
            classes={{paper: classes.desktopDrawer}}
          >
              {!loading &&
                userType === "Admin" &&
                user &&
                isAuthenticated &&
                adminMenu()}
              {!loading &&
                userType === "user" &&
                user &&
                isAuthenticated &&
                userMenu()}  
          </Drawer>
        )
      }        
      <AppBar
        color='secondary'
      >
        <Toolbar>
          <_CustomNavButton
            navPath='/'
            content={<p style={{color:'#fafafa'}}>Home</p>}
            isAppbar={true}
          />
          <_CustomNavButton
            navPath='/about'
            content={<p style={{color:'#fafafa'}}>About</p>}
            isAppbar={true}
          />
          {
            !loading 
            && !userType 
            && !user
            && !isAuthenticated 
            && publicMenu()
          }
        </Toolbar>
      </AppBar>      
    </>
  );
}

export default withRouter(Navbar);
