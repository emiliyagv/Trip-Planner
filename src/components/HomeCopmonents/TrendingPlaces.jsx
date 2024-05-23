import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Avatar, Box } from '@mui/material';
import React, {useState} from 'react';
import { styled } from '@mui/system';
import LinkButton from '../Buttons/LinkButton';
import { ClassNames } from '@emotion/react';
import useStyles from './Hero/styles'

const TrendingPlacesContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '28%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#38598b',
    zIndex: -1,
  },
}));



const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 400,
  margin: 'auto',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
  '&:hover': {
    transform: 'scale(1.05)', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)' 
  },
  zIndex:2
}));

const CustomCardMedia = styled(CardMedia)({
  height: 250,         
  objectFit: 'cover', 
  width: '100%',           
  objectPosition: 'center' 
});

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: theme.spacing(0),
}));

const CustomCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const AuthorBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));



const CardStats = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '0.875rem',
}));

const TrendingPlaces = () => {

  const [currentslide, setcurrentslide] = useState(0);
const [slidecount, setslidecount] = useState(0);
const classes = useStyles();

  const countSlides = (count) => {
    setslidecount(count);
  };


  const NextArrow = ({ onClick, ...props }) => {
    const isLastSlide = currentslide >= slidecount - sliderSettings.slidesToShow;
    return !isLastSlide && (
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
      <ArrowForwardIosIcon style={{   fontSize: 'large',
        color: "black",
        position: 'relative',
        left: '-8px'  }} />
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
      <ArrowBackIosIcon style={{   fontSize: 'large',
        color: "black",
        position: 'relative',
        left: '-6px'  }} />
      </Button>
    );
  };
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    beforeChange: (current, next) => setcurrentslide(next),
    afterChange: current => setcurrentslide(current),
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
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  const cards = [
    {
      title: "Your Paris itinerary",
      imageUrl: "/images/famousplaces/paris.jpg",
      author: "Helene",
      url: "https://heleneinbetween.com/2017/05/essential-paris-travel-guide.html",
      likes: "324",
    },
    {
      title: "Rebecca's Como Guide",
      imageUrl: "/images/famousplaces/como.jpg",
      author: "Rebecca",
      url:  "https://everydayparisian.com/travel-guide-to-lake-como-italy/",
      likes: "523",
    },
    {
      title: "Two days in Kyoto",
      imageUrl: "/images/famousplaces/japan.jpg",
      author: "Monica",
      url:  "https://notanomadblog.com/kyoto-itinerary/",
      likes: "698",
    },
    {
      title: "Rome travel guide",
      imageUrl: "/images/famousplaces/rome.jpg",
      author: "Jessie Moore",
      url:  "https://www.pocketwanderings.com/rome-travel-guide/",
      likes: "923",
    },
    {
      title: "London for the first time",
      imageUrl: "/images/famousplaces/london2.jpg",
      author: "Jurga",
      url:  "https://fullsuitcase.com/tips-visit-london-first-time/",
      likes: "234",
    },
    {
      title: "One day in Lucerne",
      imageUrl: "/images/famousplaces/lucerne.jpg", 
      author: "Nicola Lavin",
      url:  "https://allaboutrosalilla.com/one-day-in-lucerne/",
      likes: "435",
    }
   
  ];

  return (
    <TrendingPlacesContainer className={classes.trplaceContainer} maxWidth="lg" spacing={100}>
      <Typography className={classes.trplaceTypo} color='black' variant="h3" marginBottom="1.5em" gutterBottom>
        Discover your next favorite destination
      </Typography>

      <Slider   ref={(slider) => countSlides(slider?.props?.children.length)}
        {...sliderSettings}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
      >
        {cards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
        <a href={card.url} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}> 

            <CustomCard role="article">
              <CustomCardMedia
                component="img" 
                image={card.imageUrl}
                title={card.title}
              />
              <CustomCardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <AuthorBox>
                  <Typography variant="body2" color="text.secondary">
                    {card.author}
                  </Typography>
                </AuthorBox>
              </CustomCardContent>
              <CustomCardActions>
                  
                <CardStats>
                  {card.likes} likes
                </CardStats>
              </CustomCardActions>
            </CustomCard>
            </a>

          </Grid>
        ))}
      </Slider>
    </TrendingPlacesContainer>
  );
};

export default TrendingPlaces;
