/* Типы данных приложения*/

export interface Row {
  id: number;
  project_id: number;
  name: string;
  created_at: string;
  url: string;
  kpiNumber: number;
  kpiDate: string;
  views: number;
  kpiType: string;
}

export type Order = 'asc' | 'desc';

export interface TableProps {
  numSelected?: number;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof Row) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: Order;
  orderBy?: string;
  rowCount?: number;
}

export interface TableToolbarProps {
  numSelected: number;
}

export interface LegendItems {
  text: string;
  textColor: string;
}

export type FieldOption = {
  name: string;
  id: number;
};
export type FieldValues = {
  name: string;
  urlOptions: {
    url: string;
    project_id: number;
  }[];
  kpiDate?: string;
  kpiNumber?: number;
  date: string;
  kpiType: string;
};

export interface Project {
  id: number;
  name: string;
}
export interface CreateUrlArgs {
  page?: number;
  projectId?: string;
  id?: string;
}
