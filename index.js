const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const cifRoutes = require("./routes/cifRoutes");

// Use routes
app.use("/", cifRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
