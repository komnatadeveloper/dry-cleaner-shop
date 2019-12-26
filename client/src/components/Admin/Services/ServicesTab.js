import React, { useContext, useEffect  } from "react";
import { Link} from 'react-router-dom'

import adminContext from "../../../context/admin/adminContext";
import ServicesTable from "./ServicesTable";
import DeleteConfirmationModal from './DeleteConfirmationModal'
import Spinner from '../../layout/Spinner'


const ServicesTab = () => {
  const adminContext1 = useContext(adminContext);
  const { 
    loadServices , 
    services,
    loading
   } = adminContext1;

  // productsTab , serviceTab
  // const [ currentSection, setCurrentSection ] = useState('serviceTab') 

  useEffect(() => {
    loadServices();
  }, []);

  // const addCustomer = () => {
  //   const btn = (
  //     <button data-target='modalCustomer' className='btn modal-trigger' />
  //   );
  //   console.log("clicked add customer");
  // };


  if(loading) return <Spinner></Spinner>
  return (
    <div id='admin-customers-tab'>
      <div className='row flexrow justify-content-space-between mt-1'>
        <span>
          <Link
            to='/dashboard/services/add'
            className='waves-effect waves-teal red btn-flat'
            // href='#addCustomerModal'
            // onClick={() => console.log("SERVICES TAB BUTTON")}
          >
            ADD SERVICE
          </Link>
        </span>
      </div>
      {/* <DeleteConfirmationModal /> */}
      <ServicesTable services={services} />
    </div>
  );
};

export default ServicesTab;
