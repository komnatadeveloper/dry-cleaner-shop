import React, { useContext, useEffect, useState, Fragment } from "react";
import ServicesItem from './ServicesItem'
import publicContext from "../context/public/publicContext";

const Services = () => {
  const publicContext1 = useContext(publicContext)
  const {
    featuredServices
  } = publicContext1

  const [featuredServicesList, setFeaturedServicesList] = useState([]);

  useEffect(() => {
    setFeaturedServicesList(featuredServices);

    
    console.log(featuredServicesList);
  }, [featuredServices]);


  return (
    <div className='center'>
      <h1>Featured</h1>
      Featured Services List: {featuredServicesList.length}
      <div className='row'>
        

          {featuredServicesList.map(service => (
            <ServicesItem
              key={service._id}
              service= {service}
            />
          ))}

        
      </div>
      {/* <ServicesItem />
      <ServicesItem />
      <ServicesItem /> */}
    </div>
  );
}

export default Services




  