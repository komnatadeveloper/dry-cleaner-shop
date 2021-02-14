import React from 'react';
import {
  TableRow,
  TableCell,
} from '@material-ui/core';
import {  withStyles } from '@material-ui/core/styles';

const ServiceRowInOrderForm = ({service}) => {
  const { quantity, unitPrice, unitServiceStatus, unitTotalPrice } = service;
  const {
    serviceName, 
    category // categoryId
  } = service.service;

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
      <StyledTableCell size='small'>{serviceName}</StyledTableCell>
      <StyledTableCell size='small' align='right'>${unitPrice.toFixed(2)}</StyledTableCell>
      <StyledTableCell size='small' align='right'>{quantity}</StyledTableCell>
      <StyledTableCell size='small' align='center'>{unitServiceStatus}</StyledTableCell>
      <StyledTableCell size='small' align='right'>${unitTotalPrice.toFixed(2)}</StyledTableCell>
    </StyledTableRow>
  )
}
export default ServiceRowInOrderForm;
