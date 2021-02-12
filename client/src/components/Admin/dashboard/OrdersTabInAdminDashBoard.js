import React from 'react'
import OrdersItem from './OrdersItem'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';

const OrdersTabInAdminDashBoard = ({orders}) => {


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


  );
}

export default OrdersTabInAdminDashBoard
