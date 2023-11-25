// websocket.service.ts

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  connect() {
    // Connect to the WebSocket server
    this.socket.connect();
  }

  disconnect() {
    // Disconnect from the WebSocket server
    this.socket.disconnect();
  }

  sendMessage(message: string) {
    // Send a message to the WebSocket server
    this.socket.emit('message', message);
  }

  receiveMapUpdate() {
    return this.socket.fromEvent('map-update');
  }
}
