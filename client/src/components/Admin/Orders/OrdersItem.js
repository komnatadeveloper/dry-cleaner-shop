import React, {useEffect} from "react";
import{  NavLink } from 'react-router-dom'
import Moment from "react-moment"
import {
  TableRow,
  TableCell,
  IconButton,
  Chip
} from '@material-ui/core';
import {  withStyles, createMuiTheme, ThemeProvider,  } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const OrdersItem = ({ order }) => {

  useEffect(() => {

  }, [order])

  const {
    _id,
    user,
    date,
    orderStatus,
    orderTotalPrice
  } = order;

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

  const _orderStatusCustomTheme = createMuiTheme({
    palette: {
      primary: {
        // Yellow -> '#ffeb3b'  deeporange -> '#e64a19'  amber -> '#ef6c00'
        main: '#ffeb3b',  // you can not write any hex color here. there is a list of colors supported. For further info, look at material ui colors
        contrastText: '#673ab7'  // white -> '#fafafa'
      },      
    }
  });



  return (
    <StyledTableRow>
      <StyledTableCell size='small'>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </StyledTableCell>
      <StyledTableCell size='small'>{user.username}</StyledTableCell>
      {/* <td>{orderStatus}</td> */}
      <StyledTableCell  align='right' size='small'>{orderTotalPrice.toFixed(2)}</StyledTableCell>
      <StyledTableCell  align='center' size='small'>
        <ThemeProvider theme={_orderStatusCustomTheme}>
          <Chip 
            color={ 
              orderStatus === 'In Progress' 
                ? 'secondary'
                : 'primary'            
            }
            label={orderStatus}
            size='small'
          />
        </ThemeProvider>
      </StyledTableCell>
      <StyledTableCell size='small'>
        {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
        {/* <Link
          to={`/dashboard/orders/edit/${_id}`}
          className='waves-effect waves-light btn-small grey darken-1 '
        >
          <i className='material-icons small'>edit</i>
        </Link> */}
        <IconButton
          component={NavLink}
          to={`/dashboard/orders/edit/${_id}`}
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrdersItem;
