import React, {useEffect} from 'react'
import M from "materialize-css/dist/js/materialize.min.js";

const ServiceItemInOrders = ({
  service,
  changeQuantity,
  statusList,
  selectedStatus,
  setServiceStatus
}) => {
  console.log(service);
  console.log(statusList);
  console.log(selectedStatus);

  useEffect(() => {
    M.AutoInit();
    
  }, []);

  let status1;

  if (!selectedStatus) {
    status1 = statusList[0].servStatus;
  } else {
    status1 = selectedStatus;
  }
  console.log(status1);
  const {
    productName,
    quantity,
    unitPrice,
    // eslint-disable-next-line
    unitServiceStatus,
    serviceType,
    // eslint-disable-next-line
    servicePrice,
    unitTotalPrice
  } = service;

  const serviceId = service.service;

  return (
    <tr>
      <td className='service-column-items'>{`${productName} ${serviceType}`}</td>
      <td className='price-column-items'>{unitPrice}</td>
      {/* <td>{quantity}</td> */}
      <td>
        <input
          className='quantity-column-items'
          type='text'
          value={quantity}
          onChange={e =>
            changeQuantity({ service: serviceId, newValue: e.target.value })
          }
        />
      </td>

      {/* <td>{"In Progress"}</td> */}
      <td>
        <div className='browser-default'>
          <select
            onChange={e =>
              setServiceStatus({
                service: serviceId,
                selectValue: e.target.value
              })
            }
          >
            {statusList.map(status => {
              console.log(status);
              console.log(status.servStatus);
              console.log(status.description);
              return (
                <option
                  key={status.servStatus}
                  value={status.servStatus}
                  // selected ={ status1 === status.servStatus && true}
                >
                  {/* BADGES and COLORS are maybe in future, because badge and colors for select are tricky */}
                  {status.servStatus}
                </option>
              );
            })}
          </select>
        </div>
      </td>

      <td className='total-price-column-items'>{unitTotalPrice}</td>
    </tr>
  );
};


  // serviceList[
  //   {
  //     service: "5df55f1fcac13bc2d8220c01",
  //     productName: "Pants",
  //     quantity: 10,
  //     unitPrice: 10,
  //     unitServiceStatus: "In Progress",
  //     serviceType: "Iron",
  //     servicePrice: 14.05
  //   }
  // ]; 

export  default ServiceItemInOrders
