import React, { useEffect, useContext, Fragment } from 'react'
import HomeHero from './HomeHero'
import Services from './services/Services'
import Spinner from '../../layout/Spinner'
import publicContext from '../../../context/public/publicContext'
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


const Home = () => {
  const publicContext1 = useContext(publicContext)
  const {
    getServicesAndCategories,
    loading
  } = publicContext1
  
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    getServicesAndCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>

      {/* loading ? <Spinner></Spinner> */}

      <div>
        {/* {
          !loading && <HomeHero />
        } */}
        <HomeHero />
        <Container
          maxWidth='lg'
          style={{
            backgroundColor:'#ccc',
            minHeight:'90vh'
          }}
        >
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
              : <Services />
          }
          
        </Container>
      </div>

    </Fragment>
  )
}

export default Home;
