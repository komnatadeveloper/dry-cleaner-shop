import React, { useEffect, useContext, Fragment } from 'react'
import HomeHero from '../../components/HomeHero'
import Services from '../../components/Services'
import Spinner from '../layout/Spinner'
import publicContext from '../../context/public/publicContext'

const Home = () => {
  const publicContext1 = useContext(publicContext)
  const {
    getFeaturedServices,
    loading
  } = publicContext1
  
  useEffect(() => {
    getFeaturedServices();
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
