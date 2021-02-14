import React, {useContext, useEffect,  useState } from 'react'
import {  NavLink } from 'react-router-dom'
import CategoriesItem from './CategoriesItem'

import adminContext from '../../../context/admin/adminContext'
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



const CategoriesPage = () => {
  const adminContext1 = useContext(adminContext)
  const { 
    loadCategories,
    categories,
    loading, 
  } = adminContext1

  useEffect(() => {
    // eslint-disable-next-line
    loadCategories();
  }, []);

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
          <div>
            <h2 className='text-center mt-1 mb-1'>Categories</h2>            
          </div>
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
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Category Image</StyledTableCell>
                        <StyledTableCell>Category Name</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories ? (
                        categories.length > 0 &&
                        categories.map(categoryItem => (
                          <CategoriesItem 
                            key={categoryItem._id} 
                            categoryItem={categoryItem} 
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </TableBody>  
                  </Table>
                </TableContainer>
              )
          } 
        </div>
        <div className='mb-2 mt-2'>
          <Button
            component={NavLink}
            color={  'secondary'  }
            variant='contained'
            to='/dashboard/categories/add'
          >
            Add Category
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CategoriesPage
