import React, {useContext, useState, Fragment, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext'
import ProductRowForAddService from "./ProductRowForAddService";
import Spinner from '../../layout/Spinner';
import { uint8ArrayToImageSource } from "../../../utils/helpers";

const AddService = ({match, history}) => {
  const adminContext1 = useContext(adminContext);
  const {
    loadQueriedProducts,
    loadQueriedCategories,
    serviceQuery,
    productsQuery,
    addNewService,
    updateService,
    loadSingleService,
    // serviceToBeEditted, 
    loading,
    setAdminLoading
  } = adminContext1;

  const [formData, setFormData] = useState({
    categoryName: '',
    category: null, // categoryId
    image: null,
    serviceName: '',
    servicePrice: "",
    featured: false
  });

  const [ queriedCategoriesList, setQueriedCategoriesList ] = useState([]);
  const _setQueriedCategories = (arr) => {
    setQueriedCategoriesList(arr);
  }

  const fileSelectedHandler = e => {
    // If Not a New Service, but Editting
    if(match.params.serviceId) {
      // I couldnt create image file with .png etc extension so, unless we update image file, we will not send API an image.
      setFormData({
        ...formData,
        image: e.target.files[0],
        isImageUpdated: true
      });
    } else { // if not an update but ADD NEW SERVICE
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  // If Not a New Service, but Editting. Update this form states, by async function at the adminContext loadSingleService method
  const next = res => {

    if(!res) {
      return history.push('/dashboard/services')
    }
    setFormData({
      ...formData,
      categoryName: res.categoryName || "",
      category: res.category || null,
      image: res.image || null, // TO BE UPDATED in FUTURE
      serviceName: res.serviceName || "",
      servicePrice: res.servicePrice || "",
      featured: res.featured || false,
    });
    console.log(formData);
  }


  useEffect( () => {
    // If Not a New Service, but Editting
    if(match.params.serviceId) {
    // Do smt
      // loadSingleService({serviceId: match.params.serviceId,}).then(res => {
      // updateFormFromBackend(res);
      loadSingleService({serviceId: match.params.serviceId, next})

        // console.log(formData);
      } else {
        setAdminLoading(false)
      }
  }, [])
  


  // const [ productSearch, setProductSearch ] = useState(false)
  const { 
    categoryName,
    category,  // categoryId 
    servicePrice, 
    serviceName,
    featured 
  } = formData




  const onChange = (e) => {
    setFormData( {
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitAddorUpdate = e => {
    setFormData({
      ...formData,
      servicePrice: Number.parseFloat(servicePrice).toFixed(2)
    });
    if(match.params.serviceId) {
      updateService({ formData, serviceId: match.params.serviceId });
    } else {
      addNewService({formData});
    }
  }

  const handleFeaturedOnChange = e => {
    setFormData({
      ...formData,
      featured: !featured
    });
  }
  
  if( loading ) return <Spinner></Spinner>
  return (
    <div id='add-service' className='row'>
      <div id='border-div' className='col mp-0 s12 m6  z-depth-2'>
        {/* Service Info Section */}
        <div>
          <div className='row mp-0'>
            <input
              value={serviceName}
              name='serviceName'
              id='serviceName'
              type='text'
              className='validate'
              onChange={e => onChange(e)}
            />
            <label className='active' htmlFor='serviceName'>
              Service Name
            </label>
          </div>
          <div className='row mp-0'>
            <div className='col s6 mp-0 ml-1'>
              <input
                value={categoryName}
                name='categoryName'
                id='categoryName'
                type='text'
                className='validate'
                // disabled
                onChange={
                  (e) => {  
                    setFormData({
                      ...formData,
                      category: null,  // reset id if we type
                      categoryName: e.target.value,
                    });      
                    if ( e.target.value.length >= 2 ) {
                      loadQueriedCategories(
                        e.target.value,
                        _setQueriedCategories
                      );
                    }  
                  }
                }
              />
              <label className='active' htmlFor='categoryName'>
                Category
              </label>
            </div>
            <a
              // onClick={e => setProductSearch(true)}
              className='waves-effect waves-light btn-small ml-2 mt-2'
            >
              Edit
              <i className='material-icons right '>mode_edit</i>
            </a>
          </div>
          {
            queriedCategoriesList && queriedCategoriesList.length > 0 && (
              queriedCategoriesList.map(categoryItem => (
                <tr
                  key={categoryItem._id}
                  onClick={() => {
                    console.log('selected category Id -> ', categoryItem._id);
                    const tempCategory = categoryItem;
                    setFormData({
                      ...formData,
                      category: tempCategory._id,
                      categoryName: tempCategory.name,
                    });
                    setQueriedCategoriesList([]);                    
                  }}
                >
                  <td>{categoryItem.name}</td>
                  {/* <td>{categoryItem.servicePrice}</td> */}
                </tr>
              ))
            )
          }
          {/* IMAGE */}
          <div className='file-field input-field'>
            <div className='btn'>
              <span>File</span>
              {/* <span>
                  FILE<i class='material-icons right'>file_upload</i>
                </span> */}
              <input type='file' onChange={e => fileSelectedHandler(e)} />
            </div>
            <div className='file-path-wrapper'>
              <input
                className='file-path validate'
                type='text'
                // onChange={e => fileSelectedHandler()}
              />
            </div>
          </div>              
          <div className='row mp-0'>
            <input
              value={servicePrice}
              name='servicePrice'
              id='servicePrice'
              type='text'
              className='validate'
              onChange={e => onChange(e)}
            />
            <label className='active' htmlFor='servicePrice'>
              Service Price
            </label>
          </div>
          <div className='row mp-0'>
            <span className='flexrow justify-content-space-between mt-1 mb-1'>
              <label className="ml-1">
                <input 
                  name="featured"
                  onChange= { e => handleFeaturedOnChange(e)}
                  type='checkbox' checked={featured ? true : false} />
                <span>Featured</span>
              </label>
              <button
                className='btn waves-effect waves-light  mr-1'
                type='button'
                onClick={e => submitAddorUpdate()}
              >
                Submit
                <i className='material-icons right'>send</i>
              </button>
            </span>
          </div>
        </div>
        {/* End of Service Info Section */}          
      </div>
    </div>
  );
}

export default AddService



{/* <div className='row'>
      {/* Search Bar for Products */}
    //   <form autoComplete='off'>
    //     <div className='input-field'>
    //       <i className='material-icons prefix'>search</i>
    //       <input
    //         id='search'
    //         type='search'
    //         onChange={e => loadQueriedProducts(e.target.value)}
    //         name='search'
    //         placeholder='Search for Services'
    //       />
    //       <label className='label-icon' htmlFor='search'></label>
    //       <i className='material-icons'>close</i>
    //     </div>
    //   </form>
    //   {/* End of Search Bar for Products */}
    //   {/* Products Lİst Section */}
    //   <div className='col s12 m4'>
    //     <ul class='collection'>
    //       {productsQuery.length > 0 &&
    //         productsQuery.map(product => (
    //           <ProductRowForAddService
    //             key={product._id}
    //             productInfo={product}
    //             selectProduct={selectProduct}
    //           />
    //         ))}
    //     </ul>
    //   </div>
    //   {/* End of Products Lİst Section */}

    //   {/* Service Info Section */}
    //   <div className='col s6'>
    //     <div className='row mp-0'>
    //       <input
    //         value={productName}
    //         name='productName'
    //         id='productName'
    //         type='text'
    //         className='validate'
    //         disabled
    //       />
    //       <label className='active' htmlFor='productName'>
    //         Product Name
    //       </label>
    //     </div>
    //     <div className='row mp-0'>
    //       <input
    //         value={serviceType}
    //         name='serviceType'
    //         id='serviceType'
    //         type='text'
    //         className='validate'
    //         onChange={e => onChange(e)}
    //       />
    //       <label className='active' htmlFor='serviceType'>
    //         Service Type
    //       </label>
    //     </div>
    //     <div className='row mp-0'>
    //       <input
    //         value={servicePrice}
    //         name='servicePrice'
    //         id='servicePrice'
    //         type='text'
    //         className='validate'
    //         onChange={e => onChange(e)}
    //       />
    //       <label className='active' htmlFor='servicePrice'>
    //         Service Price
    //       </label>
    //     </div>
    //     <button
    //       className='btn waves-effect waves-light mt-2'
    //       type='button'
    //       onClick={e => submitAdd()}
    //     >
    //       Submit
    //       <i class='material-icons right'>send</i>
    //     </button>
    //   </div>
    //   {/* End of Service Info Section */}
    // </div> */}