import * as useFile from ".";
import { useDeepEqual } from "../../index";

const randomString = "文件读写测试：" + "-----------";
const fileAddress = "./fileText.sh";
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

/**test useGetFileTree */
test("test useGetFileTree", async () => {
  try {
    const fileTree = await useFile.useGetFileTree("./src/util/node/file");
    const sliceFileTree = fileTree.slice(0, 3);

    expect(useDeepEqual(sliceFileTree[0].fileName, "fileText.sh")).toBe(true);
  } catch (err) {
    expect(err).toMatch("");
  }
});
