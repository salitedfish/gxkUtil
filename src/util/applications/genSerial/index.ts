interface RequestPortConfig {
  filters: { usbVendorId?: string; usbProductId?: string }[];
}
interface GetPortConfig {
  comIndex?: string;
}
interface OpenPortConfig {
  baudRate?: number;
}
type ReadCallBack = (data: string) => void;

interface Config {
  getPortConfig: GetPortConfig;
  openPortConfig: OpenPortConfig;
  readCallBack: ReadCallBack;
}

/**
 * 串口类
 */
export class UltraSerial {
  private loopReadAble: boolean = true;
  public port: any;
  private reader: any;
  private readableStream: any;
  private textDecoderStream: any;
  constructor() {}

  // 这个方法是前置操作，浏览器想要连接串口，需要先通过这个方法手动获取串口权限
  // 请求所有串口，需要用户手动授权串口
  static async requestPort(obj?: RequestPortConfig) {
    if (navigator && (navigator as any).serial) {
      await (navigator as any).serial.requestPort(obj);
      console.log("请求串口成功");
    } else {
      console.log("当前环境不支持串口");
    }
  }
  // 初始化串口连接
  async run(obj: Config) {
    try {
      await this.getPorts(obj.getPortConfig);
      await this.openPort(obj.openPortConfig);
      await this.genReader();
      await this.read(obj.readCallBack);
    } catch (err) {
      console.log(err);
      this.reset();
    }
  }
  // 获取已经授权的串口，根据配置自动连接指定串口
  private async getPorts(obj: GetPortConfig) {
    // 根据传递的com口设置index
    // const index = Number(obj.comIndex?.replace(/COM|com/g, ""));
    // 只取第一个授权的串口
    const index = Number(obj.comIndex);
    if (navigator && (navigator as any).serial) {
      const ports = await (navigator as any).serial.getPorts(obj);
      if (ports.length > 0) {
        if (index && index <= ports.length) {
          this.port = ports[index - 1];
          console.log("获取指定串口成功");
        } else {
          console.log("未获取到指定串口");
        }
      }
      // 如果没有授权的串口，则请求串口权限，并再次获取串口
      else {
        console.log("未获取到已授权的串口");
        await UltraSerial.requestPort();
        await this.getPorts(obj);
      }
    } else {
      console.log("当前环境不支持串口");
    }
  }
  // 打开串口
  private async openPort(obj: OpenPortConfig) {
    if (this.port) {
      await this.port.open(obj);
      console.log("打开串口成功");
    }
  }
  // 获取串口输入流
  private async genReader() {
    if (this.port) {
      if (this.port.readable) {
        this.textDecoderStream = new TextDecoderStream();
        this.readableStream = this.port.readable.pipeTo(this.textDecoderStream.writable);
        this.reader = this.textDecoderStream.readable.getReader();
        console.log("获取输入流成功");
      } else {
        console.log("获取输入流失败");
      }
    }
  }
  //  开始读取串口输入流
  private async read(callBack: ReadCallBack) {
    if (this.reader) {
      // 初始数据
      let str = "";
      // 循环读取
      while (this.loopReadAble) {
        const res = await this.reader.read();
        str = str + res.value;
        // 如果读取结束，或者有回车或换行符则视为结束，执行一次回调，但是数据还是在继续读取
        if (res.done || (res.value && (res.value.includes("\n") || res.value.includes("\r")))) {
          callBack(str);
          str = "";
        }
      }
    }
  }
  // 关闭串口
  public async close() {
    try {
      if (this.reader) {
        // 1、先取消循环读取
        this.loopReadAble = false;
        // 2、取消读取器（取消会触发reader.read()）
        this.reader.cancel();
        // 3、解锁读取器
        this.reader.releaseLock();
        // 4、等到读取器已解锁
        await this.readableStream.catch(() => {});
        // 5、关闭串口
        await this.port.close();
        console.log("关闭串口成功");
      } else {
        console.log("关闭串口成功");
      }
      // 重置对象
      this.reset();
    } catch (err) {
      console.log(err);
    }
  }
  // 重置数据
  private async reset() {
    this.port = null;
    this.reader = null;
    this.readableStream = null;
    this.textDecoderStream = null;
    this.loopReadAble = true;
  }
}

/**
 *
 * @returns UltraSerial
 */
export const genSerial = () => {
  return new UltraSerial();
};
