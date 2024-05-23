import React,{ useEffect, useRef} from 'react';
import PlaceCard from './PlaceCard';


const Explore = ({ exploreItems, onAddPlace }) => {
  const sliderRef = useRef(null);

    const initSlider = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0); 
      }
    };
    useEffect(() => {
      if (exploreItems.length) {
        initSlider();
      }
    }, [exploreItems]);

    const handleAddPlace = (item) => {
      onAddPlace(item); 
    };
    
 
  
  return (
  
  <PlaceCard places={exploreItems} handleAddPlace={handleAddPlace} />
  );
};

export default Explore