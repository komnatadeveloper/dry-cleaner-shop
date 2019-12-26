import React from 'react'

const DeleteConfirmationModal = ({_id, action}) => {
  return (
    <div id={`service-delete-${_id}`} className='modal'>
      <div className='modal-content'>
        <h4>Delete Confirmation</h4>
        <p>Are you sure you want to delete Service?</p>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-green btn-flat'>
          Agree
        </a>
      </div>
    </div>
  );
}

export default  DeleteConfirmationModal
