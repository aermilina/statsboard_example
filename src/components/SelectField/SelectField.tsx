import React from 'react';
import { FormControl, FormLabel, MenuItem, TextField } from '@mui/material';
import { FieldOption } from '@/types';

interface Props {
  formLabelText?: string;
  labelText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldOptions?: FieldOption[];
  name: string;
  defaultValue?: number;
  error?: string;
  value?: string | number;
  fullwidth?: boolean;
  required?: boolean;
  small?: boolean;
  allProjects?: boolean;
}
/* The component renders the select field with styles*/

export default function SelectField({
  formLabelText,
  labelText,
  fieldOptions,
  onChange,
  name,
  defaultValue,
  error,
  fullwidth = false,
  required = false,
  small,
  allProjects,
  ...other
}: Props) {
  return (
    <FormControl fullWidth={fullwidth} required={required} sx={{ my: 1, minWidth: '200px' }}>
      {formLabelText && <FormLabel sx={{ my: 1 }}>{`${formLabelText}:`}</FormLabel>}
      <TextField
        name={name}
        defaultValue={defaultValue}
        select
        label={labelText}
        onChange={onChange}
        error={Boolean(error)}
        size={small ? 'small' : undefined}
        {...other}>
        {allProjects && (
          <MenuItem value="0" key="0">
            {' '}
            All
          </MenuItem>
        )}
        {fieldOptions &&
          fieldOptions.map((option) => {
            const { name, id } = option;
            return (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            );
          })}
      </TextField>
    </FormControl>
  );
}
