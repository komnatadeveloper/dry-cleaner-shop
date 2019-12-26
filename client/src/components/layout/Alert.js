import React, {useContext, useEffect} from "react";
import alertContext from '../../context/alert/alertContext'


const Alert = () => {
  const alertContext1 = useContext(alertContext);
  useEffect(() => {

  }, [])
  return (
    alertContext1.alerts.length > 0 &&
    alertContext1.alerts.map(alert => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
        >
          {alert.msg}
        </div>
      ))
  )
}





export default Alert;
