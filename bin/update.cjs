const { exec } = require("child_process");

const update = (argvs) => {
  try {
    const version = argvs[0];
    if (version) {
      exec("npm install @ultra-man/noa@" + version + " -g");
    } else {
      exec("npm install @ultra-man/noa -g");
    }
    console.log("gxk: update success!!!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = update;
