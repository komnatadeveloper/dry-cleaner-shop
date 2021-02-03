import React, {Fragment, useContext, useState,  useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import userContext from '../../../context/user/userContext'
import ServiceFormInOrderForm from './ServiceRowInOrderForm'
import Moment from 'react-moment'
import {
  CircularProgress,
  Container,
  Grid,
  Box,
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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const SingleOrder = ({match, history}) => {  
  const userContext1 = useContext(userContext)
  const { loadSingleOrder,  loading } = userContext1

  const [formData, setFormData] = useState( {
    _id: '',
    user: '',
    serviceList: [],
    orderStatus: '',
    orderTotalPrice: '',
    date: ''
  })

  const next = (singleOrder) => { 
    if (!singleOrder) return  history.push("/user-main")
    setFormData({
      _id : singleOrder._id,
      user : singleOrder.user,
      serviceList : singleOrder.serviceList,
      orderStatus : singleOrder.orderStatus,
      orderTotalPrice : singleOrder.orderTotalPrice,
      date : singleOrder.date
    })
  }
  useEffect(() => {
    loadSingleOrder({ _id: match.params._id, next })
  }, [])
  

  const { _id, user, serviceList, orderStatus, orderTotalPrice, date } = formData;

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
      <div className="pt-1"></div>
      <Button
        component={NavLink}
        to="/user-main"
        startIcon={<ArrowBackIosIcon/>}
        color='primary'
        variant='contained'
      >Orders</Button>
      <div
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'calc( 90vh - 36px )'
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
                <div className="mt-2 mb-2">
                  <h2 className="text-center">Order Information</h2>
                </div>
                <Grid xs={12}>
                  <Box bgcolor='info.main' color='info.contrastText' p={2}>
                    <div className='flexrow justify-content-space-between ml-2'>
                      <span >
                        Order Date:
                        <Moment className='ml-2' format='YYYY-MM-DD HH:mm'>{date}</Moment>
                      </span>
                      <span className='mr-3'>Order Status: {orderStatus}</span>
                    </div>
                  </Box>
                </Grid>
                <div className="mt-2"></div>
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className='service-column pl-2'>Service</StyledTableCell>
                        <StyledTableCell align='right'>Price</StyledTableCell>
                        <StyledTableCell align='right'>Quantity</StyledTableCell>
                        <StyledTableCell align='center'>Status</StyledTableCell>
                        <StyledTableCell  align='right'>Tot. Price</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serviceList.map(service => (
                        <ServiceFormInOrderForm
                          key={service.service._id}
                          service={service}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) 
            
        }
        { ( loading || orderTotalPrice === '') ? (<Fragment></Fragment>) : (
          <div className='flexrow justify-content-flex-end text-bold mb-2'>
            Sub Total: {parseFloat(orderTotalPrice).toFixed(2)}
          </div>
        )}
      </div>      
      
    </Container>
  );
}

export  default SingleOrder
