import React from 'react';
import{ Link, NavLink } from 'react-router-dom'
import Moment from "react-moment"
import {
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Chip
} from '@material-ui/core';
import {  withStyles, createMuiTheme, ThemeProvider,  } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

export const ActivitiesTableItem = ({activityItem}) => {
  const {
    _id,
    date,
    activityType,
    amount,
    orderId,
  } = activityItem;
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

  const _orderTypeCustomTheme = createMuiTheme({
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
      <StyledTableCell align='center' size='small'>
        <ThemeProvider theme={_orderTypeCustomTheme}>
          <Chip
            label={activityType}
            color={activityType === 'order' ? 'secondary' : 'primary'}
             size='small'
          />
        </ThemeProvider>        
      </StyledTableCell>
      <StyledTableCell align='center' size='small'>
        {
          orderId ? orderId.orderStatus : '-'
        }
      </StyledTableCell>
      <StyledTableCell  align='right' size='small'>
        {(amount * (-1)).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell  align='center' size='small'>
        <IconButton
          component={NavLink}
          to={ activityType === 'order' 
            ?  `/dashboard/orders/edit/${orderId._id}`
            : `/dashboard/payments/edit/${_id}`
          }
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
