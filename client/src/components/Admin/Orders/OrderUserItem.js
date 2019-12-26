import React from "react";

const newUserItem = ({ userInfo, selectUser }) => {
  const { _id, username, name, middleName, surName } = userInfo;
  const fullName = [name, middleName, surName].join(" ").trim();


  return (
    <tr>
      <td>{`${username}`}</td>
      <td>{fullName}</td>
      <td>
        <a
          onClick={e => selectUser(userInfo)}
          className='waves-effect waves-light btn-small red'
        >
          <i className='material-icons right'>check</i>Add
        </a>
      </td>
    </tr>
  );
};

export default newUserItem;
