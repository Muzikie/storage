const express = require("express");
const app = express();
const routes = require("./routes");

// Import other required modules and configurations

const PORT = process.env.PORT || 3001;

app.use(express.static('uploads'));

// Configure the app, set up routes, middleware, etc.
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`File Server is running on http://localhost:${PORT}`);
});

module.exports = app;
