import { Container, Divider, Typography } from '@mui/material';
import React, { FC } from 'react';
import OtherLoginOptions from '../OtherLoginOptions/OtherLoginOptions';
import RegisterForm from '../RegisterForm/RegisterForm';
import styles from './RegisterView.module.scss';

const RegisterView: FC<{}> = () => {
  return (
    <Container className={styles.RegisterView} data-testid="RegisterView">
      <Container maxWidth="sm">
        <RegisterForm />
        <Divider>
          <Typography>OR</Typography>
        </Divider>
        <OtherLoginOptions />
      </Container>
    </Container>
  );
};

export default RegisterView;
