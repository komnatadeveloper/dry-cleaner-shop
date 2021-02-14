import React, {useState, useContext} from 'react';
import {
  Container,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';

export const ChangePassword = () => {

  // userUpdateSelfPassword
  const authContext1 = useContext( authContext );
  const {
    loading, 
    userUpdateSelfPassword
  } = authContext1;
  const alertContext1 = useContext( alertContext );
  const { 
    setAlert
  } = alertContext1;

  const _textFieldMinWidth = 350;
  const [_isChangingPassword, _setIsChangingPassword ] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: '',
  });
  const {
    currentPassword,
    newPassword,
    confirmNewPassword
  } = formData;
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const _cbChangePassword = () => {
    // history.push('/user-main/account');    
    console.log('_cbChangePassword FIRED...');
    setFormData({      
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: '',  
    });
    _setIsChangingPassword(false);
  }

  const onSubmit = async (e) => {
    if ( newPassword !== confirmNewPassword ) {
      return setAlert('Passwords do not match!', "error");          
    }
    _setIsChangingPassword(true);
    userUpdateSelfPassword({
      formData: {...formData},
      cb: _cbChangePassword
    });
  }




  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <div 
        className='flexrow justify-content-center' 
        style={{minHeight:'90vh'}}
      >
        <div 
          className='flexcol h-100 justify-content-center'
          style={{minHeight:'90vh'}}
        >
          <form 
            className='col s12' 
            onSubmit = {onSubmit}
          >
            <div className="pt-4"></div>
            {
              _isChangingPassword 
                ? (
                  <div 
                    className='flexrow justify-content-center'
                    style={{
                      minHeight: 180,
                      paddingTop: 120
                    }}
                  >
                    <CircularProgress />
                  </div>
                )
                : (
                  <>

                    <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                      <TextField
                        placeholder='Enter Current Password'
                        label='Current Password'
                        required
                        id='currentPassword'
                        name='currentPassword'
                        value={currentPassword}
                        type='password'
                        onChange={e => onChange(e)}
                        variant='outlined'
                        fullWidth={true}
                      />
                    </div> 
                    <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                      <TextField
                        placeholder='Enter New Password'
                        label='New Password'
                        required
                        id='newPassword'
                        name='newPassword'
                        value={newPassword}
                        type='password'
                        onChange={e => onChange(e)}
                        variant='outlined'
                        fullWidth={true}
                      />
                    </div> 
                    <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                      <TextField
                        placeholder='Confirm New Password'
                        label='Confirm Password'
                        required
                        id='confirmNewPassword'
                        name='confirmNewPassword'
                        value={confirmNewPassword}
                        type='password'
                        onChange={e => onChange(e)}
                        variant='outlined'
                        fullWidth={true}
                      />
                    </div>
                  </>
                )
            }
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              disabled={_isChangingPassword}
              // type='submit'
              onClick={onSubmit}
            >
              {_isChangingPassword ? 'Please Wait...' : 'Change Password' }
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}
