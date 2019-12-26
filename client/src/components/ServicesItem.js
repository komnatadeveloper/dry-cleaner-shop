import React from 'react'
import Resim1 from '../images/services/takim-elbise.jpg'
import Resim2 from '../images/services/pantolon.jpg'
import Resim3 from '../images/services/gomlek.jpg'
import Resim4 from '../images/services/ceket.jpg'
import Resim5 from '../images/services/kaban.jpg'
import Resim6 from '../images/services/mont.jpg'
import Resim7 from '../images/services/elbise.jpg'
import Resim8 from '../images/services/tshirt.jpg'
import axios from 'axios'


const ServicesItem = ({
  service
}) => {

  // console.log(axios.defaults);
  // console.log(
  //   serviceId,
  //   productOfService,
  //   productName,
  //   serviceType,
  //   servicePrice
  // );

  const { _id, productName, product, serviceType, servicePrice } = service
  
  return (
    <div className='col s6 m4 l3'>
      <div className='card sticky-action'>
        <div className='card-image waves-effect waves-block waves-light'>
          <img className='activator' src={`/api/public/products/${product}`} />
        </div>
        <div className='card-action'>
          <span className='card-title activator grey-text text-darken-4'>
            {productName} {serviceType}
            <i className='material-icons right'>more_vert</i>
          </span>
          <a className='btn halfway-fab waves-effect waves-light green right'>
            <i className='material-icons '>add</i>
          </a>
          <p>
            <a href='#'>This is a link</a>
          </p>
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            <i className='material-icons right'>close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesItem




{/* <div className='row'>
    <div className='col s6 m3'>
      <div className='card'>
        <div className='card-image'>
          <img src={Resim1} />
          <span className='card-title'>Card Title</span>
          <a className='btn-floating halfway-fab waves-effect waves-light red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <div className='card-content'>
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
      </div>
    </div>
    <div className='col s6 m3'>
      <div className='card'>
        <div className='card-image'>
          <img src={Resim2} />
          <span className='card-title'>Card Title</span>
          <a className='btn-floating halfway-fab waves-effect waves-light red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <div className='card-content'>
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
      </div>
    </div>
    <div className='col s6 m3'>
      <div className='card'>
        <div className='card-image'>
          <img src={Resim3} />
          <span className='card-title'>Card Title</span>
          <a className='btn-floating halfway-fab waves-effect waves-light red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <div className='card-content'>
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
      </div>
    </div>
    <div className='col s6 m3'>
      <div className='card'>
        <div className='card-image'>
          <img src={Resim4} />
          <span className='card-title'>Card Title</span>
          <a className='btn-floating halfway-fab waves-effect waves-light red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
        <div className='card-content'>
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
      </div>
    </div>
  </div> */}











{/* <div className='row'>
      <div className='col s6 m3'>
        <div className='card'>
          <div className='card-image'>
            <img src={`/api/public/products/${productOfService}`} />
            <span className='card-title'>
              {productName} {serviceType}
            </span>
            <a className='btn-floating halfway-fab waves-effect waves-light red'>
              <i className='material-icons'>add</i>
            </a>
          </div>
          <div className='card-content'>
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
        </div>
      </div>
    </div> */}