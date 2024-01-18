import packageJSON from "../../package.json";

const funArray: string[] = [
  "useClipboard",
  "useBinaryToURL",
  "useDownloadByURL",
  "useFileNameFromURL",
  "useFileTypeFromURL",
  "useGenMD5Hash",
  "useGenParamsUrl",
  "useStrSHA256Hash",
  "useRunTimes",
  "useGenUUID",
  "useFileSplitChunk",
  "useBinaryToBase64",
  "useWindowReadFile",

  "useAddDomClass",
  "useDomOnVisibleArea",
  "useGetDom",
  "useGetDomScrollTop",
  "useGetDomStyle",
  "useHadScrollBottom",
  "useRmDomClass",
  "useSetDomScrollTop",
  "useSetDomStyle",
  "useSetHTMLTitle",
  "useFullScreen",

  "useIsInApp",
  "useIsMobile",

  "createFetch",
  "UltraFetch",

  "useDebounce",
  "usePromiseInsist",
  "usePromiseQueue",
  "useThrottle",
  "useTimesClick",

  "useEmailLegal",
  "useIDCargLegal",
  "useIPV4Legal",
  "usePhoneLegal",
  "useIsPrime",
  "useIsPositiveInt",

  "useGetLStorage",
  "useRmLStorage",
  "useSetLStorage",

  "useCountDownFormat",
  "useGenTimeStamp",
  "useIsEarly",
  "useTimeFormat",

  "UseWebSocket",
  "useWebSocket",

  "useCurryFour",
  "useCurryThree",
  "useCurryTwo",

  "useCheckEmptyInObj",
  "useCheckSimpleData",
  "useDeepClone",
  "useDeepEqual",
  "useDeepInclude",
  "useGroupByCondition",
  "useJoinArrayWithNoRepeat",
  "useRepPartStr",
  "useRmRepeat",
  "useSetFirstSign",
  "useTrimStr",
  "useAssignByKey",

  "useAppendFile",
  "useGetFileTree",
  "useNodeReadFile",
  "useNodeWriteFile",
];

// 用于unplugin-auto-import自动导入
export const autoImport = () => {
  return (name: string) => {
    if (!name) return;
    if (funArray.includes(name)) {
      return {
        name,
        from: packageJSON.name,
      };
    }
  };
};
