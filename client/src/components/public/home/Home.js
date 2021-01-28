import React, { useEffect, useContext, Fragment } from 'react'
import HomeHero from './HomeHero'
import Services from './services/Services'
import Spinner from '../../layout/Spinner'
import publicContext from '../../../context/public/publicContext'

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
      {loading ? (<Spinner></Spinner>
      ) : (
      <div>
        <HomeHero />
        <Services />
      </div>)
      }
    </Fragment>
  )
}

export default Home;
