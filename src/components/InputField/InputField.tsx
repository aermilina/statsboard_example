import React from 'react';
import { FormControl, FormLabel, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  formLabelText?: string;
  labelText?: string;
  inputType?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  icon?: boolean;
  handleDelete?: () => void;
  error?: string;
}

/* The component renders input with styles*/

export default function InputField({
  formLabelText,
  labelText,
  inputType = 'text',
  icon,
  handleDelete,
  onChange,
  name,
  error,
  ...other
}: Props) {
  return (
    <>
      <FormLabel sx={{ my: 1 }}>{formLabelText}</FormLabel>
      <FormControl fullWidth required sx={{ my: 1, display: 'flex;', flexFlow: 'row' }}>
        <TextField
          sx={{ flexGrow: 1 }}
          type={inputType}
          label={labelText}
          name={name}
          onChange={onChange}
          error={Boolean(error)}
          {...other}
        />
        {icon && (
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )}
      </FormControl>
    </>
  );
}
