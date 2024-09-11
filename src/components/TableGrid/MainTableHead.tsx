import React from 'react';
import { TableProps, Row } from '@/types';
import { headCells } from '@/constants';
import { Box, TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

/* The component renders the head of the table*/

export default function MainTableHead(props: TableProps) {
  const { onSelectAllClick, order, orderBy, numSelected = 0, rowCount = 0, onRequestSort } = props;
  const createSortHandler = (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
    onRequestSort?.(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all projects'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.name}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.name ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.name}
              direction={orderBy === headCell.name ? order : 'asc'}
              onClick={createSortHandler(headCell.name as keyof Row)}>
              {headCell.label}
              {orderBy === headCell.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
