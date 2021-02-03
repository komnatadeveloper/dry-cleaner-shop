import React, {useContext, useEffect} from "react";
import alertContext from '../../context/alert/alertContext'
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const AlertComponent = () => {
  const alertContext1 = useContext(alertContext);
  useEffect(() => {

  }, [])
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      marginTop: 64,
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        alertContext1.alerts.length > 0 
        && alertContext1.alerts.map(alert => (
            <Alert
              key={alert.id}
              variant='filled'
              severity= {
                (
                  alert.type === 'error'
                  || alert.type === 'danger'
                  || alert.type === 'warning'
                  || alert.type === 'info'
                  || alert.type === 'success'
                ) 
                  ? alert.type
                  : 'error'
              }
            >
              {alert.msg}
            </Alert>
          ))
      }
    </div>
  )
}





export default AlertComponent;
