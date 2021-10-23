import React, { FC, useContext } from 'react';
import * as yup from 'yup';
import 'yup-phone';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { configurationContext } from '../../contexts/ConfigurationContext';
import { useFormik } from 'formik';
import styles from './RegisterForm.module.scss';
import axios from 'axios';

const RegisterForm: FC<{}> = () => {
  const apiRoot = useContext(configurationContext).api.root;
  const apiRegisterEndpoint = `${apiRoot}/auth/register`;
  const validationSchema = yup.object({
    username: yup.string().min(3).required('Username is required.'),
    password: yup.string().min(8).required('Password is required.'),
    email: yup.string().email().required('Email is required.'),
    name: yup.string().min(3).notRequired(),
    phoneNumber: yup.string().phone().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      name: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios.post(apiRegisterEndpoint, values, {
        withCredentials: true,
      });
    },
  });

  return (
    <Container className={styles.RegisterForm} data-testid="RegisterForm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Register</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              type="text"
              variant="filled"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              type="text"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="text"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              type="text"
              variant="filled"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
