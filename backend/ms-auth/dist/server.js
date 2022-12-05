"use strict";

var _app = _interopRequireDefault(require("./app"));
var _models = _interopRequireDefault(require("./models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_models.default.mongoose.connect(_models.default.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});
const PORT = process.env.APP_PORT || 8080;
_app.default.listen(PORT, () => {
  console.log(`Server ${process.env.APP_NAME || ''} is running on port ${PORT}.`);
});