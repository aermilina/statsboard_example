interface HeadCell {
  disablePadding: boolean;
  name: string;
  label: string;
  numeric: boolean;
}

/* Константа с названиями столбцов таблицы*/

export const headCells: HeadCell[] = [
  {
    name: 'project_id',
    numeric: false,
    disablePadding: false,
    label: 'Project'
  },
  {
    name: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Title'
  },
  {
    name: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    name: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL'
  },
  {
    name: 'kpi_number' || 'kpi_date',
    numeric: true,
    disablePadding: false,
    label: 'Expected KPI'
  },
  { name: 'views', numeric: true, disablePadding: false, label: 'Views' },
  { name: 'estimate', numeric: true, disablePadding: false, label: 'Estimate' }
];
