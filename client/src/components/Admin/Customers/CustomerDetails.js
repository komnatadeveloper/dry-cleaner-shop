import React, {useContext, useEffect, useState} from 'react';
import {withRouter, match, Link} from 'react-router-dom'
import adminContext from '../../../context/admin/adminContext'

const CustomerDetails =   ({match}) => {
  const adminContext1 = useContext(adminContext)
  const { customers, updateCustomer, addNewCustomer, loadSingleCustomer } = adminContext1


    const [formData, setFormData] = useState({
    name:"",
    middleName:"",
    surName:"",
    username: "",
    email:"", 
    tel1:"",
    tel2:"", 
    address:"",
    balance:""
    });

    const updateFormFromBackend = (res) => {
        setFormData({
          ...formData,
          name: res.name || "",
          middleName: res.middleName || "",
          surName: res.surName || "",
          username: res.username || "",
          email: res.email || "",
          tel1: res.tel1 || "",
          tel2: res.tel2 || "",
          balance: res.balance || ""
        });
    }



  useEffect( () => {
    // If Edit
    if(match.params.id) {
      console.log(match.params.id);
      console.log(`HELLOO`);
      loadSingleCustomer(match.params.id)
        .then(res => {  
          updateFormFromBackend(res);
        })
    }
  }, [updateCustomer])

  const {    
    name,
    middleName,
    surName,
    username,
    email,
    tel1,
    tel2,
    address,
    balance,
  } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    // If Update
    if (match.params.id) {
      updateCustomer({ formData, id: match.params.id })
        .then(res => {
          updateFormFromBackend(res);
      });
    } else {

      // If New Customer
      addNewCustomer({formData})
    }

  }



  return (
    <div>
      {match.params.id ? (
        <h4 className='center'>{`${username} Info`}</h4>
      ) : (
        <h4 className='center'>Add Customer</h4>
      )}
      {/* If Add New User */}
      {!match.params.id && (
        <div className='row mp-0'>
          <div className='col s12 m4 input-field'>
            <input
              placeholder='Username'
              required={true}
              id='username'
              type='text'
              className='validate'
              name='username'
              value={username}
              onChange={e => onChange(e)}
            />
            <label className='active' htmlFor='name'>
              Name
            </label>
          </div>
        </div>
      )}
      <div className='row'>
        <form className='col s12' onSubmit={e => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s6 m4'>
              <input
                // disabled
                // placeholder='Name'
                required={true}
                id='name'
                type='text'
                className='validate'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='name'>
                Name
              </label>
            </div>
            <div className='input-field col s6 m4'>
              <input
                // disabled
                id='middleName'
                type='text'
                className='validate'
                name='middleName'
                value={middleName}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='middleName'>
                Middlename
              </label>
            </div>
            <div className='input-field col s6 m4'>
              <input
                // disabled
                id='surName'
                type='text'
                className='validate'
                name='surName'
                value={surName}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='surName'>
                Surname
              </label>
            </div>
            <div className='input-field col s12 m4'>
              <input
                disabled={match.params.id ? true : false}
                id='email'
                type='email'
                className='validate'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='email'>
                Email
              </label>
            </div>
            <div className='input-field col s6 m4'>
              <input
                // disabled
                id='tel1'
                type='text'
                // className='validate'
                name='tel1'
                value={tel1}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='tel1'>
                Tel1
              </label>
            </div>
            <div className='input-field col s6 m4'>
              <input
                // disabled
                id='tel2'
                type='text'
                // className='validate'
                name='tel2'
                value={tel2}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='tel2'>
                Tel2
              </label>
            </div>
            <div className='input-field col s6 m4'>
              <input
                disabled
                id='balance'
                type='text'
                className='validate'
                name='balance'
                value={`$${balance}`}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='balance'>
                Balance
              </label>
            </div>
            <div className='input-field col s12'>
              <input
                // disabled
                id='address'
                type='text'
                className='validate'
                name='address'
                value={address}
                onChange={e => onChange(e)}
              />
              <label className='active' htmlFor='address'>
                Address
              </label>
            </div>
          </div>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'
          >
            Submit
            <i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerDetails
