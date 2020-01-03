import React from 'react'

const Footer = () => {
  return (
    <footer className='page-footer grey darken-3'>
      <div className='container'>
        <div className='row'>
          <div className='col l6 s12'>
            <h5 className='white-text'>Newsletter</h5>
            <div className='row mp-0'>
              <div className='input-field'>
                <input
                  placeholder='Enter Email'
                  id='email'
                  type='email'
                  className='validate'
                  required
                />
                {/* <label for='first_name'>Email</label> */}
              </div>
            </div>
            <div className='row mp-0'>
              
              <a href='#!' className='waves-effect waves-light btn'>Subscribe</a>
            </div>
          </div>
          <div className='col l4 offset-l2 s12'>
            <h5 className='white-text'>Contact</h5>
            <ul>
              <li>
                <span className='flexrow justify-content-flex-start mb-2'>
                  <i className='white-text material-icons mr-2'>location_on</i>
                  <span className='mt-0 ml-2'>
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </span>
                </span>
              </li>
              <li>
                <span className='flexrow justify-content-flex-start mb-2'>
                  <i className='white-text material-icons mr-2'>local_phone</i>
                  <span className='mt-0 ml-2'>+2 444 5555 666</span>
                </span>
              </li>
              <li>
                <span className='flexrow justify-content-flex-start mb-2'>
                  <i className='white-text material-icons mr-2'>email</i>
                  <span className='mt-0 ml-2'>komnatadeveloper@gmail.com</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <div className='container'>© 2019 Copyright Text</div>
      </div>
    </footer>
  );
}

export default Footer
