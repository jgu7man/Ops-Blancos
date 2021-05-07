import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GdevCache } from '@jgu7man/gdev-tools';
import { PrendaModel } from 'src/app/models/prenda.model';
import { iUser } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GdevDate } from 'src/app/services/gdev-date.service';
import { PersonalService } from '../../manage-admins/personal.service';

@Component({
  templateUrl: './show-prenda.component.html',
  styleUrls: ['./show-prenda.component.scss']
})
export class ShowPrendaComponent implements OnInit, OnDestroy {

  prenda: PrendaModel
  codigo: string
  constructor(
    private _cache: GdevCache,
    private _route: ActivatedRoute,
    public date_: GdevDate,
    private _dashboard: DashboardService,
    public personal: PersonalService
  ) {
    this._dashboard.toggleBack = true
    this.prenda = this._cache.getDataKey('currentPrenda')
    this.codigo = this._route.snapshot.params['codigo']
    console.log( this.prenda )
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._cache.deleteDataKey('currentPrenda')
    this._dashboard.toggleBack = false
  }

  getUser(uid: string) {
    return this.personal.getMemberData(uid)
  }

}
