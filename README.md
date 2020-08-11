# dry-cleaner-shop

A Full-Stack Web App with a React.js Frontend (Materialize CSS), and Node.js Backend(MongoDB).


## ---------------Frontend---------------
 [**It has been deployed to Heroku, so you can see!**](https://komnata-dry-cleaner-shop.herokuapp.com/)

3 Different Type Users:
- Public
- Admin
- User (Customer)






### ---------Public---------


- Public Pages are almost same for User Pages. You can add items to Cart on Home Page when you are Public User. However, to order, you should have logged in

** **

- **Public Home Page**

<img src="images-for-readmemd/home-page/home-hero.png" height=400>

<img src="images-for-readmemd/home-page/home2.png" height=400>

** **

- **[Client Login Page](https://komnata-dry-cleaner-shop.herokuapp.com/admin) and [Admin Login Page](https://komnata-dry-cleaner-shop.herokuapp.com/user-login)**


  - **Client Login Credentials**
  
    - **Username: jdoe**
    - **Email: jdoe@gmail.com**
    - **Password: 123456**


<img src="images-for-readmemd/login/user-login.png" height=400>

<img src="images-for-readmemd/login/admin-login.png" height=400>

** **

### -----Admin User-----

- A Dashboard URL with 3 Tabs ( Customers, Orders, Services )

** **

- **Customers Tab**
<img src="images-for-readmemd/admin/dashboard-tabs/customers-tab.png" height=400>

<img src="images-for-readmemd/admin/dashboard-tabs/add customer.png" height=400>

** **

- **Orders Tab with Orders & Payments Select Options**

  - **Orders Option**

  <img src="images-for-readmemd/admin/dashboard-tabs/orders-tab.png" height=400>  
  

  
  - **Payments Option**
  
  <img src="images-for-readmemd/admin/dashboard-tabs/orders-tab2.png" height=400>
  
  <div style="display: flex; flex-direction: column;">
  </div>
  
** **




- **Services Tab**

<img src="images-for-readmemd/admin/dashboard-tabs/services-tab.png" height=400>

<img src="images-for-readmemd/admin/dashboard-tabs/services-tab2.png" height=400>


** **


- **Add Payments**

<img src="images-for-readmemd/admin/add-payment/add-payment1.png" height=400>

<img src="images-for-readmemd/admin/add-payment/add-payment2.png" height=400>

<img src="images-for-readmemd/admin/add-payment/add-payment3.png" height=400>


** **


- **Add Service**

<img src="images-for-readmemd/admin/add-services/add-service.png" height=400>


** **


- **Customer Details**

<img src="images-for-readmemd/admin/customer-details.png" height=400>

** **

- **Products Page**

<img src="images-for-readmemd/admin/products-page.png" height=400>

<img src="images-for-readmemd/admin/products-page2.png" height=400>

<img src="images-for-readmemd/admin/products-page3.png" height=400>

** **


### -----User (Customer)-----

** **

- **Cart**

Although you can add items to Cart in also Public Mode, I  will demonstrate Cart in User Mode.

Below are Images of Cart with Items and Empty Cart

<img src="images-for-readmemd/user-pages/cart.png" height=400>
<img src="images-for-readmemd/user-pages/cart-empty.png" height=400>

** **

- **Orders**

<img src="images-for-readmemd/user-pages/user-orders-page.png" height=400>

<img src="images-for-readmemd/user-pages/user-orders-page2.png" height=400>

<img src="images-for-readmemd/user-pages/order-details-page.png" height=400>

** **

## ---------------Backend---------------

- Node.js with Mongoose,
- A Backend with 2 different bcrypt.js Secrets - 1 for Users, 1 for Admins,
- Multer & Sharp Libraries for Files
- jwt authentication
- password hash by bcryptjs.js
