import React, { useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import CustomerLoginModal from '../login/CustomerLoginModal';
import authContext from '../../context/auth/authContext'
import M from 'materialize-css'




const Navbar = () => {

  const authContext1 = useContext(authContext)
  const { loading, userType, user, isAuthenticated, logout } = authContext1

  useEffect( () => {
    M.AutoInit()
  }, [])  


  const adminMenu = () => (
    <>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/dashboard/customers'>Customers</Link>
      </li>
      <li>
        <Link to='/dashboard/orders'>Orders</Link>
      </li>
      <li>
        <Link to='/dashboard/services'>Services</Link>
      </li>
      <li>
        <Link to='/dashboard/products'>Products</Link>
      </li>
      <li>
        <Link to='/dashboard/settings'>
          <i className='material-icons'>settings_applications</i>
        </Link>
      </li>
      <li>
        <a style={{ height: 'inherit' }} onClick={e => logout()} className="flexrow justify-elements-flex-begin">
          <span>
            <i className='material-icons'>exit_to_app</i>
          </span>
          <span className="ml-1">{`Logout `}</span>
        </a>
      </li>
    </>
  );  

  



  

  const userMenu = () => (
    <>
      <li>
        <Link to='/about'>About</Link>
      </li>
      
      <li>
        <Link
          className='waves-effect waves-light mr-2'
          to='/user-main'
        >
          Orders
        </Link>
        <Link
          className='waves-effect waves-light mr-2'
          to='/cart'
        >
          <i className='material-icons right'>shopping_cart</i>
        </Link>
      </li>
      <li>
        <Link
          to="#logout"
          onClick={ e => {
            e.preventDefault()
            logout()}} 
            className="flexrow justify-elements-flex-begin"
          >
          <span>
            <i className='material-icons'>exit_to_app</i>
          </span>
          <span className="ml-1">{`Logout `}</span>
        </Link>
      </li>      
    </>
  )

  const publicMenu = () => (
    <>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link
          to='/user-login'
          className='waves-effect waves-light'
        >Login
        </Link>
      </li>
      <li>
        <Link
          className='waves-effect waves-light mr-2'
          to='/cart'
        >
          <i className='material-icons right'>shopping_cart</i>
        </Link>
      </li>
    </>
  );
 

  return (
    <>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo ml-2'>
              Logo
            </Link>
            <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
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
          </div>
        </nav>
      </div>
      <ul className='sidenav' id='mobile-demo'>
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
      </ul>

      {/* <CustomerLoginModal /> */}
    </>
  );
}

export default Navbar;