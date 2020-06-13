import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { SwitchMqttModel } from './ui-components/models/switch-mqtt-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public toggle: boolean = false;
  public switcher: SwitchMqttModel;
  public switcherTwo: SwitchMqttModel;
  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) { }

  ngOnInit(): void {
    this.switcher = new SwitchMqttModel();
    this.switcher.publicTopic= "rle";
    this.switcher.subscribeTopic= "rle";
    this.switcher.payloadOn= "1";
    this.switcher.payloadOff= "0";
    this.switcher.val= false;


    this.switcherTwo = new SwitchMqttModel();
    this.switcherTwo.publicTopic= "rle2";
    this.switcherTwo.subscribeTopic= "rle2";
    this.switcherTwo.payloadOn= "1";
    this.switcherTwo.payloadOff= "0";
    this.switcherTwo.val= false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  subscribeNewTopic(): void {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
      this.catchRelay(message.topic, message.payload.toString());
    });
    this.logMsg('subscribed to topic: ' + this.topicname)
  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }

  logMsg(message): void {
    this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }





  //////

  catchRelay(topic: string, value: any) {
    // console.log(topic +' -> ' + value);
    // if(topic == 'rle'){
    //   if(value == 'true' || value == '1' || value == 1 || value == true) this.toggle = true;
    //   if(value == 'false' || value == '0' || value == 0 || value == false) this.toggle = false;
    // }
  }

  log(ev){
    console.log(ev);
  }
}
