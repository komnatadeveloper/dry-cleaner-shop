import React, {useEffect, useState} from 'react';
import {
  Container,
  CircularProgress,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
const EditEmployeePage = ({match}) => {
  const [_loading, _setLoading ] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      _setLoading(false);  // IT IS A FAKE LOADING EFFECT
    }, 500)
  }, []);

  return (
    <Container 
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}
    > 
      <h2 className="pt-2 pb-2 text-center">Employee Details</h2>
      {
          _loading 
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

            <div 
              className='flexrow justify-content-center'
              style={{
                minHeight:'90vh'
              }}       
            >
              <div 
                className='flexcol h-100  justify-content-center'
                style={{
                  minHeight:'90vh'
                }}       
              >

                <p>NOT AVAILABLE AT THE MOMENT</p>
              </div>

            </div>
          )
      }
    </Container>
  );
}

export  default EditEmployeePage;
