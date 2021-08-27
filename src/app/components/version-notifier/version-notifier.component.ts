import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { iMxMain, VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'g-version-notifier',
  templateUrl: './version-notifier.component.html',
  styleUrls: ['./version-notifier.component.scss']
})
export class VersionNotifierComponent implements OnInit {

  version!: Observable<string>;
  constructor (
    private _version: VersionService
  ) {
    this.version = this._version.get()
  }

  ngOnInit(): void {
  }

}

