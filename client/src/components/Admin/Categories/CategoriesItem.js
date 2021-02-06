import React, {useEffect, useState, useContext} from "react";
import{ Link, NavLink } from 'react-router-dom'
import Moment from "react-moment"
import adminContext from '../../../context/admin/adminContext'
import { uint8ArrayToImageSource } from "../../../utils/helpers";
import Spinner from '../../layout/Spinner';
// import { StyledTableCell, StyledTableRow } from "../../layout/CustomTable";
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
const CategoriesItem = ({ categoryItem }) => {

  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const _handleClickOpenDeleteModal = () => {
    setIsModalOpen(true);
  }
  const _handleClickCloseDeleteModal = () => {
    setIsModalOpen(false);
  }
  const {
    _id,
    image,
    name,
    date,
    orderStatus,
    orderTotalPrice
  } = categoryItem;

  const adminContext1 = useContext(adminContext)
  const { 
    loadOrders, 
    loadCategories,
    deleteCategory,
    categories,
    orders, 
    loading, 
    loadPayments, 
    payments
  } = adminContext1

  const _finishDelete = () => {
    setIsDeleting(false);
  }
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
    <StyledTableRow
      key={_id}
    >      
      <StyledTableCell>
        {/* <img src={uint8ArrayToImageSource(image.data)} width='80' /> */}
        <Avatar 
          src={uint8ArrayToImageSource(image.data)} 
          alt={name}
          variant='circular'
          className={classes.large}
          // width='80' 
        />
      </StyledTableCell>
      {/* <td>{orderStatus}</td> */}
      <StyledTableCell >{name}</StyledTableCell>      
      <StyledTableCell>
        {
          isDeleting 
          ? (
              // <Spinner></Spinner>
              <p>Deleting...</p>
            )
          : (
              <>
                <IconButton
                  component={NavLink}
                  to={`/dashboard/categories/edit/${_id}`}
                >
                  <EditIcon />
                </IconButton>
                {/* <Link
                  to={`/dashboard/categories/edit/${_id}`}
                  className='waves-effect waves-light btn-small grey darken-1 '
                >
                  <i className='material-icons small'>edit</i>
                </Link> */}
                <IconButton
                  onClick={_handleClickOpenDeleteModal}
                  color="secondary"
                  // className='btn-small halfway-fab waves-effect waves-light modal-trigger red right mr-1'
                  // className='btn-small halfway-fab waves-effect waves-light modal-trigger red  mr-1'
                  // href={`#cd-${_id}`}          
                >
                  {/* <i className='material-icons small'>delete</i> */}
                  <DeleteForeverIcon />
                </IconButton>
              </>
          ) 
        }
        {/* MODAL BEGIN */}
        <Dialog
          open={isModalOpen}
          onClose= {_handleClickCloseDeleteModal}
          aria-labelledby={`cd-${_id}-title`}
          aria-describedby={`cd-${_id}-description`}
        >
          <DialogTitle
            id={`cd-${_id}-title`}
          >
            Delete Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={`cd-${_id}-description`}>
              Are you sure you want to delete Category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={_handleClickCloseDeleteModal} color='primary'>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                _handleClickCloseDeleteModal();
                setIsDeleting(true);
                deleteCategory(
                  _id, _finishDelete
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
};

export default CategoriesItem;
