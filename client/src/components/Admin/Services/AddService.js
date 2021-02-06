import React, {useContext, useState, Fragment, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext';
import {
  Container,
  CircularProgress,
  Button,
  Grid,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const AddService = ({match, history}) => {
  const adminContext1 = useContext(adminContext);
  const {
    loadQueriedCategories,
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
  
  return (
    <Container 
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}
    >
        
      <div
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        <div>
          <div className="text-center mt-2 mb-2">
            <h2> {match.params.serviceId ? 'Update Service' : 'Add Service'}</h2>
          </div>
          {
            loading 
            ? (
                <div 
                  className='flexrow justify-content-center'
                  style={{
                    minHeight: 180,
                    paddingTop: 120
                  }}
                >
                  <CircularProgress />
                </div>
              )
            : (

              <Grid container spacing={3}>
                <Grid
                  xs={12}
                > 
                  <div className="mb-2">
                    <TextField
                      id='serviceName'
                      name='serviceName'
                      value={serviceName}
                      placeholder='Enter Service Name'
                      label='Service Name'
                      required={true}
                      fullWidth={true}
                      size='medium'
                      type='text'
                      autoComplete={false}
                      onChange={e => onChange(e)}
                    />
                  </div>                 
                </Grid>
                <Grid
                  xs={12}
                >
                  
                  <div className="mb-2">
                    <TextField
                      id='categoryName'
                      name='categoryName'
                      value={categoryName}
                      placeholder='Enter Service Name'
                      label='Search Categories'
                      InputProps={{
                      startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                      // required={true}
                      fullWidth={true}
                      size='medium'
                      type='text'
                      autoComplete={false}
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
                    {
                      queriedCategoriesList && queriedCategoriesList.length > 0 && (
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Category Name</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                queriedCategoriesList.map(categoryItem => (
                                  <TableRow
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
                                    <TableCell>{categoryItem.name}</TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )
                    }
                  </div>                  
                </Grid>
                <Grid
                  xs={12}
                >
                  <div className="mb-2">
                    <TextField
                      placeholder='Select Category Image'
                      required={true}
                      fullWidth={true}
                      type='file'
                      autoComplete={false}
                      onChange={e => fileSelectedHandler(e)}
                    />
                  </div>
                </Grid>
                <Grid
                  xs={12}
                >                  
                  <TextField
                    id='servicePrice'
                    name='servicePrice'
                    value={servicePrice}
                    placeholder='Enter Service Price'
                    label='Service Price'
                    required={true}
                    fullWidth={true}
                    size='medium'
                    type='text'
                    autoComplete={false}
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid
                  xs={12}
                >
                  <div className='ml-2 mt-2'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={featured}
                          onChange={ e => handleFeaturedOnChange(e)}
                          name="featured"
                          size='medium'
                        />                  
                      }
                      label='Featured'
                    />
                  </div>
                </Grid>
              </Grid> 
            )
          }
        </div> 

        <div className='mb-2'>
          <Button
            onClick={e => submitAddorUpdate()}
            color='secondary'
            variant='contained'
          >
            {match.params.serviceId ? 'Update Service' : 'Add Service'}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default AddService;



