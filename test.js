const aTest = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej();
    }, 1000);
  });
};

const bTest = async () => {
  try {
    return await aTest();
    /**promise 返回rej这里就不会执行了 */
  } catch (err) {
    return Promise.reject("123");
  }
};

const cTest = async () => {
  console.log(1);
  let a;
  try {
    a = await bTest();
  } catch (err) {
    a = [];
  }
};
cTest();
