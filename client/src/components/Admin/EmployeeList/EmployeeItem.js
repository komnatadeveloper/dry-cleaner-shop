import React from 'react';
import { NavLink} from 'react-router-dom';
import {
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core';
import {  withStyles,   } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const EmployeeItem = ({employee}) => {

  const {
    _id,
    username,
    email
  } = employee;

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
        {username}
      </StyledTableCell>
      <StyledTableCell size='small'>{email}</StyledTableCell>
      <StyledTableCell size='small' align='center'>
        <IconButton
          component={NavLink}
          to={`/dashboard/employee/edit/${_id}`}
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default EmployeeItem;
