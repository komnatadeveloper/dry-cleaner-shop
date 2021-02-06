import React, {useContext, useEffect, Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import adminContext from '../../../context/admin/adminContext'
import {
  Container,
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
import PaymentItem from './PaymentItem';


const PaymentsPage = () => {
  const adminContext1 = useContext(adminContext)
  const { loadOrders, orders, loading, loadPayments, payments} = adminContext1
  
  useEffect(() => {
    loadPayments();
  }, []);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();
  const StyledTableCell = withStyles( theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        minHeight:'90vh'
      }}
      
    >
      <div 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        <div>
          <h2 className='text-center mt-1 mb-1'>Payments</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                  <StyledTableCell>Payment Date</StyledTableCell>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell align='right'>Quantity</StyledTableCell>
                  <StyledTableCell align='center'>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments ? (
                  payments.length > 0 &&
                  payments.map(payment => (
                    <PaymentItem key={payment._id} payment={payment} />
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='mb-2'>
          <Button
            component={NavLink}
            to='/dashboard/payments/add-payment'
            size='large'
            color='secondary'
            variant='contained'
          //   style={{
          //   position:'absolute',
          //   bottom: 112,
          //   marginLeft:'1rem',
          //   marginRight:'1rem',
          // }}
          >
            Add Payment
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default PaymentsPage;