import * as useFile from ".";

const randomString = "文件读写测试：" + new Date();

/**test useWriteFile */
test("test useWriteFile", async () => {
  try {
    const writeTip = await useFile.useWriteFile("./learn/fileText.sh")(randomString);
    expect(writeTip).toBe("write success");
  } catch (err) {
    expect(err).toMatch("");
  }
});

/**test useAppendFile */
test("test useAppendFile", async () => {
  try {
    const appendTip = await useFile.useAppendFile("./learn/fileText.sh")("追加语句");
    expect(appendTip).toBe("append success");
  } catch (err) {
    expect(err).toMatch("");
  }
});

/**test useReadFile */
test("test useReadFile", async () => {
  try {
    const fileContent = await useFile.useReadFile("./learn/fileText.sh");
    expect(fileContent).toBe(randomString + "追加语句");
  } catch (err) {
    expect(err).toMatch("");
  }
});
