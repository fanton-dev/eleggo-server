import * as yup from 'yup';
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { FC, useContext } from 'react';
import { useFormik } from 'formik';
import { configurationContext } from '../../contexts/ConfigurationContext';
import styles from './LoginForm.module.scss';

const LoginForm: FC<{}> = () => {
  const apiRoot = useContext(configurationContext).api.root;
  const apiLoginEndpoint = `${apiRoot}/auth/login`;
  const validationSchema = yup.object({
    username: yup.string().required('Username is required.'),
    password: yup.string().required('Password is required.'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios.post(apiLoginEndpoint, values, {
        withCredentials: true,
      });
    },
  });

  const goToRegisterView = () => {
    return true;
  };

  return (
    <Container className={styles.LoginForm} data-testid="LoginForm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
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
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Log in
            </Button>

            <Typography align="center">
              {"Don't have an account? "}
              <Link onClick={() => goToRegisterView()}>Register!</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;
