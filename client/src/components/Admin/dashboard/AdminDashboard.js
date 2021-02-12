import React, {useContext, useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
// import AdminTabs from './TOBEDELETED/AdminTabs'
import authContext from '../../../context/auth/authContext';
import adminContext from '../../../context/admin/adminContext';
// Reports
import TotalCustomers from './reports/TotalCustomers';
import Payment from './reports/Payment';
import OrdersProgress from './reports/OrdersProgress';
// Orders Component
import ActivitiesTabInAdminDashBoard from './ActivitiesTabInAdminDashBoard';

import {
  Avatar,
  Box,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';



const AdminDashboard = ({ match }) => {


  // Redirect if not Authenticated
  const authContext1 = useContext(authContext)
  const adminContext1 = useContext(adminContext)
  const {user, isAuthenticated, userType, loading ,  } = authContext1;
  const {loadDashboardReports, loadOrders, orders, getAllUserActivities  } = adminContext1;
  const [ _loading, _setLoading ] = useState(true);
  const [ _loadingUserActivites, _setLoadingUserActivites ] = useState(true);
  // const _cbsetLoadingOrders = () => _setLoadingOrders(false);
  const _cbSetLoadingUserActivites = ( resFromApi ) => {
    if( resFromApi !== null ) {
      _setUserActivites( resFromApi );
    } else {
      _setUserActivites( [] );
    }
    _setLoadingUserActivites(false);
  };
  const [_dashboardInitialReport, _setDashboardInitialReport ] = useState({});
  const [ _userActivities, _setUserActivites ] = useState([]);

  useEffect( () => {
    loadDashboardReports()
      .then( res => {
        console.log(res);
        _setDashboardInitialReport(res);
        _setLoading(false);
      } );
    
    getAllUserActivities({
      cb: _cbSetLoadingUserActivites
    })
    // loadOrders(_cbsetLoadingOrders);
  }, []);
  // console.log(user, isAuthenticated, userType);
  if( ! loading && (!user || !isAuthenticated || userType !== 'Admin')) {
    return (
      <Redirect to={'/'} />
    )
  }
  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    > 
      {
        (_loading || _loadingUserActivites )
        ? (
          <div 
            className='flexrow justify-content-center'
            style={{
              minHeight: 180,
              paddingTop: 120
            }}
          >
            <CircularProgress />
          </div>
        )
        : (
          <>
            <div className="pt-4"></div>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <TotalCustomers
                  increaseCount = {_dashboardInitialReport.lastOneMonthCustomerCount}
                  totalCount={_dashboardInitialReport.totalCustomerCount}
                  descriptionText={'Since last month'}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Payment
                  paymentQuantity={_dashboardInitialReport.paymentTotalInLast30Days}
                  comparisonToOldValues={_dashboardInitialReport.paymentChangePercentage}
                  changeDescription={_dashboardInitialReport.paymentChangeDescriptionText}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <OrdersProgress
                  paymentQuantity='34'
                  ordersInProgressPercentage={_dashboardInitialReport.ordersInProgressPercentage}
                  changeDescription='This is change Desc'
                />
              </Grid>
            </Grid>
              <ActivitiesTabInAdminDashBoard 
                activitiesList={_userActivities}
              />
          </>
        )
      }
    
    </Container>

  )
}

export default AdminDashboard;
