import React, {useState, useContext, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext'
import M from "materialize-css";

const ProductCard = ({productInfo}) => {
  const { _id, name } = productInfo

  const adminContext1 = useContext(adminContext);
  const { updateProduct, deleteProduct } =  adminContext1 ;

  

  const [formData, setFormData] = useState({
    image: null,
    name: null
  });

  useEffect(() => {
// eslint-disable-next-line
    setFormData({...formData, name: productInfo.name })
    // eslint-disable-next-line
    M.AutoInit()
    // eslint-disable-next-line
  }, [productInfo])



  

  const fileSelectedHandler = (e) => {
    setFormData( {
      ...formData,
      image: e.target.files[0]
    })
  }

  const updateProductHandler = (e) => {
    e.preventDefault()
    updateProduct({formData, _id})
  }

  const handleNameChange = e => {
    if (e.target.name === `${_id}name`) {
      setFormData({
        ...formData,
        name: e.target.value
      })
    }
  }



  return (
    <div className='col s12 m6 l3'>
      <div className='card sticky-action'>
        <div className='card-image waves-effect waves-block waves-light'>
          <img className='activator' src={`/api/public/products/${_id}`} />
        </div>
        <div className='card-action'>
          <span className='ml-1 mr-1'>{name}</span>
          <span className='card-title activator grey-text text-darken-4'>
            <a class='btn-small waves-effect waves-light right blue'>
              <i class='material-icons small'>edit</i>
            </a>
            {/* <i className='material-icons right'>edit</i> */}
          </span>
          <a
            className='btn-small halfway-fab waves-effect waves-light modal-trigger red right mr-1'
            href={`#pd-${_id}`}
            // onClick={e => deleteProduct(_id)}
          >
            <i className='material-icons small'>delete</i>
          </a>
          {/* MODAL BEGIN */}
          <div id={`pd-${_id}`} className='modal'>
            <div className='modal-content'>
              <h4>Delete Confirmation</h4>
              <p>Are you sure you want to delete Product?</p>
            </div>
            <div className='modal-footer'>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <a
                  href='#!'
                  className='modal-close waves-effect waves-green red btn-small mr-2'
                  style={{ marginRight: "1rem" }}
                >
                  Cancel <i className='material-icons small  right'>close</i>
                </a>
                <a
                  href='#!'
                  onClick={e => deleteProduct(_id)}
                  className='modal-close waves-effect waves-green btn-small ml-2'
                >
                  Agree <i className='material-icons small  right'>send</i>
                </a>
              </span>
            </div>
          </div>
          {/* MODAL END */}
          {/* <a href='#'>This is a link</a> */}
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            <i className='material-icons right'>close</i>
          </span>
          <form onSubmit={e => updateProductHandler(e)}>
            {/* NAME */}
            <div className='row mp-0'>
              <div className='input-field col s6'>
                <input
                  name={`${_id}name`}
                  value={formData.name}
                  id={`${_id}name`}
                  type='text'
                  onChange={e => handleNameChange(e)}
                  className='validate'
                />
                <label className='active' for={`${_id}name`}>
                  Name
                </label>
              </div>
            </div>
            {/* IMAGE */}
            <div className='file-field input-field'>
              <div className='btn'>
                <span>File</span>
                {/* <span>
                  FILE<i class='ns right'>file_upload</i>
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
    </div>
  );
}

export default ProductCard
