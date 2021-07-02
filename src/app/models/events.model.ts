import { iAlertReport, iPaqueteEvent, iPaqueteState, PropEvent } from "./reporte.model";
import firebase from "firebase/app"
import { iPropiedadState } from "./propiedad.model";

export interface iEventsResume {
  todayEvents: PropEvent[],
}

export interface iDay {
  date: Date,
  events: (PropEvent | iPaqueteState )[],
}


export interface iLavanderiaEvent extends iPropiedadState {
  start: number,
  action: LavanderiaAction
  over: number
  count?: number,
}

export type LavanderiaAction ='lavar' | 'secar'
