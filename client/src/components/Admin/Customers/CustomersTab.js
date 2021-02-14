import React, {useContext, useEffect, Fragment } from 'react'
import {  NavLink} from 'react-router-dom';
import adminContext from '../../../context/admin/adminContext'
import CustomersItem from './CustomersItem'
import Spinner from '../../layout/Spinner'
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

const CustomersTab = () => {
  const adminContext1 = useContext(adminContext)
  const { loadCustomers, customers, loading } = adminContext1;

  useEffect(() => {
    if (customers.length === 0) {
      loadCustomers();
    }
  }, [])
  

  

  // const addCustomer = () => {
    
  //   const btn = <button data-target="modalCustomer" className="btn modal-trigger" />
  //   console.log('clicked add customer')  
    
     
  // }

  const StyledTableCell = withStyles( theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();
    
  

  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        minHeight:'90vh'
      }}
    >
      <div 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        {
          loading 
          ? (
              <div 
                className='flexrow justify-content-center'
                style={{
                  minHeight: 180,
                  paddingTop: 120
                }}
              >
                <CircularProgress />
              </div>
            )
          : (
            <div>

              <div>
                <h1 className='text-center mt-1 mb-1'>Customers</h1>          
              </div>
              {/* <AddCustomerModal /> */}
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>

                    <TableRow>
                      <StyledTableCell>
                        Name
                      </StyledTableCell>
                      <StyledTableCell>
                        Username
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        Balance
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Options
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {loading ? (
                        <Spinner></Spinner>
                      ) : (customers ? (
                        customers.map(customer => (
                          <CustomersItem key={customer._id} customer={customer} />
                        ))
                      ) : (
                        <Fragment></Fragment>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
        }
        <div className='mb-2 mt-2'>
          <Button
            component={NavLink}
            color={  'secondary'  }
            variant='contained'
            to='/dashboard/customers/add'
          >
            ADD CUSTOMER
          </Button>
        </div>        
      </div>
    </Container>
  );
}

export default CustomersTab


          // {
          //   customers ? (
          //     customers.map(customer => (
          //       <CustomersItem key={customer._id} customer={customer} />
          //     ))
          //   ) : (
          //     <Fragment></Fragment>
          //   );
          // }
