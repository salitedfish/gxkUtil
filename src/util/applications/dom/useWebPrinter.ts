import print from "print-js";

const genStyStr = () => {
  let styleStr = "";

  let styleSheets = document.styleSheets;
  for (const key in styleSheets) {
    if (styleSheets.hasOwnProperty(key)) {
      if (!styleSheets[key].href) {
        let cssRules = styleSheets[key].cssRules;
        for (const k in cssRules) {
          if (cssRules.hasOwnProperty(k)) {
            styleStr += cssRules[k].cssText;
          }
        }
      }
    }
  }

  return styleStr;
};

// 网页打印
export const useWebPrinter = (params: print.Configuration) => {
  const style = genStyStr();
  // 如果没有传style，则默认用网页全部style
  if (typeof params === "object" && !params.style) {
    params.style = style;
  }
  print(params);
};
