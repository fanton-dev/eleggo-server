import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import Window from '../Window/Window';
import styles from './DetectionModelsList.module.scss';

// TODO: Move styling to the css file
const DetectionModelsList: FC<{}> = ({}) => (
  <Window title="Detection Models">
    <div
      className={styles.DetectionModelsList}
      data-testid="DetectionModelsList"
    >
      <List sx={{ width: '100%' }} disablePadding>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton role={undefined} dense>
            <ListItemText
              primary={
                <Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    Thought of direction
                  </Typography>
                </Fragment>
              }
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    FAnton
                  </Typography>
                  {' — 30.11.2021'}
                </Fragment>
              }
            />
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="h6"
              color="text.primary"
            >
              ON
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  </Window>
);

export default DetectionModelsList;
