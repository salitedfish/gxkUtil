import * as useFile from ".";

const randomString = "文件读写测试：" + "-----------";
const fileAddress = "./learn/fileText.sh";
const appendString = "追加语句";

/**test useWriteFile */
test("test useWriteFile", async () => {
  try {
    const writeTip = await useFile.useWriteFile(fileAddress)(randomString);
    expect(writeTip).toBe("write success");
  } catch (err) {
    expect(err).toMatch("");
  }
});

/**test useAppendFile */
test("test useAppendFile", async () => {
  try {
    const appendTip = await useFile.useAppendFile(fileAddress)(appendString);
    expect(appendTip).toBe("append success");
  } catch (err) {
    expect(err).toMatch("");
  }
});

/**test useReadFile */
test("test useReadFile", async () => {
  try {
    const fileContent = await useFile.useReadFile(fileAddress);
    expect(fileContent).toBe(randomString + appendString);
  } catch (err) {
    expect(err).toMatch("");
  }
});
