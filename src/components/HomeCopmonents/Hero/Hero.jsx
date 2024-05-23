import React, { useState, useEffect } from 'react';
import { Typography, Box} from '@mui/material';
import useStyles from './styles'
import {useNavigate} from 'react-router-dom'
import LinkButton from '../../Buttons/LinkButton';
import { UserAuth } from '../../../../src/context/AuthContextProvider'

const Hero = () => {
  const classes = useStyles()
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();
  const {user} = UserAuth();

  useEffect(() => {
    const handleScroll = () => {
      const startTransitionAt = window.innerHeight / 2; 
      const endTransitionAt = window.innerHeight; 
      const currentScroll = window.pageYOffset;

      if (currentScroll > startTransitionAt) {
        const distanceScrolled = currentScroll - startTransitionAt;
        const scrollRange = endTransitionAt - startTransitionAt;
        const newOpacity = 1 - (distanceScrolled / scrollRange);
        setOpacity(newOpacity > 0 ? newOpacity : 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validate =() =>{
    if(!user) {
      navigate('/Signup')
      return
    }
  }

  return (
    <Box>
      <div className={classes.imagegrid} style={{ opacity: opacity, transition: 'opacity 0.5s linear' }}>
          {/* <div className={classes.contentWrapper}> */}

              <Box  className={classes.bannerContent} >
                  
                  <Typography variant="h4" color="initial" className={classes.bannerTitle}>
                      Wait! Don't plan your trip yet!
                      We are here to make everything easier for you
                      </Typography>
                    <Typography variant="h7" className={classes.bannerDescription}>
                        Travel planning at its best. Build, organize,
                        and map your custom itineraries in a free
                        travel app designed for vacations & road trips, 
                        powered by our trip planner AI.
                    </Typography>
                    <Box mt={5} className={classes.planButton}>
                            <LinkButton  title="Plan your trip" onclick={validate} keyname="plantrip" url="/Trips"/>
                    </Box>
              </Box>

              {/* </div> */}
            <img src="/images/LandingPageHero__foreground.png" alt="" className={classes.backgroudImage}/>
            <img src="/images/4798227.jpg" alt="" className={classes.bannerImage}/>
            
            
            </div>
            
       </Box>
       


    )
}

export default Hero