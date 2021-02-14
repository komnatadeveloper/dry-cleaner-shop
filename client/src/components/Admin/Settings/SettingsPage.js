import React from 'react';
import {
  Container, 
} from '@material-ui/core';

export const SettingsPage = () => {
  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <h1 className="text-center pt-2">Settings Page</h1>
    </Container>
  )
}
