const { exec } = require("child_process");

const update = () => {
  try {
    exec("npm install @ultra-man/noa -g");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = update;
