import React, {useState, Fragment, useContext} from 'react'
import adminContext from "../../../context/admin/adminContext";
import {
  Container,
  TextField,
  Button
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const AddCategory = ({addStatus}) => {
  const adminContext1 = useContext(adminContext);
  const { addCategory } = adminContext1;
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

  const addCategoryHandler = e => {
    e.preventDefault();
    addCategory({ formData });
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
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <form 
        onSubmit={e => addCategoryHandler(e)}
        style={{
          minHeight:'90vh',
          justifyContent:'space-between'
        }}
        className=' flexcol'
      >
        <span>
          <h2 className='text-center  mt-1 mb-1'>Add Category</h2>           
          <div className="mb-2">
            <TextField
              placeholder='Enter Category Name'
              label='Category Name'
              required={true}
              fullWidth={true}
              id='add-category-name'
              name='add-category-name'
              value={formData.name}
              size='medium'
              type='text'
              autoComplete={false}
              onChange={e => handleNameChange(e)}
            />
          </div>
          <TextField
            placeholder='Select Category Image'
            required={true}
            fullWidth={true}
            type='file'
            autoComplete={false}
            onChange={e => fileSelectedHandler(e)}
          />
        </span>
        <div className='mb-2 mt-2'>
          <Button
            size='large'
            variant='contained'
            color='secondary'
            endIcon= {<SendIcon />}
            type='submit'
            // name='action'
            style={{
              // position:'absolute',
              // bottom: 0,
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export  default AddCategory
