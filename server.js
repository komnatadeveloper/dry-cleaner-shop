const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// cookies
const cookieParser = require('cookie-parser');

// Import Routers
const publicRouter = require('./routes/api/public')
const adminRegister = require('./routes/api/adminRegister')
const adminProducts = require('./routes/api/adminProducts')
const adminServices = require('./routes/api/adminServices')
const adminCategories = require('./routes/api/adminCategories')
const adminOrders = require('./routes/api/adminOrders')
const adminCustomers = require('./routes/api/adminCustomers')
const adminServiceStatus = require("./routes/api/adminServiceStatus");
const adminUserActivities = require("./routes/api/adminUserActivities");
const adminReports = require("./routes/api/adminReports");
const usersRouter = require('./routes/api/users')
const authRouter = require('./routes/api/auth')
const adminEmployeeRouter = require('./routes/api/adminEmployee');


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Cookie Middleware Use
app.use(cookieParser());

// WE ARE COMMENTING TO BE ABLE TO UPLOAD TO HEROKU
// app.get('/', (req, res) => {
//   res.send('API RUNNING')
// })

// Define routes
app.use("/api/public", publicRouter);
app.use("/api/admin/register", adminRegister);
app.use("/api/admin/employee", adminEmployeeRouter);
app.use("/api/admin/products", adminProducts);
app.use("/api/admin/services", adminServices);
app.use("/api/admin/categories", adminCategories);
app.use("/api/admin/customers", adminCustomers);
app.use("/api/admin/orders", adminOrders);
app.use("/api/admin/useractivities", adminUserActivities);
app.use("/api/admin/service-status", adminServiceStatus); 
app.use("/api/admin/reports", adminReports); 
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// TEMPORARILY
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));




//--------------------HEROKU CONFIG START--------------------------
// Serve Static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//--------------------HEROKU CONFIG END--------------------------


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // console.log(`Server started on port ${PORT}`);
});
