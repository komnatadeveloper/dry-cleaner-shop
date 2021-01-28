import React, { useContext, useEffect } from 'react'
import publicContext from '../../../../context/public/publicContext'
import ServicesItem from './ServicesItem'
import M from 'materialize-css'

const SingleCategoryTab = ({
  serviceList
}) => {
  const publicContext1 = useContext(publicContext)
  const { publicServices } = publicContext1 

  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <div>
      <div className='row'>
        {serviceList && serviceList.map(service => (
          <ServicesItem
            key={service._id}
            service={service}
          />
        ))}
      </div>
    </div>
  )
}

export default SingleCategoryTab
