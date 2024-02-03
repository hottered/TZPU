import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public hubConnection: signalR.HubConnection =
    new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/notification')
      .build();

  constructor() {
    this.hubConnection.start().then(() => {
      console.log('Connection started ');
      // this.hubConnection.invoke("SendCoordinates").catch(err => console.log('greska : ' + err));
    });
  }
}
