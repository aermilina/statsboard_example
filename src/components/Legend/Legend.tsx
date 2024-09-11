import React from 'react';
import { LegendItems } from '@/types';
import { Box, Typography } from '@mui/material';

interface Props {
  legend: LegendItems[];
}
/* The component renders the lefend for the table*/

export default function Legend({ legend }: Props) {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start', gap: 2 }}>
      {legend.map((item, index) => {
        const { textColor, text } = item;
        return (
          <Typography
            sx={{ display: 'flex', flexFlow: 'row', gap: 1, alignItems: 'center' }}
            variant="caption"
            component="div"
            key={index}>
            <Box
              sx={{
                backgroundColor: textColor,
                height: '10px',
                width: '10px',
                border: '1px solid #000'
              }}
            />
            - {text}
          </Typography>
        );
      })}
    </Box>
  );
}
