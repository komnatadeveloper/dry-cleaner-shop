import React, {useState, Fragment, useContext} from 'react'
import adminContext from "../../../context/admin/adminContext";

const AddProduct = ({addStatus}) => {
  const adminContext1 = useContext(adminContext);
  const { addProduct } = adminContext1;
  const [formData, setFormData] = useState({
    image: null,
    name: ''
  });


  const fileSelectedHandler = e => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const addProductHandler = e => {
    e.preventDefault();
    addProduct({ formData });
  };

  
  const handleNameChange = e => {
    setFormData({
      ...formData,
      name: e.target.value
    });    
  };


  if( addStatus === false) {
    return <Fragment></Fragment>
  }

  return (
    <div className='row'>
      <div className='col s12 m3'>
        <form 
          className='ml-2'
          onSubmit={e => addProductHandler(e)}
        >
          {/* NAME */}
          <div className='row mp-0'>
            <div className='input-field'>
              <input
                name={`add-product-name`}
                value={formData.name}
                id={`add-product-name`}
                type='text'
                onChange={e => handleNameChange(e)}
                className='validate'
              />
              <label className='active' htmlFor={`add-product-name`}>
                Name
              </label>
            </div>
          </div>
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
          <button className='btn waves-effect waves-light' type='submit'>
            Submit
            <i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export  default AddProduct
