import React, { useContext, useEffect} from 'react';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';
// import CustomerLoginModal from '../login/CustomerLoginModal';
import authContext from '../../context/auth/authContext'
// Material UI
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import {
  AppBar, 
  Drawer,
  Toolbar, 
  IconButton,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import TuneIcon from '@material-ui/icons/Tune';


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
      backgroundColor:'#888'
      // height: 'calc(100% - 64px )'
    }
  }));
  classes=useStyles();

  const _CustomNavButton = ({content, navPath}) => (
    <Button
      component={NavLink}
      color={ location.pathname === navPath ? 'primary' : 'inherit'  }
      to={navPath}
      style={{
        // backgroundColor:'#ff4444'
      }}
    >
      {content}
    </Button>
  );


  const adminMenu = () => (
    <>
      {/* <li className= {location.pathname === '/about' ? 'active' : ''}>
      </li> */}
        {/* <Link className='mr-2'  to='/about'>About</Link> */}
        
        <_CustomNavButton
          navPath= '/about'
          content='About'
        />

      {/* <li className= {location.pathname === '/dashboard' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard'>Dashboard</Link> */}
        <_CustomNavButton
          navPath= '/dashboard'
          content='Dashboard'
        />
      {/* <li className= {location.pathname === '/dashboard/customers' ? 'active' : ''}>
      </li> */}
      
        {/* <Link to='/dashboard/customers'>Customers</Link> */}
        <_CustomNavButton
          navPath= '/dashboard/customers'
          content='Customers'
        />
      {/* <li className= {location.pathname === '/dashboard/orders' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard/orders'>Orders</Link> */}
        <_CustomNavButton
          navPath= '/dashboard/orders'
          content='Orders'
        />
      {/* <li className= {location.pathname === '/dashboard/categories' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard/categories'>Categories</Link> */}
        <_CustomNavButton
          navPath= '/dashboard/categories'
          content='Categories'
        />
      {/* <li className= {location.pathname === '/dashboard/services' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard/services'>Services</Link> */}
        <_CustomNavButton
          navPath= '/dashboard/services'
          content='Services'
        />
      {/* <li className= {location.pathname === '/dashboard/products' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard/products'>Products</Link> */}
        <_CustomNavButton
          navPath= '/dashboard/products'
          content='Products'
        />
      {/* <li className= {location.pathname === '/dashboard/settings' ? 'active' : ''}>
      </li> */}
        {/* <Link to='/dashboard/settings'>
          <i className='material-icons'>settings_applications</i>
        </Link> */}
        <_CustomNavButton
          navPath= '/dashboard/settings'
          content={<TuneIcon />}
        />
      {/* <li>
      </li> */}
        {/* <a style={{ height: 'inherit' }} onClick={e => logout()} className="flexrow justify-elements-flex-begin">
          <span>
            <i className='material-icons'>exit_to_app</i>
          </span>
          <span className="ml-1">{`Logout `}</span>
        </a> */}
        <_CustomNavButton
          navPath= '/dashboard/products'
          content={
            <span>
              <TuneIcon/>
              Logout
            </span>
          }
        />
    </>
  ); 
  
  const userMenu = () => (
    <>
      <li className= {location.pathname === '/about' ? 'active' : ''}>
        <a href='/about'>About</a>
      </li>
      
      <li className= {location.pathname === '/user-main' ? 'active' : ''}>
        <a
          className='waves-effect waves-light mr-2'
          href='/user-main'
        >
          Orders
        </a>
      </li>
      <li className= {location.pathname === '/cart' ? 'active' : ''}>
        <a
          className='waves-effect waves-light mr-2'
          href='/cart'
        >
          <i className='material-icons right'>shopping_cart</i>
        </a>
      </li>
      <li>
        <a
          href="#logout"
          onClick={ e => {
            e.preventDefault()
            logout()}} 
            className="flexrow justify-elements-flex-begin"
          >
          <span>
            <i className='material-icons'>exit_to_app</i>
          </span>
          <span className="ml-1">{`Logout `}</span>
        </a>
      </li>      
    </>
  )

  const publicMenu = () => (
    <>
      <li className= {location.pathname === '/about' ? 'active' : ''}>
        <a href='/about'>About</a>
      </li>
      <li className= {location.pathname === '/user-login' ? 'active' : ''}>
        <a
          href='/user-login'
          className='waves-effect waves-light'
        >Login
        </a>
      </li>
      <li className= {location.pathname === '/cart' ? 'active' : ''}>
        <a
          className='waves-effect waves-light mr-2'
          href='/cart'
        >
          <i className='material-icons right'>shopping_cart</i>
        </a>
      </li>
    </>
  );  
 

  return (
    <>
      {/* <AppBar
        color='secondary'
      > */}
        {/* <Toolbar> */}
        {/* ---------------------------------------- */}
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
              <ul className='right hide-on-med-and-down'>
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
                {!loading &&
                  !userType &&
                  !user &&
                  !isAuthenticated &&
                  publicMenu()}
              </ul>
            </Drawer>
          )
        }
        {/* ---------------------------------------- */}
        {/* </Toolbar> */}
        {/* <nav>
          <div className='nav-wrapper'>
          </div>
        </nav> */}
      {/* </AppBar> */}
      <AppBar
        color='secondary'
      >
        <Toolbar>

          <IconButton>
                <Menu />
              </IconButton>
          {!loading &&
                  !userType &&
                  !user &&
                  !isAuthenticated &&
                  publicMenu()}
        </Toolbar>
      </AppBar>
      {/* <ul className='sidenav' id='mobile-demo'>
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
        {!loading && !userType && !user && !isAuthenticated && publicMenu()}
      </ul> */}

      {/* <CustomerLoginModal /> */}
    </>
  );
}

export default withRouter(Navbar);
