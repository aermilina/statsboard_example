import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  CircularProgress
} from '@mui/material';
import { stableSort, getComparator, createUrl, getProjectById } from '@/utils';
import MainTableHead from './MainTableHead';
import TableToolbar from './TableToolbar';
import axios from 'axios';
import { useProjects, useRows, useRequestSort } from '@/hooks';
import PopupAlert from '../PopupAlert/PopupAlert';
import { BASE_URL } from '@/constants';
import ConfirmationDialog from '../ConfirmationDialog';

/* The component renders the statics table*/

export default function TableGrid() {
  const [projectId, setProjectId] = useState<string>();
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState('');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<string[] | undefined>([]);
  const projectData = useProjects();
  const { projects } = projectData;
  const rowsData = useRows({ projectId, page });
  const { rows, errorRows, isLoading, refetch, total } = rowsData;
  const { order, orderBy, handleRequestSort } = useRequestSort();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteRows = () => {
    axios
      .post(
        `some url`,
        { ids: JSON.stringify(selected) },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setErrorDelete(data.error.message);
        }
        refetch();
        setSuccessDelete(true);
      })
      .catch((error) => setErrorDelete(error.message));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows && rows.map((n) => n.id);
      setSelected(newSelected || []);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows!.length) : 0;

  const visibleRows = useMemo(() => {
    const rowsWithEstimate = rows.map((item) => {
      const estimate = item.views - item.kpiNumber;
      return { ...item, estimate };
    });
    return stableSort(rowsWithEstimate || [], getComparator(order, orderBy));
  }, [rows, order, orderBy, page]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px'
        }}>
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          numSelected={selected.length}
          filters={filters}
          setFilters={setFilters}
          rows={rows}
          projects={projects}
          action={handleDeleteRows}
          setProjectId={setProjectId}
          setOpen={setOpenDialog}
          openDialog={openDialog}
          setPage={setPage}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <MainTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows && rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const colorRedByNumber = row.views / row.kpiNumber >= 1;
                const colorYellow = row.views / row.kpiNumber > 0.8 && '#ffeb3b';
                const colorRedByDate = new Date(row.kpiDate) < new Date(Date.now());
                const colorRed =
                  row.kpiType === 'date'
                    ? colorRedByDate && '#f44336'
                    : colorRedByNumber && '#f44336';
                const background: string = colorRed || colorYellow || '#fff';
                const {
                  name,
                  project_id,
                  created_at,
                  kpiNumber,
                  kpiDate,
                  views,
                  url,
                  estimate
                } = row;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer', backgroundColor: { background } }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {getProjectById(projects || [], project_id)}
                    </TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">{created_at}</TableCell>
                    <TableCell align="left">
                      <a href={url}>{url}</a>
                    </TableCell>
                    <TableCell align="left">{kpiDate || kpiNumber}</TableCell>
                    <TableCell align="left">{views}</TableCell>
                    <TableCell align="left">{estimate}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={total || 0}
          rowsPerPage={20}
          page={page}
          onPageChange={handleChangePage}
          slotProps={{
            actions: {
              nextButton: {
                disabled: total === undefined || total < 2
              }
            }
          }}
        />
      </Paper>
      {errorRows && (
        <PopupAlert type="error" message={`${errorRows}. Ask the system admonistrator about the help`} />
      )}
      {successDelete && <PopupAlert type="success" message="You have successfully removed the line" />}
      {errorDelete && <PopupAlert type="error" message={errorDelete} />}
      {openDialog && (
        <ConfirmationDialog
          title="Remove lines"
          dialogText="Do you exactly want to remove lines?"
          buttonText="Remove"
          action={handleDeleteRows}
          setOpen={setOpenDialog}
          open={openDialog}
        />
      )}
    </Box>
  );
}
