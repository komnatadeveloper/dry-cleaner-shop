import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Moment from "react-moment";
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

const PaymentItem = ({ payment }) => {
  useEffect(() => {}, [payment]);

  const { _id, customerId, date, amount } = payment;

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
      <StyledTableCell>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </StyledTableCell>
      <StyledTableCell>{customerId.username}</StyledTableCell>
      {/* <td>{orderStatus}</td> */}
      <StyledTableCell align='right'>{((-1) * amount).toFixed(2)}</StyledTableCell>
      <StyledTableCell align='center'> 
        {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
        {/* <Link
          to={`/dashboard/payments/edit/${_id}`}
          className='waves-effect waves-light btn-small grey darken-1 '
        >
          <i className='material-icons small'>edit</i>
        </Link> */}
        <IconButton
          component={NavLink}
          to={`/dashboard/payments/edit/${_id}`}
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PaymentItem;
