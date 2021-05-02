import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g-column-editor',
  templateUrl: './column-editor.component.html',
  styleUrls: ['./column-editor.component.scss']
})
export class ColumnEditorComponent implements OnInit, OnDestroy {

  columnCtrl: FormControl = new FormControl('')
  @Input() value: string = ''
  @Output() change: EventEmitter<string> = new EventEmitter();
  valueSubscription: Subscription
  constructor() {
    this.valueSubscription =
    this.columnCtrl.valueChanges
      .subscribe((name: string) => {
      this.change.emit(name)
    })
   }

  ngOnInit(): void {
    this.columnCtrl.setValue(this.value)
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe()
  }

}
