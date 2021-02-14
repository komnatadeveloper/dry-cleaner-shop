import React, { useContext, useEffect, useState } from "react";
import publicContext from "../../../../context/public/publicContext";
import SingleCategoryTab from "./SingleCategoryTab";
import CategoriesRow from './CategoriesRow';
const Services = () => {
  const publicContext1 = useContext(publicContext)
  const {
    publicServices,
    publicCategories
  } = publicContext1;

  const [publicServicesList, setPublicServicesList] = useState([]);
  const [servicesChoice, setServicesChoice] = useState(publicCategories[0].name);

  useEffect(() => {
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
      <div className="pt-4"></div>
      <div className='text-center  mb-2'>
        <h2>Categories</h2>
      </div>

        
      <CategoriesRow 
        publicCategories={publicCategories}  
        onClick={setServicesChoice}
        selectedCategoryName= {servicesChoice}
      />
      <div style={{height:'1rem'}}></div>
      <div style={{ margin: "auto" }} >
        { <SingleCategoryTab
            serviceList={publicServices.filter(
              serviceItem => serviceItem.categoryName === servicesChoice
            )}
          /> 
        }
      </div>
      
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




  