import WebSocket from "isomorphic-ws";
import { AppDispatch } from "../store/store";
import { closed, connected, setError } from "../store/ws-store";

let WS_URL =
  process.env.REACT_APP_WEBSOCKET_URL ||
  "wss://tj7vr9xw53.execute-api.us-east-1.amazonaws.com/staging";

// WS_URL = "wss://tj7vr9xw53.execute-api.us-east-1.amazonaws.com/staging";
export class WebSocketService {
  private websocket: WebSocket;
  private messageListeners: Array<{ listener: (data: any) => void }>;
  public isOpen = false;
  private storeDispatch: AppDispatch;
  constructor() {
    this.websocket = null;
    this.messageListeners = [];
    this.isOpen = false;
  }

  /**
   *  Set up WebSocket connection for a new user and
   *  basic listeners to handle events
   */
  connect(dispatch: AppDispatch) {
    if (this.websocket) {
      this.disconnect();
    }
    this.storeDispatch = dispatch;
    this.websocket = new WebSocket(WS_URL);
    this.websocket.onerror = (error) => this.onError(error);
    this.websocket.onopen = () => this.onConnOpen();
    this.websocket.onmessage = (message) => this.onMessage(message);
    this.websocket.onclose = () => this.onConnClose();
  }
  disconnect() {
    if (this.websocket) this.websocket.close();
    delete this.websocket;
    delete this.storeDispatch;
  }

  onError(error: WebSocket.ErrorEvent) {
    console.log(" : WebSocketService -> onError -> error", error);
    this.storeDispatch(setError("Error " + error.message));
  }
  /**
   *  Show connection status to us in the log
   */
  onConnOpen() {
    this.isOpen = true;
    console.log("Websocket connected!");
    this.storeDispatch(connected());
  }

  /**
   *  Log lost connection for now
   */
  onConnClose() {
    console.log("Websocket closed!");
    if (this.storeDispatch) this.storeDispatch(closed());
  }

  sendMessage = (route: any, data: any) => {
    if (this.websocket && this.isOpen) {
      console.log("route", route); // eslint-disable-line no-console
      this.websocket.send(
        JSON.stringify({
          route: route,
          data: data,
        })
      );
    } else {
      console.log(`Websocket connection not found!!`);
    }
  };

  addMessageListener(listener: (data: any) => void) {
    const ref = { listener };
    this.messageListeners.push(ref);
    return ref;
  }

  removeMessageListenere(ref: any): boolean {
    const index = this.messageListeners.indexOf(ref);
    if (index !== -1) {
      this.messageListeners.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Handler that receives the actual messages from the WebSocket API
   * For now it simply returns the parsed message body to the appropriate
   * registered handler
   * @param data Message body received from WebSocket
   */
  onMessage(event: WebSocket.MessageEvent) {
    if (event) {
      const message = JSON.parse(event.data as string);
      this.messageListeners.forEach((item) => {
        if (item && typeof item.listener === "function") {
          item.listener(message);
        }
      });
    }
  }
}
const ws = new WebSocketService();
export default ws;
