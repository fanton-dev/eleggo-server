import {
  ChatBubbleOutline,
  GitHub,
  Google,
  PersonOutlined,
} from '@mui/icons-material';
import { Button, Container, Grid } from '@mui/material';
import React, { FC, useContext } from 'react';
import { configurationContext } from '../../contexts/ConfigurationContext';
import styles from './OtherLoginOptions.module.scss';

const OtherLoginOptions: FC<{}> = () => {
  const apiRoot = useContext(configurationContext).api.root;
  const apiLoginEndpoint = `${apiRoot}/auth/login`;

  const login = (service: 'google' | 'discord' | 'github') => {
    if (service) {
      return window.open(`${apiLoginEndpoint}/${service}`, '_self');
    }
  };

  const continueAsGuest = () => {
    return true; // TODO: Implement continue as guest.
  };

  return (
    <Container
      className={styles.OtherLoginOptions}
      data-testid="OtherLoginOptions"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            startIcon={<Google />}
            type="button"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => login('google')}
          >
            Continue with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            startIcon={<ChatBubbleOutline />}
            type="button"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => login('discord')}
          >
            Continue with Discord
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            startIcon={<GitHub />}
            type="button"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => login('github')}
          >
            Continue with GitHub
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            startIcon={<PersonOutlined />}
            type="button"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => continueAsGuest()}
          >
            Continue as a guest
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OtherLoginOptions;
