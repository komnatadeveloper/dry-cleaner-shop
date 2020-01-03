import React, { useContext, useEffect, useState } from "react";
import publicContext from "../../../../context/public/publicContext";
import FeaturedServicesTab from "./FeaturedServicesTab";
import IronTab from "./IronTab";
import DryCleanTab from "./DryCleanTab";
import M from 'materialize-css'


const Services = () => {
  const publicContext1 = useContext(publicContext)
  const {
    publicServices
  } = publicContext1

  const [publicServicesList, setPublicServicesList] = useState([]);
  const [servicesChoice, setServicesChoice] = useState('featured')

  useEffect(() => {
    // eslint-disable-next-line
    M.AutoInit()
    // eslint-disable-next-line
    setPublicServicesList(publicServices);
    // eslint-disable-next-line
  }, [publicServicesList]);

  const handleFeaturedClick = e => {
    e.preventDefault();
    setServicesChoice('featured')    
  }
  const handleDryCleanClick = e => {
    e.preventDefault();
    setServicesChoice('Dry Clean')    
  }
  const handleIronClick = e => {
    e.preventDefault();
    setServicesChoice('Iron')    
  }


  return (
    <div>
      <div className='center'>
        <h2>Services</h2>
      </div>
      <div className='row'>
        {/* Services Nav Menu */}
        <nav id='home-services-nav' className='white  z-depth-0'>
          <div>
            <ul className='flexrow justify-content-space-around'>
              <li>
                <a
                  onClick={e => handleFeaturedClick(e)}
                  href='#!'
                  className={
                    servicesChoice === "featured"
                      ? "red-text  border-bottom"
                      : "red-text text-lighten-3"
                  }
                >
                  <span>FEATURED</span>
                </a>
              </li>
              <li>
                <a
                  onClick={e => handleDryCleanClick(e)}
                  href='#!'
                  className={
                    servicesChoice === "Dry Clean"
                      ? "red-text  border-bottom"
                      : "red-text text-lighten-3"
                  }
                >
                  DRY CLEAN
                </a>
              </li>
              <li>
                <a
                  onClick={e => handleIronClick(e)}
                  href='#!'
                  className={
                    servicesChoice === "Iron"
                      ? "red-text  border-bottom"
                      : "red-text text-lighten-3"
                  }
                >
                  IRON
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/*  END OF SERVICES MENU */}
        <div style={{ margin: "auto" }} className='col s12'>
          {servicesChoice === "featured" && <FeaturedServicesTab />}
          {servicesChoice === "Dry Clean" && <DryCleanTab />}
          {servicesChoice === "Iron" && <IronTab />}
        </div>
      </div>
      {/* This Section Will Be DISABLED Due to Jquery Overlap Problem */}
      {/* This Section Will Be DISABLED Due to Jquery Overlap Problem */}
      {/* <div className='row'>
        <div className='col s12'>
          <ul className='tabs'>
            <li className='tab col s2'>
              <a href='#featuredServices'>Featured</a>
            </li>
            {/* <li class="tab col s3"><a class="active" href="#clothesTab">Clothes</a></li> */}
      {/* <li className='tab col s2'>
              <a href='#ordersTab'>Dry Clean</a>
            </li>
            <li className='tab col s2'>
              <a href='#servicesTab'>Iron</a>
            </li>
          </ul>
        </div>
        <div id='customersTab' className='col s12'>
          <FeaturedServicesTab />
        </div>
        <div id='ordersTab' className='col s12'>
          <DryCleanTab />
        </div>
        <div id='servicesTab' className='col s12'>
          <IronTab />
        </div>
      </div> */}
      {/* END OF This Section Will Be DISABLED Due to Jquery Overlap Problem */}
    </div>
  );
}

export default Services



// 2019.31.12 00.49 BACK UP
// import React, { useContext, useEffect, useState, Fragment } from "react";
// import ServicesItem from './ServicesItem'
// import publicContext from "../../../../context/public/publicContext";

// const Services = () => {
//   const publicContext1 = useContext(publicContext)
//   const {
//     publicServices
//   } = publicContext1

//   const [publicServicesList, setPublicServicesList] = useState([]);

//   useEffect(() => {
//     setPublicServicesList(publicServices);


//     console.log(publicServicesList);
//   }, [publicServicesList]);


//   return (
//     <div className='center'>
//       <h1>Featured</h1>
//       Featured Services List: {publicServicesList.length}
//       <div className='row'>


//         {publicServicesList.map(service => (
//           <ServicesItem
//             key={service._id}
//             service={service}
//           />
//         ))}


//       </div>
//       {/* <ServicesItem />
//       <ServicesItem />
//       <ServicesItem /> */}
//     </div>
//   );
// }

// export default Services




  