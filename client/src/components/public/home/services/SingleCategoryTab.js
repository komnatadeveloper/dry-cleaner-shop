import React, { useContext, useEffect } from 'react'
import publicContext from '../../../../context/public/publicContext'
import ServicesItem from './ServicesItem'
import {
  Grid
} from '@material-ui/core'

const SingleCategoryTab = ({
  serviceList
}) => {
  const publicContext1 = useContext(publicContext)
  const { publicServices } = publicContext1 



  return (
      <Grid container space={0}>
        {serviceList && serviceList.map(service => (
          <ServicesItem
            key={service._id}
            service={service}
          />
        ))}
      </Grid>
     
  )
}

export default SingleCategoryTab
