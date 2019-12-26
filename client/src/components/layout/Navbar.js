import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import CustomerLoginModal from '../login/CustomerLoginModal';
import authContext from '../../context/auth/authContext'




const Navbar = () => {
  const[ isOpen, setIsOpen] = useState(false)


  const authContext1 = useContext(authContext)
  const { loading, userType, user, isAuthenticated, logout } = authContext1

  useEffect( () => {

  }, [])


  const toggle = () => {
    setIsOpen( !isOpen);
  }




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
        <Link onClick={logout} to='#!'>
          <span>
            <i className='material-icons'>exit_to_app</i>
          </span>
        </Link>
      </li>
    </>
  );  



  const publicMenu = () => (
    <>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link
          to='/user-login'
          className='waves-effect waves-light lighten-1'          
        >
          <i className='material-icons right'>exit_to_app</i>
        </Link>
      </li>
      <li>
        <Link
          className='waves-effect waves-light btn-small light-blue lighten-1'
          to='/admin/addclothes'
        >
          Add Clothes
        </Link>
      </li>
    </>
  );
 

  return (
    <>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'>
              Logo
            </Link>
            <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {!loading && 
                userType === "Admin" 
                && user 
                && isAuthenticated 
                  ? adminMenu() : 
                  publicMenu()
              }
            </ul>
          </div>
        </nav>
      </div>
      <ul className='sidenav' id='mobile-demo'>
        {!loading && 
          userType === "Admin" 
          && user 
          && isAuthenticated 
            ? adminMenu() : 
            publicMenu()
        }
      </ul>

      {/* <CustomerLoginModal /> */}

    </>
  );
}

export default Navbar;
