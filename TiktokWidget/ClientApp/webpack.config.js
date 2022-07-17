const webpackLayout = require("./configs/webpack.config.prod");
const webpackAdmin = require("./configs/webpack.config.admin");

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === "build:admin") {
  module.exports = {
    ...webpackAdmin,
  };
  console.info(
    "======================================************************================================================"
  );
  console.info(
    "======================================> MODE [ ADMIN PRODUCTION ] <==========================================="
  );
  console.info(
    "======================================************************================================================"
  );
}

if (TARGET === "build:layout") {
  module.exports = {
    ...webpackLayout,
  };
  console.info(
    "======================================************************================================================"
  );
  console.info(
    "======================================> MODE [ LAYOUT PRODUCTION ] <=========================================="
  );
  console.info(
    "======================================************************================================================"
  );
}
