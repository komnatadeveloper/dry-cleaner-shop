import React, {useEffect, useState, useContext} from "react";
import{ Link } from 'react-router-dom'
import Moment from "react-moment"
import adminContext from '../../../context/admin/adminContext'
import { uint8ArrayToImageSource } from "../../../utils/helpers";
import M from 'materialize-css'
import Spinner from '../../layout/Spinner';
const CategoriesItem = ({ categoryItem }) => {

  const [ isDeleting, setIsDeleting ] = useState(false);
  useEffect(() => {
    M.AutoInit()
  }, [categoryItem])
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



  return (
    <tr>      
      <td>
        <img src={uint8ArrayToImageSource(image.data)} width='80' />
      </td>
      {/* <td>{orderStatus}</td> */}
      <td >{name}</td>      
      <td>
        {
          isDeleting 
          ? (
              // <Spinner></Spinner>
              <p>Deleting...</p>
            )
          : (
              <p>
                <Link
                  to={`/dashboard/categories/edit/${_id}`}
                  className='waves-effect waves-light btn-small grey darken-1 '
                >
                  <i className='material-icons small'>edit</i>
                </Link>
                <a
                  // className='btn-small halfway-fab waves-effect waves-light modal-trigger red right mr-1'
                  className='btn-small halfway-fab waves-effect waves-light modal-trigger red  mr-1'
                  href={`#cd-${_id}`}          
                >
                  <i className='material-icons small'>delete</i>
                </a>
              </p>
          ) 
        }
        {/* MODAL BEGIN */}
        <div id={`cd-${_id}`} className='modal'>
          <div className='modal-content'>
            <h4>Delete Confirmation</h4>
            <p>Are you sure you want to delete Category?</p>
          </div>
          <div className='modal-footer'>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <a
                href='#!'
                className='modal-close waves-effect waves-green red btn-small mr-2'
                style={{ marginRight: "1rem" }}
              >
                Cancel <i className='material-icons small  right'>close</i>
              </a>
              <a
                href='#!'
                // onClick={e => deleteProduct(_id)}
                onClick={e => {
                  setIsDeleting(true);
                  deleteCategory(
                    _id, _finishDelete
                  );
                }}
                className='modal-close waves-effect waves-green btn-small ml-2'
              >
                Agree <i className='material-icons small  right'>send</i>
              </a>
            </span>
          </div>
        </div>
        {/* MODAL END */}
      </td>
    </tr>
  );
};

export default CategoriesItem;
