import React from 'react'

const CustomerLoginModal = () => {
  return (
    <div
      id='user-login'
      className='modal modal-fixed-footer'
      style={{ maxWidth: "630px", maxHeight: "500px" }}
    >
      <div
        style={{ maxWidth: "600px", maxHeight: "400px" }}
        className='modal-content center'
      >
        <h4 className='center'>User Login</h4>
        <p className='center'>Enter Your Login Info</p>

        <div className='row center-align'>
          <form className='col s12 m12 l12 center-align'>
            <div className='row s12'>
              <div
                style={{ maxWidth: "500px" }}
                className='input-field col s12 grey lighten-3 center-align'
              >
                <input
                  placeholder='Email or Phone'
                  id='first_name'
                  type='text'
                  className='validate s12 center-align'
                />
              </div>
              <div
                style={{ maxWidth: "500px" }}
                className='input-field col s12 grey lighten-3'
              >
                <input
                  placeholder='Password'
                  id='password'
                  type='password'
                  className='validate'
                />
                {/* <label for="last_name">Last Name</label> */}
              </div>

              <a className='waves-effect  btn-flat'>Sign Up</a>
              <p
                style={{
                  marginLeft: "50px",
                  marginRight: "50px",
                  display: "inline"
                }}
              >
                |
              </p>
              <a className='waves-effect  btn-flat'>Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
      {/* footer bası */}
      <div className='modal-footer center'>
        <a
          href='#!'
          onClick={e => {
            e.preventDefault();
            console.log("HELLLLOOO CUSTOMER LOGIN MODAL");
          }}
          className='modal-close waves-effect waves-green btn-large '
          style={{ marginBottom: "50px" }}
        >
          Agree
        </a>
      </div>
      {/* footer sonu */}
    </div>
  );
}

export default CustomerLoginModal;
