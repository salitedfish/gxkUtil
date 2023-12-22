import { useGenParamsUrl } from "../../index";

type SocketConfig = Partial<{
  resHandler: (msg: MessageEvent<any>) => void;
  errHandler: (e: Event) => void;
  closeHandler: (e: CloseEvent) => void;
  openHandler: (e: Event) => void;
  params: Record<string, any>;
  dev: boolean;
  heartCheck: boolean;
}>;

class UseWebSocket {
  private socket: WebSocket | undefined;
  private socketUrl: string;
  private socketPingInterval: any;
  private socketPongInterval: any;
  private pingPong: string;
  private messages: any[];
  private config: SocketConfig;
  constructor(socketUrl: string, config: SocketConfig) {
    this.socketPingInterval = 0;
    this.socketPongInterval = 0;
    this.pingPong = "ping";
    this.socketUrl = socketUrl;
    this.messages = [];
    this.config = config;
    this.initSocket(this.socketUrl);
  }
  // 初始化socket
  private initSocket(socketUrl: string) {
    let url = socketUrl;
    if (this.config.params) {
      url = useGenParamsUrl(socketUrl)(this.config.params);
    }
    this.socket = new WebSocket(url);
    this.onOpen(this.config);
    this.onMessage(this.config);
    this.onError(this.config);
    this.onClose(this.config);
  }
  // 开始时触发
  private onOpen(config: SocketConfig) {
    if (!this.socket) return;
    this.socket.onopen = (msg) => {
      if (config.dev) {
        console.log("--开始连接--", msg);
      }
      if (config.openHandler) {
        config.openHandler(msg);
      }
      if (config.heartCheck !== false) {
        this.initHeartCheck(1000, 2000);
      }
    };
  }
  // 有消息时触发
  private onMessage(config: SocketConfig) {
    if (!this.socket) return;
    this.socket.onmessage = (msg) => {
      /**如果消息有则连接正常，否则连接失败需要重连 */
      if (msg) {
        this.pingPong = "pong";
        this.messages.push(msg);
        if (config.resHandler) {
          config.resHandler(msg);
        }
        if (config.dev) {
          console.log("--接收消息--", msg);
        }
      }
    };
  }
  // 错误时触发
  private onError(config: SocketConfig) {
    if (!this.socket) return;
    this.socket.onerror = (msg) => {
      if (config.errHandler) {
        config.errHandler(msg);
      }
      if (config.dev) {
        console.log("--错误消息--", msg);
      }
    };
  }
  // 关闭时触发
  private onClose(config: SocketConfig) {
    config;
    if (!this.socket) return;
    this.socket.onclose = (msg) => {
      if (config.closeHandler) {
        config.closeHandler(msg);
      }
      if (config.dev) {
        console.log("--关闭连接--", msg);
      }
    };
  }
  // 心跳检测
  private initHeartCheck(pingInterval: number, pongInterval: number) {
    if (!this.socket) return;
    /**心跳检测，定时给socket发送消息, 如果心跳没有改变说明socket没有正常连接，则重启socket */
    this.socketPingInterval = setInterval(() => {
      if (!this.socket || this.socket.readyState !== 1) return;
      this.socket.send("ping");
    }, pingInterval);
    this.socketPongInterval = setInterval(() => {
      if (this.pingPong === "ping") {
        this.reConnectAction();
      }
      this.pingPong = "ping";
    }, pongInterval);
  }
  // 手动重连
  reConnectAction() {
    if (this.config.dev) {
      console.log("--开始重连--", this.socket?.readyState);
    }
    this.pingPong = "ping";
    clearInterval(this.socketPingInterval);
    clearInterval(this.socketPongInterval);
    this.initSocket(this.socketUrl);
  }
  // 手动发消息
  sendAction(msg: any) {
    if (!this.socket) return;
    this.socket.send(msg);
  }
  // 手动关闭
  closeAction() {
    if (!this.socket) return;
    clearInterval(this.socketPingInterval);
    clearInterval(this.socketPongInterval);
    this.socket.close();
  }
  // 外部获取消息列表
  getMessages() {
    return this.messages;
  }
  // 外部获取配置
  getConfig() {
    return this.config;
  }
}

export const useWebSocket = (socketUrl: string, config: SocketConfig) => {
  return new UseWebSocket(socketUrl, config);
};
