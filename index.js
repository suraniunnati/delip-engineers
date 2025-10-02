// index.js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, JS) from "public" folder
app.use(express.static("public"));

// Example API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Render!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
