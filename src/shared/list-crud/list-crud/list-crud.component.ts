import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ContentChild, TemplateRef, Output, EventEmitter, Injector, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'gdev-list-crud',
  templateUrl: './list-crud.component.html',
  styleUrls: ['./list-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCrudComponent implements OnInit, AfterViewInit, OnDestroy {

  itemSelected: any
  @Input() list: any[] = []
  private _List : BehaviorSubject<any> = new BehaviorSubject([]);
  @Input() set List(variable: any) { this._List.next(variable); }
  get List() { return this._List.getValue()}

  @Input() listName: string = ''
  @Input() itemSelector: string = ''
  @Input() selectTemplate: TemplateRef<any> = {} as TemplateRef<any>
  @Input() addTemplate: TemplateRef<any> = {} as TemplateRef<any>
  @Input() height_vh: any

  injectData?: Injector
  itemCtx: any
  // @ContentChild()

  @ViewChild( 'currentItem' ) public itemPanel?: MatDrawer
  @ViewChild( 'listPanel' ) listPanel?: MatSelectionList
  @ViewChild( 'addItem' ) addPanel?: MatDrawer


  @Output() onAdd: EventEmitter<any> = new EventEmitter()
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  private listSubscription!: Subscription

  constructor (

  ) { }

  ngOnInit(): void {
    this.listSubscription =
    this._List.subscribe(list => {
      this.list = list
    })
  }

  ngAfterViewInit() {
  }

  onCloseColeccion() {
    this.itemPanel?.close()
    this.listPanel?.deselectAll()
    this.itemSelected = undefined
  }


  onItemSelected( selected: MatSelectionListChange ) {
    if ( this.itemPanel ) {
      if ( this.itemPanel.opened ) { this.itemPanel.close() }
    }
    this.itemSelected = selected.options[0].value
    this.itemCtx = {item: this.itemSelected}
    this.itemPanel?.open()
  }

  closeAddPanel() {
    this.addPanel?.close()
  }

  save() {
    this.addPanel?.close()
    this.onSave.emit()

  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe()
  }

}



