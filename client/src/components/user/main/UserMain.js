import React, {useEffect, useContext } from 'react';
import OrdersItem from './OrdersItem';
import userContext from '../../../context/user/userContext';
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

const UserMain = () => {
  const userContext1 = useContext(userContext)
  const { loadOrders, orders, loading } = userContext1

  useEffect(() => {
    // eslint-disable-next-line
    loadOrders();
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
              <div>
                <h2 
                  className="pt-2  pb-2 text-center" 
                >
                  Orders
                </h2>
              </div>
              <TableContainer component={Paper}>
                  <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Order Date</StyledTableCell>
                      <StyledTableCell align='right'>Order Total</StyledTableCell>
                      <StyledTableCell align='center'>Status</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    orders 
                      ? (
                        orders.length > 0 &&
                        orders.map(order => (
                          <OrdersItem key={order._id} order={order} />
                        ))
                      ) 
                      : (
                          <></>
                      )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
      }
    </Container>


  )
}

export default  UserMain
