import React, {useEffect} from "react";
import{ Link, NavLink } from 'react-router-dom'
import Moment from "react-moment"
import {
  TableRow,
  TableCell,
  IconButton,
  Chip
} from '@material-ui/core';
import {  withStyles, createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const ActivityItem = ({ activity }) => {

  // useEffect(() => {

  // }, [activity])

  const {
    _id,
    activityType,
    customerId, // Object
    date,
    orderStatus,
    orderId, // Object
    amount
  } = activity;

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

  const _activityTypeCustomTheme = createMuiTheme({
    palette: {
      primary: {
        // Yellow -> '#ffeb3b'  deeporange -> '#e64a19'  amber -> '#ef6c00' green -> '#357a38'
        main: '#357a38',  // you can not write any hex color here. there is a list of colors supported. For further info, look at material ui colors
        contrastText: '#fafafa'  // white -> '#fafafa'
      },      
    }
  });



  return (
    <StyledTableRow>
      <StyledTableCell size='small'>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </StyledTableCell>
      <StyledTableCell size='small' align='center'>
        <ThemeProvider theme={_activityTypeCustomTheme}>
          <Chip
            label={activityType}
            color={activityType === 'order' ? 'secondary' : 'primary'}
             size='small'
          />
        </ThemeProvider> 
      </StyledTableCell>
      <StyledTableCell size='small'>{customerId.username}</StyledTableCell>
      {/* <td>{orderStatus}</td> */}
      <StyledTableCell  align='right' size='small'>{(amount * (-1)).toFixed(2)}</StyledTableCell>
      <StyledTableCell  align='center' size='small'>
        <span className='badge red center-align'>
          {orderId ? orderId.orderStatus : '-'}
        </span>
      </StyledTableCell>
      <StyledTableCell size='small'>
        <IconButton
          component={NavLink}
          to={
            activityType === 'order' 
              ? `/dashboard/orders/edit/${_id}`
              : `/dashboard/payments/edit/${_id}`
          }
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ActivityItem;
