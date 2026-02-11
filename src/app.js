const express = require("express");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");
const errorMiddleware = require("./middlewares/error.middleware");

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
