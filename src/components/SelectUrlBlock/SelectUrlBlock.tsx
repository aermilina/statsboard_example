import React from 'react';
import { InputField, SelectField } from '@/components';
import { Project, FieldValues } from '@/types';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormikErrors } from 'formik';
interface Props {
  projects?: Project[];
  index: number;
  projectId: number;
  url?: string;
  handleDeleteUrl: (index: number) => void;
  handleChange: (e: React.SyntheticEvent) => void;
  errors?: FormikErrors<FieldValues['urlOptions']>;
}


/*The component renders a group of input and select fields*/

export default function SelectUrlBlock({
  projects,
  index,
  url,
  projectId,
  handleDeleteUrl,
  handleChange,
  errors
}: Props) {
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <InputField
        formLabelText="Enter URL"
        labelText="URL should start from https://"
        inputType="url"
        name={`urlOptions.${index}.url`}
        value={url}
        onChange={handleChange}
        error={errors?.[index]?.['url']}
      />
      <SelectField
        fullwidth
        required
        formLabelText="Choose project"
        labelText="Choose project"
        fieldOptions={projects}
        value={projectId}
        name={`urlOptions.${index}.project_id`}
        onChange={handleChange}
        defaultValue={1}
        error={errors?.[index]?.['project_id']}
      />
      {index > 0 && (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteUrl(index)}>
          Delete
        </Button>
      )}
    </Box>
  );
}
