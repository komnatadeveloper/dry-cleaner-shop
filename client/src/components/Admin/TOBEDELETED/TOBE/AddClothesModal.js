import React from 'react'

const AddClothesModal = () => {
  return (
    <div id="addClothesModal" className="modal">
      <div className="modal-content">

        <h1 className="center">Add Clothes</h1>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s3">
                <input placeholder="User Name" id="user_name" type="text" className="validate" />
                <label htmlFor="user_name">User Name</label>
              </div>
              <div className="input-field col s3">
                <input placeholder="First Name" id="first_name" type="text" className="validate" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s3">
                <input id="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s3">
                <input id="sur_name" type="text" className="validate" />
                <label htmlFor="sur_name">Surname</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s4">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s4">
                <input id="phone1" type="text" className="validate" />
                <label htmlFor="phone1">Phone 1</label>
              </div>
              <div className="input-field col s4">
                <input id="phone2" type="text" className="validate" />
                <label htmlFor="phone2">Phone 2</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="address" type="text" className="validate" />
                <label htmlFor="address">Address</label>
              </div>
            </div>


          </form>
        </div>


      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat red">Add Customer</a>
      </div>
    </div>
  )
}

export default AddClothesModal
