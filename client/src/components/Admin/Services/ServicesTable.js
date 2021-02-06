import React, {Fragment, useContext} from 'react'
import ServiceItemsInRows from './ServiceItemsInRows'
import {
  Container,
  CircularProgress,
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

const ServicesTable = ({services }) => {
  


  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();
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
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Service Name</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell align='center'>Featured</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {services ? (
                services.map(service => (
                  <ServiceItemsInRows 
                    key={service._id} 
                    serviceInfo={service} 
                  />
                ))
              ) : (
                <Fragment></Fragment>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
      )
  
}

export  default ServicesTable
