const info = (argvs) => {
  console.log(process.argv);
  console.log(argvs);
  console.log(process.cwd());
};

module.exports = info;
