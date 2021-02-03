import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Moment from 'react-moment';
import {
  Container,
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const OrdersItem = ({ order }) => {
  useEffect(() => {}, [order]);

  const {
    _id,
    // eslint-disable-next-line
    user,
    date,
    // eslint-disable-next-line
    serviceList,
    orderStatus,
    orderTotalPrice
  } = order;

  let calculatedTotalPrice = 0;
  if( !orderTotalPrice ) {
    for( let i = 0; i < serviceList.length; i++ ) {
      calculatedTotalPrice += serviceList[i].unitTotalPrice;  
    }
  }

  const StyledTableRow = withStyles( (theme) => ({
    root: {
      '&:nth-of-type(odd)':{ 
        backgroundColor:  theme.palette.action.hover,        
      },
    }
  }))(TableRow);

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
    <StyledTableRow>
      <StyledTableCell size='small'>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </StyledTableCell>
      <StyledTableCell size='small' align='right'>
        {
          orderTotalPrice 
            ? orderTotalPrice.toFixed(2)
            : calculatedTotalPrice.toFixed(2)
        }
      </StyledTableCell>
      <StyledTableCell size='small' align='center'>
        <span className='badge red'>{orderStatus}</span>
      </StyledTableCell>
      <StyledTableCell size='small'>
        <IconButton
          component={NavLink}
          to={`/user-main/orders/${_id}`}
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrdersItem;
