// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./config/db");

// const app = express();
// app.use(express.json());

// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/products", require("./routes/product.routes"));
// app.use("/api/orders", require("./routes/order.routes"));

// connectDB();
// app.listen(5000, () => console.log("Server running on port 5000"));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// Connect to Database
connectDB();

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
