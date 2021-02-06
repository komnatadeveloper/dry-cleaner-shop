import React, {useContext, useEffect, } from 'react'
import {  NavLink } from 'react-router-dom'
import OrdersItem from './OrdersItem'
import adminContext from '../../../context/admin/adminContext'
import {
  CircularProgress,
  Container,
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';

const OrdersTab = () => {
  const adminContext1 = useContext(adminContext)
  const { loadOrders, orders, loading, loadPayments, payments} = adminContext1

  useEffect(() => {
    // eslint-disable-next-line
    loadOrders()
    // eslint-disable-next-line
    loadPayments()
    // eslint-disable-next-line
  }, []);

  const StyledTableCell = withStyles( theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();
  
  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <div 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        {
          loading 
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
            <div>
              <h2 className='text-center mt-2 mb-1'>Orders</h2>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        Order Date
                      </StyledTableCell>
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell align='right'>Price</StyledTableCell>
                      <StyledTableCell align='center'>Status</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>

                <TableBody>
                  {orders ? (
                    orders.length > 0 &&
                    orders.map(order => (
                      <OrdersItem key={order._id} order={order} />
                    ))
                  ) : (
                    <></>
                  )}
                </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
        }
        <div className='mb-2'>
          <Button
            component={NavLink}
            to='/dashboard/orders/add'
            color='secondary'
            variant='contained'
          >
            Add Orders
          </Button>
        </div>
      </div>
      
      
    </Container>

  );
}

export default OrdersTab
