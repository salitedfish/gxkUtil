/**
 * 二进制文件转base64
 * @param file
 * @returns
 */
export const useBinaryToBase64 = (binary: Blob | ArrayBuffer | File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (res: ProgressEvent<FileReader>) => {
      const result = (res.target?.result as string) || "";
      const index = result.indexOf("base64");
      if (index === -1) {
        reject("");
      }
      const base64 = result.slice(index + 7);
      resolve(base64);
    };

    if (binary instanceof ArrayBuffer) {
      fileReader.readAsDataURL(new Blob([binary]));
    } else {
      fileReader.readAsDataURL(binary);
    }
  });
};
