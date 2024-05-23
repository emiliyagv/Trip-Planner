import React, {useState, useEffect, useRef} from 'react';
import PlaceDetails from '../../PlaceDetails/PlaceDetails'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useStyles from '../styles';
import {  Grid, Button} from '@mui/material';
import PropTypes from 'prop-types';

const SliderList = ({places}) => {
  SliderList.propTypes = {
    places: PropTypes.array.isRequired
  }
  SliderList.defaultProps = {
    places: [] 
  }
    const [currentslide, setcurrentslide] = useState(0);
    const sliderRef = useRef(null);
    const classes= useStyles();
    const initSlider = () => {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0); 
        }
      };
      useEffect(() => {
        if (places.length) {
            console.log(places)
          initSlider();
        }
      }, [places]);
  
   

      const NextArrow = ({ onClick, ...props }) => {
     const isLastSlide = currentslide >= (places.length - sliderSettings.slidesToShow);      return !isLastSlide && (
          <Button {...props} onClick={onClick} style={{
            ...props.style,
          marginRight: "20px",
          position: "absolute",
          top: "50%",
          width: "40px",
          height: "40px", 
          minWidth: "40px", 
          backgroundColor: "white", 
          borderRadius: "50%",
          zIndex: 2,
          transform: "translateY(-50%)", 
          border: "none", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ArrowForwardIosIcon
           style={{  
             fontSize: 'large', 
            color: "black",
            position: 'relative',
            left: '-8px'  }} 
            />
          </Button>
        );
      };
      
      const PrevArrow = ({ onClick, ...props }) => {

        return currentslide !== 0 && (
          <Button {...props} onClick={onClick} style={{
            ...props.style,
          marginLeft: "20px",
          position: "absolute",
          top: "50%",
          width: "40px",
          height: "40px", 
          minWidth: "40px", 
          backgroundColor: "white", 
          borderRadius: "50%",
          zIndex: 2,
          transform: "translateY(-50%)", 
          border: "none", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center', 
        }}>
          <ArrowBackIosIcon 
          style={{   fontSize: 'large', 
            color: "black",
            position: 'relative',
            left: '-6px'  }} 
            />
          </Button>
        );
      };
      const sliderSettings = {
        dots: false,
        speed: 500,
        slidesToShow: Math.min(4, places.length ? places.length : 0),
        slidesToScroll: Math.min(4, places.length ? places.length : 0),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setcurrentslide(next),
        afterChange: (current) => setcurrentslide(current),
        responsive: [
          {
            breakpoint: 1070, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              
            }
          },
          {
            breakpoint: 700, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              
            }
          }
        ]
      }; 
      console.log("place", places); 
  return (
<>
            {places.length > 0 && (
              <Slider ref={sliderRef} {...sliderSettings} >
            {places?.map((place, i) => (  
                  place.photo && (
                    <PlaceDetails key={i} place={place}/>
              )
               
            ))}
            </Slider>
            )
            }
            </>
  )
}

export default SliderList