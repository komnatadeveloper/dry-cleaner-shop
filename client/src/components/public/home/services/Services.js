import React, { useContext, useEffect, useState } from "react";
import publicContext from "../../../../context/public/publicContext";
import SingleCategoryTab from "./SingleCategoryTab";
import M from 'materialize-css'
const Services = () => {
  const publicContext1 = useContext(publicContext)
  const {
    publicServices,
    publicCategories
  } = publicContext1

  const [publicServicesList, setPublicServicesList] = useState([]);
  const [servicesChoice, setServicesChoice] = useState(publicCategories[0].name);

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
              {
                publicCategories && publicCategories.length > 0 &&
                publicCategories.map(
                  categoryItem => (
                    <li>
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setServicesChoice(categoryItem.name);
                        }}
                        href='#!'
                        className={
                          servicesChoice === categoryItem.name
                            ? "red-text  border-bottom"
                            : "red-text text-lighten-3"
                        }
                      >
                        <span>{categoryItem.name}</span>
                      </a>
                    </li>
                  )
                )
              }             
            </ul>
          </div>
        </nav>
        {/*  END OF SERVICES MENU */}
        <div style={{ margin: "auto" }} className='col s12'>
          {/* {servicesChoice === "featured" && <FeaturedServicesTab />}
          {servicesChoice === "Dry Clean" && <DryCleanTab />}
          {servicesChoice === "Iron" && <IronTab />} */}
          { <SingleCategoryTab
              serviceList={publicServices.filter(
                serviceItem => serviceItem.categoryName === servicesChoice
              )}
            /> 
          }
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




  