import React, {useEffect, useState} from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';

const ServiceItemInOrders = ({
  service,  // It is an Object
  changeQuantity,  
  statusList,
  setServiceStatus
}) => {
  
  const {
    serviceName,
    quantity,
    // servicePrice, // after transform unitPrice exists, servicePrice DOESN'T Exist
    unitPrice,
    // eslint-disable-next-line
    unitServiceStatus,
    // eslint-disable-next-line
    unitTotalPrice
  } = service;
  const serviceId = service.service;


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

  const useStyles = makeStyles( (theme) => ({
    textField: {
      textAlign:'center',
      display:'inline-block'
    }
  }));
  const classes = useStyles();

  return (
    <StyledTableRow>
      <StyledTableCell>{serviceName}</StyledTableCell>
      <StyledTableCell>{unitPrice.toFixed(2)}</StyledTableCell>
      <StyledTableCell align='center'> 
        <div 
          className='inside-div-input-text-center' 
          style={{width: 80, display:'inline-block'}}
        >
          <TextField
            className={classes.textField}
            fullWidth={true}
            value={quantity}
            autoComplete={false}
            onChange={e =>
              changeQuantity({ service: serviceId, newValue: e.target.value })
            }
          />
        </div>
      </StyledTableCell>

      {/* <td>{"In Progress"}</td> */}
      <StyledTableCell align='center'>
        {/* <div className='browser-default ml-2'> */}
          <Select
            value={unitServiceStatus}
            onChange={e =>
              setServiceStatus({
                service: serviceId,
                selectValue: e.target.value
              })
            }
          >
            {statusList.map(status => {
              console.log(status);
              console.log(status.servStatus);
              console.log(status.description);
              return (
                <MenuItem
                  key={status.servStatus}
                  value={status.servStatus}
                  // selected ={ status1 === status.servStatus && true}
                >
                  {/* BADGES and COLORS are maybe in future, because badge and colors for select are tricky */}
                  {status.servStatus}
                </MenuItem>
              );
            })}
          </Select>
          {/* <select
            onChange={e =>
              setServiceStatus({
                service: serviceId,
                selectValue: e.target.value
              })
            }
          >
            {statusList.map(status => {
              console.log(status);
              console.log(status.servStatus);
              console.log(status.description);
              return (
                <option
                  key={status.servStatus}
                  value={status.servStatus}
                >
                  
                  {status.servStatus}
                </option>
              );
            })}
          </select> */}
        {/* </div> */}
      </StyledTableCell>

      <StyledTableCell  align='right' style={{fontWeight:'bold'}}>{unitTotalPrice.toFixed(2)}</StyledTableCell>
    </StyledTableRow>
  );
};


  // serviceList[
  //   {
  //     service: "5df55f1fcac13bc2d8220c01",
  //     productName: "Pants",
  //     quantity: 10,
  //     unitPrice: 10,
  //     unitServiceStatus: "In Progress",
  //     serviceType: "Iron",
  //     servicePrice: 14.05
  //   }
  // ]; 

export  default ServiceItemInOrders
