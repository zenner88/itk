import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Broadcaster } from "./broadcaster";

@Injectable()
export class MessageEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: any): void {
    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<any> {
    return this.broadcaster.on<any>(MessageEvent);
  }
 
}
