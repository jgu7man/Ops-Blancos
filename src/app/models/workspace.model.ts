export type gWorkspace = 'limpieza' | 'lavanderia' | 'admin'

export interface iDashboard {
  name: gWorkspace,
  views: iDashboardView[]
}

export interface iDashboardView {
  route: string,
  icon: string,
  display: string,
  alike?: string,
  queryParams?: any
}
