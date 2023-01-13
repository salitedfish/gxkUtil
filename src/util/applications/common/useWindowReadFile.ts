/**
 * window下面的读取文件内容，取消传入文件对象
 * @param file
 * @returns
 */
export const useWindowReadFile = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsText(file, "utf-8");
    } catch (error) {
      reject(error);
    }
  });
};
