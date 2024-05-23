

import { Container, Typography, Grid, Button } from '@mui/material';
import React from 'react';
import styled from '@mui/system/styled';
import useStyles from './Hero/styles'


const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  borderRadius: '4px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '300px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',

  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(50% - theme.spacing(2))',
  },
  padding: theme.spacing(4), 
 
  maxWidth: '500px', 
  margin: `${theme.spacing(2)} auto`,
}));


const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '20px',
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  fontSize: '1rem', 
  borderColor: '#ced7e0',
  '&:hover': {
    borderColor: '#a0a0a0',
  },
}));

const Features = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.featuresContainer} style={{ marginBottom: '4em' }}>
      <Typography variant="h3" gutterBottom color="initial" className={classes.featuresTitle} style={{ textAlign: 'center', marginBottom: '1em' }}>
        Features to make your next trip easier.
      </Typography>
      <Grid container rowGap={50}  justifyContent="center" alignItems="center" marginTop="4rem">
        <Grid item xs={12} md={6}>
          <Item>
              <img role="img" src="/images/featureimages/MainFeatureTiles__addPlaces.png" alt="" width="70%"/>
            <Typography variant="h6" gutterBottom>
              Add places in you list with 1 click
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <img role="img" src="/images/featureimages/MainFeatureTiles__budget.png" alt="" width="70%"/>

            <Typography variant="h6" gutterBottom>
              Manage your budget
            </Typography>
         
            {/* <StyledButton variant="outlined">Add to plan</StyledButton> */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <img role="img" src="/images/featureimages/MainFeatureTiles__checklist.png" alt="" width="70%"/>

            <Typography variant="h6" gutterBottom>
              Plan your Itinerary
              </Typography>
            {/* <Typography variant="body1">
              We crawled the web so you don’t have to. Easily save mentioned places.
            </Typography> */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <img role="img" src="/images/featureimages/MainFeatureTiles__recommendations.png" alt="" width="70%"/>

            <Typography variant="h6" gutterBottom>
                Get recommendations from us
            </Typography>
            {/* <Typography variant="body1">
              We crawled the web so you don’t have to. Easily save mentioned places.
            </Typography> */}
          </Item>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Features;
