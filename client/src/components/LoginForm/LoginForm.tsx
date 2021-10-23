import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { FC, useState } from 'react';

import styles from './LoginForm.module.scss';

interface LoginFormProps {
  apiLoginEndpoint: string;
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    const response = await axios.post(
      props.apiLoginEndpoint,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data === 'success') {
      return (window.location.href = '/');
    }
  };

  const register = () => {
    console.log('aaa');
  };

  return (
    <Container className={styles.LoginForm} data-testid="LoginForm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="filled"
            type="text"
            required
            fullWidth
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            fullWidth
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPassword(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => login()}
          >
            Log in
          </Button>
          <Typography align="center">
            Don't have an account?{' '}
            <Link onClick={() => register()}>Register!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
