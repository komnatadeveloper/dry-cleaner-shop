import React, {useContext} from 'react'
import publicContext from '../../../../context/public/publicContext'
import { uint8ArrayToImageSource } from '../../../../utils/helpers';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box
} from '@material-ui/core'

const ServicesItem = ({
  service
}) => {
        const publicContext1 = useContext(publicContext);
        const { addToCart } = publicContext1;

        
        const {
          // eslint-disable-next-line
          _id,
          image,
          serviceName,
          categoryName,
          category,
          servicePrice,
          featured,
        } = service;

        // return (
        //   <div className='col s6 m4 l3'>
        //     <div className='card '>
        //       <div className='card-image'>
        //         <img
        //           alt={`${serviceName}`}
        //           // src={`/api/public/products/${product}`}
        //           src={uint8ArrayToImageSource(image.data)}
        //         />
        //       </div>
        //       <span className='card-title  grey-text text-darken-4'>
        //         {/* {productName} {serviceType} */}
        //         {serviceName}
        //       </span>
        //       <div className='card-content'>
        //         <div className='flexrow justify-content-flex-end mp-1'>
        //           <p
        //             className='mr-2'
        //             style={{
        //               display: "block",
        //               height: "100%",
        //               verticalAlign: "middle"
        //             }}
        //           >{` $${servicePrice}`}</p>
        //           <a
        //             href='#!'
        //             className='btn halfway-fab waves-effect waves-light blue darken-1 ml-2'
        //             onClick={e => {
        //               e.preventDefault();
        //               addToCart({ service });
        //             }}
        //           >
        //             <i className='material-icons'>add</i>
        //           </a>
        //         </div>
        //       </div>
              

             
              
        //     </div>
            
        //   </div>
        // );
        return (
          <Grid xs={12} sm={6}  lg={4}>
            <div 
              style={{                
                marginLeft:'0.5rem',
                marginRight: '0.5rem',
              }}
            >
              <Card>
                <CardMedia
                  component='img'
                  alt={`${serviceName}`}
                  title={`${serviceName}`}
                  image={uint8ArrayToImageSource(image.data)}
                />
                <CardContent style={{padding: 0}}>
                  <Box bgcolor='info.main' color='info.contrastText' p={2}>
                    <div className='flexrow justify-content-space-between '>
                      <p className="text-bold">{serviceName}</p>
                      <p className="text-bold">{` $${servicePrice}`}</p>
                    </div>
                  </Box>
                </CardContent>
                  {/* <span className='card-title  grey-text text-darken-4'>
                    {serviceName}
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
                  </div> */}
              </Card>
            </div>
            <div style={{ marginBottom:'1rem'}}></div>
          </Grid>
              

             
              

        );
      }

export default ServicesItem