import React from 'react';
import { Form } from '@/components';
import { Container, Typography } from '@mui/material';

/* The component renders homepage*/

export default function Homepage() {
  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Typography variant="h1" component="h2">
        Add data
      </Typography>
      <Form />
    </Container>
  );
}
