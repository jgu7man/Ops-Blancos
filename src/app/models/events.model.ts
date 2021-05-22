import { iAlertReport, iPaqueteEvent, iPaqueteState, PropEvent } from "./reporte.model";
import firebase from "firebase/app"
import { iCurrentProp } from "./propiedad.model";

export interface iEventsResume {
  todayEvents: PropEvent[],
}

export interface iDay {
  date: Date,
  events: (PropEvent | iPaqueteState )[],
}


export interface iLavanderiaEvent extends iCurrentProp {
  start: number,
  action: LavanderiaAction
  over: number
  count?: number,
}

export type LavanderiaAction ='lavar' | 'secar'
