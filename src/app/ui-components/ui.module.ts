import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DanToggleComponent } from './dan-toggle/dan-toggle.component';
import { DanToggleMqttComponent } from './dan-toggle-mqtt/dan-toggle-mqtt.component';


@NgModule({
  declarations: [
    DanToggleComponent,
    DanToggleMqttComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports:[
    DanToggleComponent,
    DanToggleMqttComponent
  ],
  providers: [],
})
export class UiModule { }
