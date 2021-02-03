
import React from 'react'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles( theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);



  export const StyledTableRow = withStyles( (theme) => ({
    root: {
      '&:nth-of-type(odd)':{ 
        backgroundColor:  theme.palette.action.hover,        
      },
    }
  }))(TableRow);




  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  
  export const CustomTable = (children) => {
    const classes = useStyles();

    return (<TableContainer component={Paper}>
        <Table className={classes.table}>
          {children}
        </Table>
      </TableContainer>
    );
  }

  // example Table
  let exampleTable = ( ) => (
    <CustomTable>
      <TableHead>
        <TableRow>
          <StyledTableCell>
            Name
          </StyledTableCell>
          <StyledTableCell>
            Username
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow 
          key={'ddd'}      
        >
          <StyledTableCell size='small' component='th' scope='row'>
            VALUE A
          </StyledTableCell>
          <StyledTableCell size='small' component='th' scope='row'>
            VALUE B
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </CustomTable>
  );


