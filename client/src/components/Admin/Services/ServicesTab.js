import React, { useContext, useEffect  } from "react";
import {  NavLink} from 'react-router-dom'

import adminContext from "../../../context/admin/adminContext";
import ServicesTable from "./ServicesTable";
import {
  Container,
  CircularProgress,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';


const ServicesTab = () => {
  const adminContext1 = useContext(adminContext);
  const { 
    loadServices , 
    services,
    loading
   } = adminContext1;

  // productsTab , serviceTab
  // const [ currentSection, setCurrentSection ] = useState('serviceTab') 

  useEffect(() => {
    loadServices();
  }, []);

  // const addCustomer = () => {
  //   const btn = (
  //     <button data-target='modalCustomer' className='btn modal-trigger' />
  //   );
  //   console.log("clicked add customer");
  // };


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
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        <div>
          <h2 className='text-center mt-1 mb-1'>Services</h2>
          {
            loading 
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
                  <ServicesTable services={services} />
                )
          }
        </div>
        <div className='mb-2 mt-2'>
          <Button
            component={NavLink}
            color={  'secondary'  }
            variant='contained'
            to='/dashboard/services/add'
          >
            Add Service
          </Button>
        </div>
      </div> 
    </Container>
  );
};

export default ServicesTab;
