import React, { useContext, useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import { uint8ArrayToImageSource } from "../../../utils/helpers";
import admincontext from '../../../context/admin/adminContext'

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

 const ServiceItemsInRows = ({serviceInfo}) => {
  const adminContext1 = useContext(admincontext)
  const { deleteService} = adminContext1;
  const { _id, serviceName, category, categoryName, image, servicePrice, featured } = serviceInfo;
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const _handleClickOpenDeleteModal = () => {
    setIsModalOpen(true);
  }
  const _handleClickCloseDeleteModal = () => {
    setIsModalOpen(false);
  }
  const [ isDeleting, setIsDeleting ] = useState(false);
  const _cbDeleteService = () => setIsDeleting(false);


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

  const useStylesAvatar = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    }
  }));
  const classes = useStylesAvatar();

  return (
    <StyledTableRow>
      <StyledTableCell>{serviceName}</StyledTableCell>
      <StyledTableCell>
        <Avatar 
          src={uint8ArrayToImageSource(image.data)} 
          alt={serviceName}
          variant='circular'
          className={classes.large}
        />
      </StyledTableCell>
      <StyledTableCell>{categoryName}</StyledTableCell>
      <StyledTableCell align='right'>{servicePrice.toFixed(2)}</StyledTableCell>
      <StyledTableCell align='center'>
        {featured && (
          <DoneOutlineIcon />
        )}
      </StyledTableCell>
      <StyledTableCell align='center'>
        {
          isDeleting 
          ? (
              <p>Deleting...</p>
            )
          : (
              <>
                <IconButton
                  component={NavLink}
                  to={`/dashboard/services/edit/${_id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={_handleClickOpenDeleteModal}
                  color="secondary"        
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
          ) 
        }        
        <Dialog
          open={isModalOpen}
          onClose= {_handleClickCloseDeleteModal}
          aria-labelledby={`sd-${_id}-title`}
          aria-describedby={`sd-${_id}-description`}
        >
          <DialogTitle
            id={`sd-${_id}-title`}
          >
            Delete Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={`sd-${_id}-description`}>
              Are you sure you want to delete Service?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={_handleClickCloseDeleteModal} 
              color='default'
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                _handleClickCloseDeleteModal();
                setIsDeleting(true);
                deleteService(
                  _id,
                  _cbDeleteService
                );
              }}
              color='secondary'
            >Delete</Button>
          </DialogActions>          
        </Dialog>
        {/* MODAL END */}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ServiceItemsInRows
