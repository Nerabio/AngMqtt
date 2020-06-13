import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SwitchMqttModel } from '../models/switch-mqtt-model';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'dan-toggle-mqtt',
  templateUrl: './dan-toggle-mqtt.component.html',
  styleUrls: ['./dan-toggle-mqtt.component.css']
})
export class DanToggleMqttComponent implements OnInit {

  @Input() model: SwitchMqttModel;
  @Output() modelChange = new EventEmitter<boolean>();
  @Input() disabled: boolean = false;
  @Output() onChanged = new EventEmitter<boolean>();
  private subscription: Subscription;

  constructor(private _mqttService: MqttService) { }

  ngOnInit() {
    console.log(this.model);
    this.subscribeTopic(this.model.publicTopic);
  }

  // организуем подписку на канал компонента
  subscribeTopic(topic: string): void {
    this.subscription = this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      this.catchTopicValue(message.topic, message.payload.toString());
    });
  }

  catchTopicValue(topic: string, value: any) {
    console.log(topic +' -> ' + value);
    if(topic == this.model.subscribeTopic){
      if(value == 'true' || value == '1' || value == 1 || value == true) {
        this.model.val = true;
        this.onChanged.emit(this.model.val);
      }
      if(value == 'false' || value == '0' || value == 0 || value == false){
        this.model.val = false;
        this.onChanged.emit(this.model.val);
      }
    }
  }

  publishTopic(topic: string, val: boolean): void {
    let str;
    if(val) str = this.model.payloadOn.toString();
    if(!val) str = this.model.payloadOff.toString();
    this._mqttService.unsafePublish(topic, str, { qos: 1, retain: true })
  }

  changeValue() {
    //this.model.val = true;
    this.publishTopic(this.model.publicTopic, this.model.val);
    this.onChanged.emit(this.model.val);
  }

}
