import React, {useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './Utilities.css';
import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from './components/layout/Alert';
import About from './components/public/About';
import Home from "./components/public/home/Home";
import UserPage from "./components/public/UserPage";
import AdminLogin from "./components/login/AdminLogin";
import CustomerLogin from "./components/login/CustomerLogin";
import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";
import AuthLoader from './components/layout/AuthLoader'

import AddClothes from './components/AddClothes';

import setAuthToken from './utils/setAuthToken'
// States
import PublicState from './context/public/PublicState'
import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/AuthState'
import AdminState from './context/admin/AdminState'
import UserState from './context/user/UserState'

import AdminRoute from './components/routing/AdminRoute'
import UserRoute from './components/routing/UserRoute'
import CustomersTab from './components/Admin/Customers/CustomersTab'
import OrdersTab from "./components/Admin/Orders/OrdersTab";
import ServicesTab from './components/Admin/Services/ServicesTab'
import ProductsTab from './components/Admin/Products/ProductsTab'
import CustomerDetails from './components/Admin/Customers/CustomerDetails'
import NewOrder from './components/Admin/OrderForm/NewOrder';
import AddPayment  from './components/Admin/payment/AddPayment'
import AddService from './components/Admin/Services/AddService'
import Cart from './components/public/cart/Cart';
import Footer from './components/layout/Footer'

// User
import UserMain from './components/user/main/UserMain'
import SingleOrder from './components/user/singleOrder/SingleOrder'
  

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
            <UserState>
              <AdminState>
                <BrowserRouter>
                  <Navbar />
                  <Alert />
                  <AuthLoader />
                  <div style={{ minHeight: "90vh" }} className='mp-0'>
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/admin' component={AdminLogin} />
                      <Route
                        exact
                        path='/user-login'
                        component={CustomerLogin}
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
                        path={`/dashboard/payments/add-payment`}
                        component={AddPayment}
                      />
                      <AdminRoute
                        exact
                        path={`/dashboard/payments/edit/:activityId`}
                        component={AddPayment}
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
                      <UserRoute
                        exact
                        path={`/user-main`}
                        component={UserMain}
                      />
                      <UserRoute
                        exact
                        path={`/user-main/orders/:_id`}
                        component={SingleOrder}
                      />
                      <Route
                        exact
                        path='/admin/addclothes'
                        component={AddClothes}
                      />
                      <Route exact path='/user/:userId' component={UserPage} />
                      <Route exact path='/cart' component={Cart} />
                      <Route exact path='/user/:userId' component={UserPage} />
                    </Switch>
                  </div>
                  <Footer />
                </BrowserRouter>
              </AdminState>
            </UserState>
          </PublicState>
        </AuthState>
      </AlertState>
    </div>
  );
}

export default App;