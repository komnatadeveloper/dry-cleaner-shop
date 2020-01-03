import React from "react";


const newUserItem = ({ userInfo, selectUser }) => {
  const { _id, username, name, middleName, surName } = userInfo;
  const fullName = [name, middleName, surName].join(" ").trim();
  // console.log(object);


  return (
    <tr>
      <td>{`${username}`}</td>
      <td>{fullName}</td>
      <td>
        <a
          onClick={e => selectUser({userInfo})}
          className='btn-floating small waves-effect waves-light btn-small blue'
        >
          <i className='material-icons small'>check</i>
        </a>
      </td>
    </tr>
  );
};

export default newUserItem;
