const { exec } = require("child_process");

const open = (argvs) => {
  try {
    const name = argvs[0];
    let _name = "";
    if (["weixin", "wx", "WX", "Weixin", "WeiXin"].includes(name)) {
      _name = "Wechat.app";
    }
    if (["QQ", "qq", "Qq"].includes(name)) {
      _name = "QQ";
    }
    if (["vscode", "VSC", "vsc", "code"].includes(name)) {
      _name = "'Visual Studio Code.app'";
    }
    if (["google", "GC"].includes(name)) {
      _name = "'Google Chrome.app'";
    }
    if (["edge", "MSE", "MSC"].includes(name)) {
      _name = "'Microsoft Edge.app'";
    }
    if (["snipaste", "snp"].includes(name)) {
      _name = "Snipaste.app";
    }
    if (["NM", "nm", "wyymusic"].includes(name)) {
      _name = "NeteaseMusic.app";
    }
    if (["QM", "qm", "qqmusic"].includes(name)) {
      _name = "QQMusic.app";
    }
    if (["wps", "WPS"].includes(name)) {
      _name = "wpsoffice.app";
    }
    if (["termius", "term"].includes(name)) {
      _name = "Termius.app";
    }
    if (name) {
      exec("cd /Applications && open " + _name);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = open;
