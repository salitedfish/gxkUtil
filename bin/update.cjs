const { exec } = require("child_process");
const packageJSON = require("../package.json");

const update = () => {
  try {
    exec(`npm install @ultra-man/noa@${packageJSON.version} -g`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = update;
