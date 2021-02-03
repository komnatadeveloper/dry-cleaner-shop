import React, { useEffect, useState, useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import adminContext from '../../../context/admin/adminContext';
import {
  Container,
  Button,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DetailsIcon from '@material-ui/icons/Details';

const CustomersItem = (
 {customer}
) => {
  const adminContext1 = useContext(adminContext)
  const { deleteCustomer  } = adminContext1;

  const [isDeletingCustomer, setIsDeletingCustomer ] = useState(false);
  const _cbDeleteCustomer = anyData => setIsDeletingCustomer(false);

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
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  useEffect(() => {
      console.log(customer);
    }, [customer]
  );


  const {
    _id,
    name,
    // eslint-disable-next-line
    middleName,
    surName,
    username,
    // eslint-disable-next-line
    email,
    balance,
    // eslint-disable-next-line
    address
  } = customer;

  const fullName = ([name, surName].join(' ')).trim()


  return (
    <StyledTableRow 
      key={_id}      
    >
      <StyledTableCell size='small' component='th' scope='row'>{fullName}</StyledTableCell>
      <StyledTableCell size='small' component='th' scope='row'>{username}</StyledTableCell>
      <StyledTableCell size='small' component='th' align='right' scope='row'>
        {balance.toFixed(2)}
      </StyledTableCell>
      <StyledTableCell size='small' component='th' align='center' scope='row'>
        {
          isDeletingCustomer 
          ? (
              <>Deleting...</>
            )
          : (
            <>
              <IconButton>
                <EditIcon />
              </IconButton>
              {/* <a className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Edit
              </a> */}
              {/* <a 
                className='waves-effect waves-light red darken-1 btn-small mr-1'
                onClick={e => {
                  e.preventDefault();
                  setIsDeletingCustomer(true);
                  deleteCustomer({
                    id: _id,
                    cb: _cbDeleteCustomer
                  });
                }}
                >
                Delete
              </a> */}
              <IconButton
                color='secondary'
                onClick={e => {
                  e.preventDefault();
                  setIsDeletingCustomer(true);
                  deleteCustomer({
                    id: _id,
                    cb: _cbDeleteCustomer
                  });
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
              <IconButton
                component={NavLink}
                to={`/dashboard/customers/edit/${_id}`} 
              >
                <DetailsIcon />
              </IconButton>
              {/* <Link to={`/dashboard/customers/edit/${_id}`} className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Details
              </Link> */}
            </>
          )
        }
      </StyledTableCell>


      {/* <td>{totalOrders}</td> */}
      {/* <td className='right-align'>
        
      </td> */}
      {/* <td className='center-align'>
        {
          isDeletingCustomer 
          ? (
              <>Deleting...</>
            )
          : (
            <>
              <a className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Edit
              </a>
              <a 
                className='waves-effect waves-light red darken-1 btn-small mr-1'
                onClick={e => {
                  e.preventDefault();
                  setIsDeletingCustomer(true);
                  deleteCustomer({
                    id: _id,
                    cb: _cbDeleteCustomer
                  });
                }}
              >
                Delete
              </a>
              <Link to={`/dashboard/customers/edit/${_id}`} className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Details
              </Link>
            </>
          )
        }
      </td> */}
    </StyledTableRow>
  );
};

export default CustomersItem