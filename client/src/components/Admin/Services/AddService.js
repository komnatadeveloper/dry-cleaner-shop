import React, {useContext, useState, Fragment, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext'
import ProductRowForAddService from "./ProductRowForAddService";

const AddService = ({match}) => {
  const adminContext1 = useContext(adminContext)
  const {
    loadQueriedProducts,
    productsQuery,
    addNewService,
    updateService,
    loadSingleService,
    serviceToBeEditted
  } = adminContext1;

  const [formData, setFormData] = useState({
    productName: "",
    product: "",
    serviceType: "",
    servicePrice: ""
  });

  // If Edit
  const updateFormFromBackend = res => {
    setFormData({
      ...formData,
      productName: res.productName || "",
      product: res.product || "",
      serviceType: res.serviceType || "",
      servicePrice: res.servicePrice || ""
    });
  }


  useEffect( () => {
    if(match.params.serviceId) {
    // Do smt
      loadSingleService({serviceId: match.params.serviceId}).then(res => {
      updateFormFromBackend(res);

        // console.log(formData);
      });
    }
  }, [])


  const [ productSearch, setProductSearch ] = useState(false)
  const { productName, serviceType, servicePrice } = formData


  const selectProduct = ({productInfo}) => {
    setFormData({
      ...formData,
      productName: productInfo.name,
      product: productInfo._id,
    })
    setProductSearch(false)
  }

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

      addNewService({formData})
    }
  }

  const handleCloseProductSearch = e => {
    setProductSearch(false)
  }
  

  return (
    <div id='add-service' className='row'>
      <div id='border-div' className='col mp-0 s12 m6  z-depth-2'>
        {productSearch ? (
          <Fragment>
            {/* Search Bar for Products */}
            <div className='flexrow justify-content-space-between'>
              <form autoComplete='off'>
                <div className='input-field'>
                  <i className='material-icons prefix'>search</i>
                  <input
                    id='search'
                    type='search'
                    onChange={e => loadQueriedProducts(e.target.value)}
                    name='search'
                    placeholder='Search for Services'
                  />
                  <label className='label-icon' htmlFor='search'></label>
                  <i className='material-icons'>close</i>
                </div>
              </form>
              <a className='' onClick={e => handleCloseProductSearch(e)}>
                <i style={{ color: "red" }} className='material-icons'>
                  close
                </i>
              </a>
            </div>
            {/* End of Search Bar for Products */}
            {/* Products Lİst Section */}
            {/* <div className='col s12 m4'> */}
            <div>
              <ul class='collection'>
                {productsQuery.length > 0 &&
                  productsQuery.map(product => (
                    <ProductRowForAddService
                      key={product._id}
                      productInfo={product}
                      selectProduct={selectProduct}
                    />
                  ))}
              </ul>
            </div>

            {/* End of Products Lİst Section */}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        {productSearch === false ? (
          <Fragment>
            {/* Service Info Section */}
            <div>
              <div className='row mp-0'>
                <div className='col s6 mp-0 ml-1'>
                  <input
                    value={productName}
                    name='productName'
                    id='productName'
                    type='text'
                    className='validate'
                    disabled
                  />
                  <label className='active' htmlFor='productName'>
                    Product Name
                  </label>
                </div>
                <a
                  onClick={e => setProductSearch(true)}
                  className='waves-effect waves-light btn-small ml-2 mt-2'
                >
                  Edit
                  <i className='material-icons right '>mode_edit</i>
                </a>
              </div>
              <div className='row mp-0'>
                <input
                  value={serviceType}
                  name='serviceType'
                  id='serviceType'
                  type='text'
                  className='validate'
                  onChange={e => onChange(e)}
                />
                <label className='active' htmlFor='serviceType'>
                  Service Type
                </label>
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
              <button
                className='btn waves-effect waves-light mt-1 mb-1'
                type='button'
                onClick={e => submitAddorUpdate()}
              >
                Submit
                <i class='material-icons right'>send</i>
              </button>
            </div>
            {/* End of Service Info Section */}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
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