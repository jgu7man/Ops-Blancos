import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  templateUrl: './columns-selector.component.html',
  styleUrls: ['./columns-selector.component.scss']
})
export class ColumnsSelectorComponent implements OnInit {


  choosenColumns: Map<number, string> = new Map();
  constructor(
    @Inject(MAT_DIALOG_DATA) public headersRow: string[],
    public dialog: MatDialogRef<ColumnsSelectorComponent>
  ) { }

  ngOnInit(): void {
    console.log( this.headersRow )
  }

  colValue(col: string, index: number) {
    return {col, index}
  }

  onlyColumnSelected(event: MatSelectionListChange) {
    console.log( event )
    event.options.forEach(o => {
      let { col, index } = o.value
      this.choosenColumns.set(index, col)
    })
  }

  editColumn(name: any, index: number) {
    this.choosenColumns.set(index, name)
  }

  close() {
    this.dialog.close(this.choosenColumns)
  }

}
