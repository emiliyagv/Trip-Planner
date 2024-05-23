import React,{useState, useEffect, useRef} from 'react';
import {  Card, Chip, CardContent, IconButton, CardMedia,Typography,Button } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import Buttons from '../Buttons/Buttons';
import useStyles from './styles';



const PlaceCard = ({places, handleAddPlace, handleDelete}) => {
    const [currentslide, setcurrentslide] = useState(0);
    const sliderRef = useRef(null);
  
      const initSlider = () => {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0); 
        }
      };
      useEffect(() => {
        if (places.length) {
          initSlider();
        }
      }, [places]);
  
   
      const NextArrow = ({ onClick, ...props }) => {
     const isLastSlide = currentslide >= (places.length - sliderSettings.slidesToShow);      return !isLastSlide && (
          <Button {...props} onClick={onClick} style={{
            ...props.style,
          marginRight: "30px",
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
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(3, places.length),
        slidesToScroll: Math.min(3, places.length),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setcurrentslide(next),
        afterChange: (current) => setcurrentslide(current),
        responsive: [
         {
        breakpoint: 1920, 
        settings: {
          slidesToShow: Math.min(4, places.length),
          slidesToScroll: Math.min(4, places.length),
        }
      },
      {
        breakpoint: 1680, 
        settings: {
          slidesToShow:  Math.min(3, places.length),
          slidesToScroll:  Math.min(3, places.length),
        }
      },
          {
            breakpoint: 1200, 
            settings: {
              slidesToShow:  Math.min(2, places.length),
              slidesToScroll:  Math.min(2, places.length),
            }
          },
         
        ]
      }; 

      const classes = useStyles();


  return (
    places.length > 0 && (
        <Slider ref={sliderRef} {...sliderSettings} className={classes.slider}>
  
            { places?.slice(0,10).map((item, index) => (
            <Card key={item.imageUrl + index} className={classes.card}>
                {item.imageUrl && ( <>
                <CardMedia
                    component="img"
                    height="130"
                    width="80"
                    image={item.imageUrl ? item.imageUrl : ""}
                    alt={item.title}
                />
                    </>)}
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div">
                    {item.title}
                  </Typography>
                
                  {item?.cuisine?.slice(0,3).map(({name}, index) => (        
               <Chip key={index} size="small" label={name} className={classes.chip}>
                </Chip>  
            ))}
                    <Typography variant="body2" color="textSecondary" component="p" sx={{mt:5}}>
                        Rating: {item.rating}  
                    </Typography>
                
               
                </CardContent>
                {handleAddPlace && (
                <>
                <div style={{marginLeft:"10px"}}>
                <Buttons onclick={() => handleAddPlace(item)} title="Add to Places" size="small" />
                </div>
                  </>
                    )}
                 {handleDelete && (
                <>
                <IconButton onClick={() => handleDelete(index)} sx={{ marginLeft: 'auto' }}>
                        <DeleteIcon />
                </IconButton>
                </>
                     )}
                </Card>
            
         ))} 
        </Slider>
  )
  );
}

export default PlaceCard