//  const useWebSocket = (socketUrl: string) => {
export class UseWebSocket {
  socket: WebSocket | undefined;
  socketUrl: string;
  socketPingInterval: any;
  socketPongInterval: any;
  pingPong: string;
  messages: any[];
  constructor(socketUrl: string) {
    this.socketPingInterval = 0;
    this.socketPongInterval = 0;
    this.pingPong = "ping";
    this.socketUrl = socketUrl;
    this.messages = [];
    this.initSocket(this.socketUrl);
  }
  /**
   * 初始化socket
   */
  initSocket(socketUrl: string) {
    this.socket = new WebSocket(socketUrl);
    this.onOpen();
    this.onMessage();
    this.onError();
    this.onClose();
  }
  onOpen() {
    if (!this.socket) return;
    this.socket.onopen = (msg) => {
      console.log("--开始连接--", msg);
      this.initHeartCheck(1000, 2000);
    };
  }
  onMessage() {
    if (!this.socket) return;
    this.socket.onmessage = (msg) => {
      /**如果消息有则连接正常，否则连接失败需要重连 */
      if (msg) {
        this.pingPong = "pong";
        this.messages.push(msg);
        console.log("--接收消息--", msg);
      }
    };
  }
  onError() {
    if (!this.socket) return;
    this.socket.onerror = (msg) => {
      console.log("--错误消息--", msg);
    };
  }
  onClose() {
    if (!this.socket) return;
    this.socket.onclose = (msg) => {
      console.log("--关闭连接--", msg);
    };
  }
  initHeartCheck(pingInterval: number, pongInterval: number) {
    if (!this.socket) return;
    /**心跳检测，定时给socket发送消息, 如果心跳没有改变说明socket没有正常连接，则重启socket */
    this.socketPingInterval = setInterval(() => {
      if (!this.socket || this.socket.readyState != 1) return;
      this.socket.send("ping");
    }, pingInterval);
    this.socketPongInterval = setInterval(() => {
      if (this.pingPong === "ping") {
        this.reConnectAction();
      }
      this.pingPong = "ping";
    }, pongInterval);
  }
  /**
   * 手动重连
   */
  reConnectAction() {
    console.log("--开始重连--", this.socket?.readyState);
    this.pingPong = "ping";
    clearInterval(this.socketPingInterval);
    clearInterval(this.socketPongInterval);
    this.initSocket(this.socketUrl);
  }
  /**手动发消息 */
  sendAction(msg: any) {
    if (!this.socket) return;
    this.socket.send(msg);
  }
  /**手动关闭 */
  closeAction() {
    if (!this.socket) return;
    clearInterval(this.socketPingInterval);
    clearInterval(this.socketPongInterval);
    this.socket.close();
  }
  /**外部获取消息列表 */
  getMessages() {
    return this.messages;
  }
}
//   return new UseWebSocket(socketUrl);
// };
