import React from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  checked: string;
}

/* The component renders radio group*/

export default function RadioGroupField({ onChange, name, checked }: Props) {
  return (
    <FormControl sx={{ my: 1, minWidth: '200px', display: 'flex' }}>
      <FormLabel>Choose the KPI type</FormLabel>
      <RadioGroup row>
        <FormControlLabel
          value="number"
          name={name}
          control={<Radio checked={checked === 'number'} onChange={onChange} />}
          label="Number"
        />
        <FormControlLabel
          value="date"
          name={name}
          control={<Radio checked={checked === 'date'} onChange={onChange} />}
          label="Data"
        />
      </RadioGroup>
    </FormControl>
  );
}
