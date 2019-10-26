import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Broadcaster } from "./broadcaster";

@Injectable()
export class MessageEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: boolean): void {
    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<boolean> {
    return this.broadcaster.on<boolean>(MessageEvent);
  }
}
