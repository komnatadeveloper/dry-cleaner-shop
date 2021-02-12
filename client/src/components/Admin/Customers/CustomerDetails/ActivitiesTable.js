import React from 'react';
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
import { ActivitiesTableItem } from './ActivitiesTableItem';


export const ActivitiesTable = ({
  activitiesList
}) => {
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
            <StyledTableCell align='center'>
              Status
            </StyledTableCell>
            <StyledTableCell  align='right'>
              Amount
            </StyledTableCell>
            <StyledTableCell align='center'>
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            activitiesList && activitiesList.length > 0 && (
              activitiesList.map( activityItem => (
                <ActivitiesTableItem
                  activityItem={activityItem}
                />
              ))
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
