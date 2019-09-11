import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { SmartTableComponent } from "../smart-table.component";

@Component({
  template: `
    Message: {{ message }}
    <form class="form">
      <label for="subject">Subject:</label>
      <input nbInput id="subject" type="text">

      <label class="text-label" for="text">Text:</label>
      <textarea nbInput id="text"></textarea>
    </form>
  `,
  styleUrls: ['window-form.component.scss'],
})
export class WindowFormComponent implements AfterViewInit {
  message = event;
  // @ViewChild(SmartTableComponent, {static: false}) hello: SmartTableComponent;
  // message:string;
  ngAfterViewInit() {
    // this.message = this.hello.message
    console.log(this.message);
  }
  constructor(public windowRef: NbWindowRef) {}
  close() {
    this.windowRef.close();
  }
}
