import { PropEvent } from "./reporte.model";
import firebase from "firebase/app"
import { iCurrentProp } from "./propiedad.model";

export interface iEventsResume {
  todayEvents: PropEvent[],
}


export interface iLavanderiaEvent extends iCurrentProp {
  start: number,
  action: LavanderiaAction
  count?: number,
}

export type LavanderiaAction ='lavar' | 'secar'
