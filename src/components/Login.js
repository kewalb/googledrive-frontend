import { Grid } from '@mui/material';
import React from 'react';

function Login() {
  return(
    <Grid container spacing={2}>
    <Grid item xs={8}>
      <Item>xs=8</Item>
    </Grid>
    <Grid item xs={4}>
    </Grid>
  </Grid>
  )
}

export default Login;