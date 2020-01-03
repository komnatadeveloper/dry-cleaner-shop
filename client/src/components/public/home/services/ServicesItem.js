import React, {useContext} from 'react'
import publicContext from '../../../../context/public/publicContext'


const ServicesItem = ({
  service
}) => {
        const publicContext1 = useContext(publicContext);
        const { addToCart } = publicContext1;

        
        const {
          // eslint-disable-next-line
          _id,
          productName,
          product,
          serviceType,
          servicePrice
        } = service;

        return (
          <div className='col s6 m4 l3'>
            <div className='card '>
              <div className='card-image'>
                <img
                  alt={`${productName}-${serviceType}`}
                  src={`/api/public/products/${product}`}
                />
              </div>
              <span className='card-title  grey-text text-darken-4'>
                {productName} {serviceType}
              </span>
              <div className='card-content'>
                <div className='flexrow justify-content-flex-end mp-1'>
                  <p
                    className='mr-2'
                    style={{
                      display: "block",
                      height: "100%",
                      verticalAlign: "middle"
                    }}
                  >{` $${servicePrice}`}</p>
                  <a
                    href='#!'
                    className='btn halfway-fab waves-effect waves-light blue darken-1 ml-2'
                    onClick={e => {
                      e.preventDefault();
                      addToCart({ service });
                    }}
                  >
                    <i className='material-icons'>add</i>
                  </a>
                </div>
              </div>
              {/* <div className='card-action'> */}

              {/* <a className='btn halfway-fab waves-effect waves-light green right'>
            <i className='material-icons '>add</i>
          </a> */}
              {/* <p>
            <a href='#'>This is a link</a>
          </p> */}
            </div>
            {/* <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            <i className='material-icons right'>close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div> */}
            {/* </div> */}
          </div>
        );
      }

export default ServicesItem