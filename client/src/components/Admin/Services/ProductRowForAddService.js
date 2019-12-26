import React from 'react'

const ProductRowForAddService = ({ productInfo, selectProduct }) => {
  const { name, _id } = productInfo;
  return (
    
      <a 
        style={{ display: 'flex', alignItems:'center'}}
        className='collection-item avatar'      
        onClick={e => selectProduct({productInfo})}>
        <img src={`/api/public/products/${_id}`} alt='' class='circle' />
        <span class='title'>{name}</span>
        {/* <p>

        </p> */}
      </a>
    
  );
};

export default ProductRowForAddService




    // <li class='collection-item avatar'>
    //   <a 
    //     className='hoverable'      
    //     onClick={e => selectProduct({productInfo})}>
    //     <img src={`/api/public/products/${_id}`} alt='' class='circle' />
    //     <span class='title'>{name}</span>
    //     {/* <p>

    //     </p> */}
    //   </a>
    // </li>


      // <img src={`/api/public/products/${_id}`} alt='' class='circle' />
      // <span class='title'>{name}</span>
      // {/* <p>

      // </p> */}
      // <a href='#!' class='secondary-content'>
      //   <i class='material-icons'>grade</i>
      // </a>
