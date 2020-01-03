import React, {useContext, useEffect, useState, Fragment } from 'react'
import adminContext from '../../../context/admin/adminContext'
import ProductCard from './ProductCard'
import AddProduct from './AddProduct'
import Spinner from '../../layout/Spinner'

const ProductsTab = () => {

  const adminContext1 = useContext(adminContext)
  const { loadProductsWithoutImages , products, loading } = adminContext1;

  const [addStatus, setAddStatus] = useState(false)

  useEffect(() => { 
    if (products.length === 0)
      // This is a try of turn-around to prevent re-render
      // eslint-disable-next-line
      loadProductsWithoutImages();
      // eslint-disable-next-line
  }, [])

  
  
  if(loading) return <Spinner></Spinner>

  return (
    <Fragment>
      <div className='row mt-1'>
        {/* Buttons Related with Products */}
        <span>
          {/* <a
            className='waves-effect waves-light btn-small mr-1'
            onClick={e => {
              setCurrentSection("productsTab");
            }}
          >
            <i className='material-icons right'>list</i>Products
          </a> */}
          <a
            className={ addStatus === false ? 
              ('waves-effect waves-light blue btn-small') : 
              ('waves-effect waves-light red btn-small') 
            }
            onClick={e => {
              setAddStatus( !addStatus )
            }}
          >
            { addStatus === false ? (
              <Fragment>
                <i className='material-icons right'>add</i>Product
              </Fragment>
            ) : (
              <Fragment>
                <i className='material-icons right'>close</i>Product Add
              </Fragment>
            )}
            
          </a>
        </span>
        {/* End of Buttons Related with Products */}
      </div>
      <AddProduct addStatus={addStatus} />

      <div className='row'>
        {products.length > 0 &&
          products.map(product => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
      </div>
    </Fragment>
  );
}

export default ProductsTab






