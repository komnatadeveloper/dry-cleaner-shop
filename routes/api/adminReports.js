const express = require("express");
const moment = require('moment');
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const UserActivity = require("../../models/UserActivity");
const authAdmin = require('../../middleware/authAdmin');


// Get All Orders
router.get('/dashboard-initial', 
  authAdmin, 
  async ( req, res) => { 

    try {
      // PART1
      const allCustomers = await User.find( {});
        // .populate('user', 'username')
      const totalCustomerCount = allCustomers.length;
      // QUERY INFORMATION LINK -> https://discourse.metabase.com/t/relative-date-filter-in-native-mongo-queries/3200
      let _lastOneMonthCustomerQuery = {registrationDate: { $gte: new Date( new Date() - 1000 * 60 * 60 * 24 * 30 ) }};
      const lastOneMonthCustomers = await User.find(_lastOneMonthCustomerQuery);
      const lastOneMonthCustomerCount = lastOneMonthCustomers.length;
      // PART1 IS OK

      // PART2 ( payment sum in a certain time interval )
      // USING this link -> https://stackoverflow.com/questions/42871144/mongoose-node-js-get-sum-of-a-field-from-a-bunch-of-documents/42871346
      const _paymentTotalInLast30Days = await  UserActivity.aggregate(
        [
          {
            $match: {
              $and : [
                { activityType: 'payment' },
                { date:  {
                    $gte: new Date( new Date() - 1000 * 60 * 60 * 24 * 30 )
                  }  
                }
              ]
            }
          },
          {
            $group : {
              _id: null,
              totalPayment: {
                $sum: '$amount'
              }
            }
          }
        ]
      );
      // interval between <<<previous 30 days - previous 60 days>>>
      const _paymentTotalPrevious30Days = await  UserActivity.aggregate(
        [
          {
            $match: {
              $and : [
                { activityType: 'payment' },
                { date:  {
                    $lt: new Date( new Date() - 1000 * 60 * 60 * 24 * 30 ),
                    $gte: new Date( new Date() - 1000 * 60 * 60 * 24 * 60 ),
                  }  
                }
              ]
            }
          },
          {
            $group : {
              _id: null,
              totalPayment: {
                $sum: '$amount'
              }
            }
          }
        ]
      );
      let paymentTotalInLast30Days;
      // console.log('_paymentTotalInLast30Days -> ', _paymentTotalInLast30Days);
      if ( _paymentTotalInLast30Days.length === 0 ) {
        paymentTotalInLast30Days = 0;
      } else {
        paymentTotalInLast30Days = _paymentTotalInLast30Days[0].totalPayment * (-1);
      }
      // console.log('paymentTotalInLast30Days -> ', paymentTotalInLast30Days);
      let paymentTotalPrevious30Days;
      // console.log('_paymentTotalPrevious30Days -> ', _paymentTotalPrevious30Days);
      if ( _paymentTotalPrevious30Days.length === 0 ) {
        paymentTotalPrevious30Days = 0;
      } else {
        paymentTotalPrevious30Days = _paymentTotalPrevious30Days[0].totalPayment * (-1);
      }
      // console.log('paymentTotalPrevious30Days -> ', paymentTotalPrevious30Days);
      let paymentChangePercentage;
      if ( paymentTotalPrevious30Days !== 0 && paymentTotalInLast30Days !== 0 ) {
        paymentChangePercentage = (( paymentTotalInLast30Days / paymentTotalPrevious30Days ) - 1) * 100;
      } else if (
        paymentTotalInLast30Days !== 0 && paymentTotalPrevious30Days === 0
      ) {
        paymentChangePercentage = 999;
      } else if (
        paymentTotalInLast30Days === 0 && paymentTotalPrevious30Days !== 0
      ) {
        paymentChangePercentage = -100;
      } else {
        paymentChangePercentage = 0;
      }
      if( paymentChangePercentage > 999 )  {
        paymentChangePercentage = 999;
      }
      let paymentChangeDescriptionText = 'Since last month';
      // PART2 IS OK

      // PART3
      const orderCountAtLast7Days = await Order.countDocuments({
        date: { $gte: new Date( new Date() - 1000 * 60 * 60 * 24 * 7 ) }
      });
      const orderCountInProgressAtLast7Days = await Order.countDocuments({
        $and: [
          {
            date: { $gte: new Date( new Date() - 1000 * 60 * 60 * 24 * 7 ) }
          },
          {
            orderStatus: 'In Progress'
          },
        ]
      });
      let ordersInProgressPercentage;
      if ( orderCountAtLast7Days  === 0 || orderCountInProgressAtLast7Days === 0  ) {
        ordersInProgressPercentage  = 0;
      } else  {
        ordersInProgressPercentage = ( orderCountInProgressAtLast7Days / orderCountAtLast7Days  ) * 100 ;
      }
      // PART3 IS OK

      res.status(200).json({
        // CUSTOMER COUNTS
        lastOneMonthCustomerCount, 
        totalCustomerCount,
        // PAYMENT
        paymentTotalPrevious30Days,
        paymentTotalInLast30Days,
        paymentChangePercentage,
        paymentChangeDescriptionText,
        // ORDERS COUNT & ORDERS IN PROGRESS COUNT
        ordersInProgressPercentage
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});


module.exports = router;