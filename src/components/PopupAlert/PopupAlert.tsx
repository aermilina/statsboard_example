import React, { useState } from 'react';
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material';

interface Props {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}
/* The component renders popup alert*/

export default function PopupAlert({ type, message, onClose }: Props) {
  const [open, setOpen] = useState(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose?.();
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}>
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
