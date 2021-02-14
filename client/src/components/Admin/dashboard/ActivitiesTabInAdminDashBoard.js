import React from 'react'
import ActivityItem from './ActivityItem'
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

const ActivitiesTavInAdminDashBoard = ({activitiesList}) => {
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
    
        
            <div>
              <h2 className='text-center mt-2 mb-1'>Latest Activities</h2>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        Date
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Type
                      </StyledTableCell>
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell align='right'>Amount</StyledTableCell>
                      <StyledTableCell align='center'>Status</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>

                <TableBody>
                  {activitiesList ? (
                    activitiesList.length > 0 &&
                    activitiesList.map(activityItem => (
                      <ActivityItem key={activityItem._id} activity={activityItem} />
                    ))
                  ) : (
                    <></>
                  )}
                </TableBody>
                </Table>
              </TableContainer>
            </div>        


  );
}

export default ActivitiesTavInAdminDashBoard;
