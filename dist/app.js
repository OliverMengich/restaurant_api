"use strict";

var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./src/routes/routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use('/api', _routes.default);
app.get('/', (req, res) => {
  res.send('<h1>Hello, world!!</h1>');
});
app.listen(3000, () => {
  console.log("Server Running");
});
