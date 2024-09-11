import React from 'react';
import { TableToolbarProps } from '@/types';
import { alpha } from '@mui/material/styles';
import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Legend from '../Legend';
import { legend } from '@/constants';
import SelectField from '../SelectField';

import { Row, Project } from '@/types';
interface Props {
  filters?: string[];
  setFilters: (filters: string[] | undefined) => void;
  rows?: Row[];
  projects?: Project[];
  action: () => void;
  setProjectId: (id: string) => void;
  setOpen: (open: boolean) => void;
  openDialog: boolean;
  setPage: (page: number) => void;
}

/* The component renders the header toolbar for the table*/

export default function TableToolbar({
  filters,
  setFilters,
  rows,
  projects,
  action,
  setProjectId,
  setOpen,
  setPage,
  openDialog = false,
  ...props
}: Props & TableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        flexFlow: 'row wrap',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ margin: '0 auto 0 0' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%', mr: 2 }} variant="h6" id="tableTitle" component="div">
          The statistics table
          <SelectField
            fullwidth
            small
            name="filters"
            defaultValue={0}
            allProjects
            fieldOptions={projects}
            labelText="Choose the project"
            onChange={(e) => {
              setProjectId(e.target.value);
              setPage(0);
            }}
          />
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Remove lines">
          <IconButton>
            <DeleteIcon onClick={() => setOpen(true)} />
          </IconButton>
        </Tooltip>
      ) : (
        <Legend legend={legend} />
      )}
    </Toolbar>
  );
}
