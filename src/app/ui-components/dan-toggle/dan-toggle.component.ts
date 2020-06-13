import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dan-toggle',
  templateUrl: './dan-toggle.component.html',
  styleUrls: ['./dan-toggle.component.css']
})
export class DanToggleComponent implements OnInit {

  @Input() model: boolean;
  @Output() modelChange = new EventEmitter<boolean>();
  @Input() disabled: boolean = false;
  @Output() onChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  change(increased:any) {
    this.onChanged.emit(this.model);
  }



}
