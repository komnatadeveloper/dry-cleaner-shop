import React, { useContext, useEffect } from 'react'
import publicContext from '../../../../context/public/publicContext'
import ServicesItem from './ServicesItem'
import M from 'materialize-css'

const DryCleanTab = () => {
  const publicContext1 = useContext(publicContext)
  const { publicServices } = publicContext1
  const dryCleanList = publicServices && publicServices.filter(item => item.serviceType === 'Dry Clean')
  
  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <div>
      <div className='row'>


        {dryCleanList && dryCleanList.map(service => (
          <ServicesItem
            key={service._id}
            service={service}
          />
        ))}


      </div>
    </div>
  )
}

export default DryCleanTab
