import React, {useContext, useState, Fragment, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext'
import PaymentUserItem from './PaymentUserItem'


const AddPayment = ({match, history}) => {
  const activityId = match.params.activityId || null
  const adminContext1 = useContext(adminContext)
  const {
    loadQueriedUsers,
    userQuery,
    clearUserQuery,
    addPayment,
    getSingleUserActivity,
    updatePayment
  } = adminContext1;

  const initialState = {
    customerId: "",
    username: "",
    balance: "",
    fullName: "",
    payment: ""
  };

  const [formData, setFormData] = useState({ ...initialState });
  const [search, setSearched] = useState("");


  // If editting a payment, next callback func
  const next = (res) => {
    // So it can not be loaded
    if(res === null) {
      return history.push('/dashboard/orders')
    }
    const { customerId, amount, date  } = res
    setFormData({
      _id: activityId,
      customerId: customerId._id,
      username: customerId.username,
      fullName: [customerId.name, customerId.middleName, customerId.surName]
        .join(" ")
        .trim(),
      payment: amount
    });
  }

  useEffect(() => {
    // If Editting a Payment
    if(activityId) {
      getSingleUserActivity({activityId, next})
    }
  }, [])










  const selectUser = ({userInfo}) => {
  const { username, _id, name, middleName, surName, balance } = userInfo;


    setFormData({
    ...formData,
    customerId: _id,
    username: username,
    fullName : [name, middleName, surName].join(" ").trim(),
    balance,
    });

    clearUserQuery()
    setSearched("")
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange =  () => {
    let payment = parseFloat(formData.payment).toFixed(2)

    if(payment === 'NaN') payment = ''

    setFormData({
      ...formData,
      payment
    });
  };



  const handleSearchChange = e => {
    loadQueriedUsers(e.target.value);
    setSearched(e.target.value)
  }

  const submitPayment = (e) => {
    if(!activityId) {

      addPayment({formData: {
        customerId: formData.customerId,
        payment: parseFloat(payment)
      }})

    } else { // Edit Existing Payment Option
      // Mutating the formData, as soon as useractivity model has a different structure
      updatePayment({
        formData: {
        _id: formData._id,
        customerId: formData.customerId,
        amount: parseFloat(formData.payment) * (-1)
      }, next: (res) => {
        if(res) {
          history.push('/dashboard/orders')
        }

      } })
    }

    setFormData({...initialState})
  }

  const { username, fullName, balance, payment} = formData

  

  

  return (
    <div>
      {/* {sectionSelection === "users" ? ( */}
      <div className='col s12'>
        <h1 className='center-align' style={{ fontSize: "2rem" }}>
          Add Payment For Customers
        </h1>
        <div>
          {/* Search Bar for Users */}
          <form autoComplete='off'>
            <div className='input-field'>
              <i className='material-icons prefix'>search</i>
              <input
                id='search'
                type='search'
                value={search}
                onChange={e => handleSearchChange(e)}
                name='search'
                placeholder='Search for Customers'
              />
              <label className='label-icon' htmlFor='search'></label>
              <i className='material-icons'>close</i>
            </div>
          </form>
          {/* End of Search Bar for Users */}
          {/* User List from DB */}

          {userQuery && userQuery.length > 0 && (
            <Fragment>
              <span className='flexrow justify-content-flex-start'>
                <div className='row mp-0'></div>
              </span>

              <table>
                <thead>
                  <tr>
                    <th>username</th>
                    <th>Name</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {userQuery &&
                    userQuery.map(user => (
                      <PaymentUserItem
                        key={user._id}
                        userInfo={user}
                        selectUser={selectUser}
                      />
                    ))}
                </tbody>
              </table>
            </Fragment>
          )}
          {/* End of User List from DB */}

          {/* Payment Info */}

          {username.length > 0 && (
            <Fragment>
              <table style={{ maxWidth: "500px" }}>
                <tbody>
                  <tr>
                    <td style={{ maxWidth: "150px" }}>Username:</td>
                    <td>{username}</td>
                  </tr>
                  <tr>
                    <td style={{ maxWidth: "150px" }}>Name:</td>
                    <td>{fullName}</td>
                  </tr>
                  <tr>
                    <td style={{ maxWidth: "150px" }}>Balance:</td>
                    <td>{balance}</td>
                  </tr>
                </tbody>
              </table>

              <div className='row mp-0'>
                <span className='ml-2'>Username: {username}</span>
              </div>
              <div className='row mp-0'>
                <span className='ml-2'>Name: {fullName}</span>
              </div>
              <div className='row mp-0'>
                <span className='ml-2'>Balance: {balance}</span>
              </div>
              <form>
                <div className='row mp-0'>
                  <div className='input-field col s6'>
                    <input
                      onChange={e => onChange(e)}
                      onBlur={() => handlePaymentChange()}
                      placeholder='Placeholder'
                      id='payment'
                      name='payment'
                      type='text'
                      class='validate'
                      value={payment}
                      required
                    />
                    <label for='payment'>Payment</label>
                  </div>
                </div>
                <div className='row mp-0'>
                  <button
                    onClick={e => submitPayment(e)}
                    className='btn-large waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Submit Payment
                    <i className='material-icons right'>send</i>
                  </button>
                </div>
              </form>
            </Fragment>
          )}
          {/* End of Payment Info */}
        </div>
      </div>
    </div>
  );
}

export  default AddPayment
