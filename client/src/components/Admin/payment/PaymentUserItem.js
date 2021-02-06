import React from "react";
import {
  Container,
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';

const PaymentUserItem = ({ userInfo, selectUser }) => {
  const { _id, username, name, middleName, surName, balance } = userInfo;
  const fullName = [name, middleName, surName].join(" ").trim();

  console.log(userInfo);  


  return (
    <TableRow
      onClick={e => selectUser({userInfo})}
    >
      <TableCell>{`${username}`}</TableCell>
      <TableCell>{fullName}</TableCell>
      <TableCell>{balance}</TableCell>
      {/* <TableCell>
        <a
          onClick={e => selectUser({userInfo})}
          className='waves-effect waves-light btn-small red'
        >
          <i className='material-icons right'>check</i>Add
        </a>
      </TableCell> */}
    </TableRow>
  );
};

export default PaymentUserItem;
