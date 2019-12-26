import React, {useEffect, useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './Utilities.css';
import './App.css';
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Home from "./components/pages/Home";
import UserPage from "./components/pages/UserPage";
import AdminLogin from "./components/login/AdminLogin";
import CustomerLoginComponent from "./components/login/CustomerLoginComponent";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AuthLoader from './components/layout/AuthLoader'

import AddClothes from './components/AddClothes';

import setAuthToken from './utils/setAuthToken'
import PublicState from './context/public/PublicState'
import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/AuthState'
import AdminState from './context/admin/AdminState'

import AdminRoute from './components/routing/AdminRoute'
import CustomersTab from './components/Admin/Customers/CustomersTab'
import OrdersTab from "./components/Admin/Orders/OrdersTab";
import ServicesTab from './components/Admin/Services/ServicesTab'
import ProductsTab from './components/Admin/Products/ProductsTab'
import CustomerDetails from './components/Admin/Customers/CustomerDetails'
import NewOrder from './components/Admin/OrderForm/NewOrder';
import AddService from './components/Admin/Services/AddService'

  

// if (localStorage.auth) {
//   setAuthToken(localStorage.auth);
  
// }





const  App =  () => {


  useEffect(  () => {
    // Initialize Materialize
    M.AutoInit();

    if (localStorage.auth) {
      setAuthToken(localStorage.auth);
    }

    // Load User or Load Admin
    // if(userType === 'user' ) await loadUser();
    // if(userType === 'Admin' ) await loadAdmin();
    
  }, []);

  return (
    <div className='App'>
      <AlertState>
        <AuthState>
          <PublicState>
            <AdminState>
              <BrowserRouter>
                <Navbar />
                <Alert />
                <AuthLoader />

                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/admin' component={AdminLogin} />
                  <Route
                    exact
                    path='/user-login'
                    component={CustomerLoginComponent}
                  />
                  <AdminRoute
                    exact
                    path='/dashboard'
                    component={AdminDashboard}
                  />
                  <AdminRoute
                    exact
                    path='/dashboard/customers'
                    component={CustomersTab}
                  />
                  <AdminRoute
                    exact
                    path='/dashboard/orders'
                    component={OrdersTab}
                  />
                  <AdminRoute
                    exact
                    path='/dashboard/services'
                    component={ServicesTab}
                  />
                  <AdminRoute
                    exact
                    path='/dashboard/products'
                    component={ProductsTab}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/orders/add`}
                    component={NewOrder}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/orders/edit/:orderId`}
                    component={NewOrder}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/services/add`}
                    component={AddService}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/services/edit/:serviceId`}
                    component={AddService}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/customers/edit/:id`}
                    component={CustomerDetails}
                  />
                  <AdminRoute
                    exact
                    path={`/dashboard/customers/add`}
                    component={CustomerDetails}
                  />
                  <Route
                    exact
                    path='/admin/addclothes'
                    component={AddClothes}
                  />
                  <Route exact path='/user/:userId' component={UserPage} />
                </Switch>
              </BrowserRouter>
            </AdminState>
          </PublicState>
        </AuthState>
      </AlertState>
    </div>
  );
}

export default App;
