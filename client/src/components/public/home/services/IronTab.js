import React, { useContext, useEffect } from 'react'
import publicContext from '../../../../context/public/publicContext'
import ServicesItem from './ServicesItem'
import M from 'materialize-css'

const IronTab = () => {
  const publicContext1 = useContext(publicContext)
  const { publicServices } = publicContext1
  const ironList = publicServices && publicServices.filter(item => item.serviceType === 'Iron')

  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <div>
      <div className='row'>


        {ironList && ironList.map(service => (
          <ServicesItem
            key={service._id}
            service={service}
          />
        ))}


      </div>
    </div>
  )
}

export default IronTab
