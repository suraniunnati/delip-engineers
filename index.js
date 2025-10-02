// index.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <--- Your db.json file
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000; // Render will assign PORT dynamically

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
