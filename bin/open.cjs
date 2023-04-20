const { exec } = require("child_process");

const open = (argvs) => {
  try {
    const name = argvs[0];
    let _name = "";
    if (["weixin", "wx", "WX", "Weixin", "WeiXin"].includes(name)) {
      _name = "Wechat";
    }
    if (["QQ", "qq", "Qq"].includes(name)) {
      _name = "QQ";
    }
    if (["vscode", "VSC", "vsc", "code"].includes(name)) {
      _name = "Visual Studio Code";
    }
    if (["google", "GC"].includes(name)) {
      _name = "Google Chrome";
    }
    if (["edge", "MSE", "MSC"].includes(name)) {
      _name = "Microsoft Edge";
    }
    if (["snipaste", "snp"].includes(name)) {
      _name = "Snipaste";
    }
    if (["NM", "nm", "wyymusic"].includes(name)) {
      _name = "NeteaseMusic";
    }
    if (["QM", "qm", "qqmusic"].includes(name)) {
      _name = "QQMusic";
    }
    if (["wps", "WPS"].includes(name)) {
      _name = "wpsoffice";
    }
    if (["termius", "term"].includes(name)) {
      _name = "Termius";
    }
    if (name) {
      exec("cd /Applications && open " + _name + ".app");
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = open;
