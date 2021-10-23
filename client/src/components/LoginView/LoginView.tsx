import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { FC } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import OtherLoginOptions from '../OtherLoginOptions/OtherLoginOptions';
import styles from './LoginView.module.scss';

const LoginView: FC<{}> = () => {
  return (
    <Container className={styles.LoginView} data-testid="LoginView">
      <Container maxWidth="sm">
        <LoginForm />
        <Divider>
          <Typography>OR</Typography>
        </Divider>
        <OtherLoginOptions />
      </Container>
    </Container>
  );
};

export default LoginView;
