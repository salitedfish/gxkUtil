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

/**
 * 前端打印
 * @param params 如：{ type: 'html', printable: 'printDOMId', ignoreElements: ['notPrintDOMId'], showModal: true, onError: (err) => { console.log(err) } }
 * @returns
 */
export const useWebPrinter = (params: print.Configuration) => {
  // 如果没有传style，则默认用网页全部style
  if (typeof params === "object" && !params.style) {
    const style = genStyStr();
    params.style = style;
  }
  // 默认为html
  if (!params.type) {
    params.type = "html";
  }
  // 默认不扫描style
  if (!params.scanStyles) {
    params.scanStyles = false;
  }
  print(params);
};
