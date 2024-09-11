import React from 'react';
import {
  Dialog,
  Button,
  DialogContentText,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';

interface Props {
  action: () => void;
  title: string;
  dialogText: string;
  buttonText: string;
  setOpen: (open: boolean) => void;
  open: boolean;
}

/* The component renders a dialog to approve an action*/

export default function ConfirmationDialog({
  action,
  title,
  dialogText,
  buttonText,
  setOpen,
  open
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    action();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAction}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
}
