export class SwitchMqttModel {
  publicTopic: string;
  subscribeTopic: string;
  payloadOn: string
  payloadOff: string
  val: boolean;

  constructor(){
    this.val = false;
  }
}
