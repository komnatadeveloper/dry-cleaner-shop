import React from "react";

const PaymentUserItem = ({ userInfo, selectUser }) => {
  const { _id, username, name, middleName, surName, balance } = userInfo;
  const fullName = [name, middleName, surName].join(" ").trim();

  console.log(userInfo);  


  return (
    <tr>
      <td>{`${username}`}</td>
      <td>{fullName}</td>
      <td>{balance}</td>
      <td>
        <a
          onClick={e => selectUser({userInfo})}
          className='waves-effect waves-light btn-small red'
        >
          <i className='material-icons right'>check</i>Add
        </a>
      </td>
    </tr>
  );
};

export default PaymentUserItem;
