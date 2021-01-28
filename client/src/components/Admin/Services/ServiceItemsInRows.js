import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import DeleteConfirmationModel from './DeleteConfirmationModal'
import { uint8ArrayToImageSource } from "../../../utils/helpers";
import M from 'materialize-css'

 const ServiceItemsInRows = ({serviceInfo, deleteService}) => {
  const { _id, serviceName, category, categoryName, image, servicePrice, featured } = serviceInfo
  useEffect(() => {
    // M.Modal.init(`service-delete-${_id}`);
    M.AutoInit()
  }, [])

  return (
    <tr>
      <td>{serviceName}</td>
      <td>
        <img src={uint8ArrayToImageSource(image.data)} width='80' />
      </td>
      <td>{categoryName}</td>
      {/* <td>{totalOrders}</td> */}
      <td className='right-align'>{servicePrice.toFixed(2)}</td>
      <td>
        {featured && (
          <span className="flexrow mp-0 justify-content-center">
            <i className='m-auto material-icons small'>done</i>
          </span>
        )}
      </td>
      <td className='center-align'>
        <a
          className='waves-effect waves-light modal-trigger mr-1'
          href={`#sd-${_id}`}
          // href={`#service-delete`}
          // onClick={e => deleteService(_id)}
        >
          <i className='material-icons small red-text'>delete_forever</i>
        </a>
        <Link
          to={`/dashboard/services/edit/${_id}`}
          className='waves-effect waves-light mr-1'
        >
          <i className='material-icons small grey-text text-darken-1'>edit</i>
        </Link>
        {/* MODAL BEGIN */}
        <div id={`sd-${_id}`} className='modal'>
          <div className='modal-content'>
            <h4>Delete Confirmation</h4>
            <p>Are you sure you want to delete Service?</p>
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
                onClick={e => deleteService(_id)}
                className='modal-close waves-effect waves-green btn-small ml-2'
              >
                Agree <i className='material-icons small  right'>send</i>
              </a>
            </span>
          </div>
        </div>
        {/* MODAL END */}
        {/* <DeleteConfirmationModel _id={_id} /> */}
      </td>
    </tr>
  );
}

export default ServiceItemsInRows
