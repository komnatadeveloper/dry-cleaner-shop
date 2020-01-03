import React, {useContext, useEffect} from 'react'
import publicContext from '../../../../context/public/publicContext'
import ServicesItem from './ServicesItem'
import M from 'materialize-css'


const FeaturedServicesTab = () => {
  const publicContext1 = useContext(publicContext)
  const { publicServices } = publicContext1
  const featuredServices = publicServices && publicServices.filter(item => !!item.featured )

  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <div>
      <div className='row'>


        {featuredServices && featuredServices.map(service => (
          <ServicesItem
            key={service._id}
            service={service}
          />
        ))}


      </div>
    </div>
  )
}

export default FeaturedServicesTab
