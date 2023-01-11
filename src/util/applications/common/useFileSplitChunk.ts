import { useCurryTwo } from "../../../util/currying";

type FileSplitChunkOptions = {
  count?: number;
  size?: number; // 1m 传 1024 * 1024
};

/**
 * 将文件根据大小或者数量分块
 * @param file
 * @param options
 * @returns
 */
const useFileSplitChunkShallow = async (file: Blob | File, options: FileSplitChunkOptions = {}) => {
  const chunkList: Blob[] = [];
  const fileSize = file.size;
  const chunkSize = options.size || Math.floor(fileSize / (options.count || 1));

  const chunksCount = Math.ceil(fileSize / chunkSize);
  let chunkIndex = 0;
  while (chunkIndex < chunksCount) {
    const start = chunkIndex * chunkSize;
    const end = start + chunkSize >= fileSize ? fileSize : start + chunkSize;
    chunkList.push(file.slice(start, end));
    chunkIndex++;
  }
  return chunkList;
};

export const useFileSplitChunk = useCurryTwo(useFileSplitChunkShallow);
