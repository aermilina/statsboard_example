import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { InputField} from '@/components';
import { FormControl, Container } from '@mui/material';
import { useFormik, FieldArray, FormikProvider, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { FieldValues } from '@/types';
import { useProjects } from '@/hooks';
import axios from 'axios';
import PopupAlert from '../PopupAlert/PopupAlert';
import RadioGroupField from '../RadioGroupField';
import SelectUrlBlock from '../SelectUrlBlock';

const validationScheme = Yup.object().shape({
  name: Yup.string().required('Введите название'),
  urlOptions: Yup.array(
    Yup.object({
      url: Yup.string()
        .matches(/^https:\//, 'The URL should start from https://')
        .required('Enter at least one URL'),
      project_id: Yup.number().required('Choose at least one project')
    })
  )
});

/* The component renders a form to add new data to the base */

export default function Form() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const projectData = useProjects();
  const { projects } = projectData;

  const formik = useFormik<FieldValues>({
    initialValues: {
      name: '',
      urlOptions: [{ url: '', project_id: 1 }],
      kpiType: 'number',
      kpiDate: '',
      kpiNumber: 0,
      date: ''
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      axios
        .post(`some url`, JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.data) {
            setSuccess(true);
            resetForm();
          } else {
            setError(response.data.message);
          }
        })
        .catch((error) => setError(error.message));
    }
  });
  const { handleSubmit, handleChange, values, errors, resetForm } = formik;

  const resetErrors = () => {
    setError('');
    setSuccess(false);
  };

  return (
    <Container maxWidth="md">
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            formLabelText="Enter the name"
            labelText="Don't use quatation marks"
            value={values.name}
            onChange={handleChange}
            name="name"
            error={errors.name}
          />
          <InputField
            formLabelText="Enter the date"
            inputType="date"
            value={values.date}
            onChange={handleChange}
            name="date"
          />
          <FieldArray
            name="urlOptions"
            validateOnChange={false}
            render={(arrayHelpers) => (
              <>
                {values.urlOptions.map((item, index) => {
                  const { url, project_id } = item;
                  return (
                    <SelectUrlBlock
                      key={index}
                      projects={projects}
                      index={index}
                      handleDeleteUrl={() => arrayHelpers.remove(index)}
                      url={url}
                      projectId={project_id}
                      handleChange={handleChange}
                      errors={errors?.urlOptions as FormikErrors<FieldValues['urlOptions']>}
                    />
                  );
                })}
                <FormControl>
                  <Button
                    variant="text"
                    onClick={() => arrayHelpers.push({ url: '', project_id: 1 })}>
                    Add URL
                  </Button>
                </FormControl>
              </>
            )}
          />
          <RadioGroupField
            checked={values.kpiType}
            name="kpiType"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {values.kpiType === 'date' ? (
            <InputField
              formLabelText="Enter the expected KPI value"
              inputType={values.kpiType}
              labelText="Enter KPI as date"
              value={values.kpiDate}
              onChange={handleChange}
              name="kpiDate"
              error={errors.kpiDate}
            />
          ) : (
            <InputField
              formLabelText="Enter the expected KPI value"
              inputType="number"
              labelText="Only integer numbers"
              value={values.kpiNumber}
              onChange={handleChange}
              name="kpiNumber"
              error={errors.kpiNumber}
            />
          )}
          <FormControl fullWidth sx={{ my: 1 }}>
            <Button sx={{ py: 2 }} variant="contained" type="submit">
              Send
            </Button>
          </FormControl>
        </form>
      </FormikProvider>
      {success && (
        <PopupAlert type={'success'} message={'The data was successfully delivered'} onClose={resetErrors} />
      )}
      {error && (
        <PopupAlert
          type={'error'}
          message={`${error}. Ask the system administrator about help`}
          onClose={resetErrors}
        />
      )}
    </Container>
  );
}
