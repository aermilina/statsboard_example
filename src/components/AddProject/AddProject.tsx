import React, { useState } from 'react';
import { FormControl, Button } from '@mui/material';
import InputField from '../InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PopupAlert from '../PopupAlert/PopupAlert';
import { BASE_URL } from '@/constants';

interface Props {
  refetch: () => void;
}

export default function AddProject({ refetch }: Props) {
  const [errorProject, setErrorProject] = useState('');
  const [success, setSuccess] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Enter the name of the project'),
    counter: Yup.string().required('Enter the ccounter of the project')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      counter: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(`some url`, JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          const { data } = response;
          if (data.status === 'ok') {
            setSuccess(true);
            formik.resetForm();
            refetch();
          } else {
            setErrorProject(data.message);
          }
        })
        .catch((error) => setErrorProject(error.message));
    }
  });

  const resetErrors = () => {
    setErrorProject('');
    setSuccess(false);
  };

  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          formLabelText="Add new project:"
          labelText="Enter name of the project"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          formLabelText="Add the counter of the project:"
          labelText="Enter the counter id without spaces"
          name="counter"
          value={values.counter}
          onChange={handleChange}
          error={errors.counter}
        />
        <FormControl>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </FormControl>
      </form>
      {errorProject && <PopupAlert type="error" message={errorProject} onClose={resetErrors} />}
      {success && (
        <PopupAlert type="success" message="The project was added succesfully" onClose={resetErrors} />
      )}
    </>
  );
}
