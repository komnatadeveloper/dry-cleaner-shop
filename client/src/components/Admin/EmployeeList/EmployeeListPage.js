import React, {useEffect, useContext, useState} from 'react';
import { NavLink} from 'react-router-dom';
import {
  CircularProgress,
  Container,
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
import  adminContext from '../../../context/admin/adminContext.js';
import EmployeeItem from './EmployeeItem.js';

export const EmployeeListPage = () => {
  const adminContext1 = useContext(adminContext);
  const {
    loadEmployeeList,
    loading
  } = adminContext1;
  const [ _loading, _setLoading ] = useState(true);
  const [ _employeeList, _setEmployeeList ] = useState([]);
  const _cbHandleEmployeeListFromApi = (res) => {
    console.log(res);
    _setEmployeeList(res);
    _setLoading(false);
  }

  useEffect(() => {
    loadEmployeeList({
      cb: _cbHandleEmployeeListFromApi
    });
  }, []);


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
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <div 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      > 
        <div>
          <h1 className="text-center pt-2 pb-2">Employee List Page</h1>
          {
            _loading 
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

                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          Username
                        </StyledTableCell>
                        <StyledTableCell>
                          Email
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          Actions
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        _employeeList && _employeeList.length > 0 && _employeeList.map(
                          employeeItem => (
                            <EmployeeItem
                              key={employeeItem._id}
                              employee={employeeItem}
                            />
                          )
                        )

                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              )
          }
        </div>
        <div className='mb-2 mt-2'>
          <Button
            component={NavLink}
            to='/dashboard/employee/add'
            color='secondary'
            variant='contained'
          >
            Add Employee
          </Button>
        </div>

      </div>
    </Container>
  );
}
