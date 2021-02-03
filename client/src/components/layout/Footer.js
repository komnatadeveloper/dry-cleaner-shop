import React from 'react'
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import EmailIcon from '@material-ui/icons/Email';

const Footer = () => {
  return (
    <footer className='page-footer'>
      <Grid container spacing={0}>
        <Grid xs={12} md={6}>
          <div className="flexrow justify-content-center">

            <div className="flexcol justify-content-flex-start">
              <h3 className='text-white  mb-2 mt-2'>Newsletter</h3>
              <div style={{maxWidth: 400, minWidth:300}}>
                <TextField
                  fullWidth
                  placeholder='Enter Email'
                  label='Enter Email'
                  type='email'
                />
              </div>
              <div className='mt-2'>
                <Button
                  color='primary'
                  variant='contained'
                >
                  SUBSCRIBE
                </Button>
              </div>

            </div>
          </div>
        </Grid>
        <Grid xs={12} md={6}>
          <div className="flexrow justify-content-center">

            <div className="flexcol justify-content-flex-start">
              <h3 className='text-white mb-2 mt-2'>Contact</h3>
              <div className='flexrow mb-2' style={{maxWidth: 400, minWidth:300}}>
                <LocationOnIcon style={{color:'white'}}/>
                <span className='mt-0 ml-4 text-white'>
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </span>
              </div>
              <div className='flexrow mb-2' style={{maxWidth: 400, minWidth:300}}>
                <LocalPhoneIcon style={{color:'white'}}/>
                <span className='mt-0 ml-4 text-white'>
                    +2 444 5555 666
                  </span>
              </div>
              <div className='flexrow mb-2' style={{maxWidth: 400, minWidth:300}}>
                <EmailIcon style={{color:'white'}}/>
                <span className='mt-0 ml-4 text-white'>
                    komnatadeveloper@gmail.com
                  </span>
              </div>
              

            </div>
          </div>
        </Grid>
        <Grid xs={12}>
          <div className='mb-2 mt-4 text-white' style={{marginLeft: 100}}>© 2021 Copyright Text</div>
        </Grid>
      </Grid>
      
    </footer>
  );
}

export default Footer;
