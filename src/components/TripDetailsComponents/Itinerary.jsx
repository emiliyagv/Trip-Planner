import React, {useState} from 'react'
import { Typography, Paper, Box, IconButton, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Places from './Places';

const Itinerary = ({startDate, endDate, itineraryPlaces, setItineraryPlaces}) => {
  const [userPlaces, setUserPlaces] = useState([])

const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateRange = [];
    for(let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        dateRange.push(new Date(date));
    }
        return dateRange;
    };
    const dates = generateDateRange(startDate, endDate);

      
  return (
    <>
    {dates.map((date, index) => (
     
     <Accordion key={index} elevation={3} sx={{ mb: 5,width: "100%" }}>
     <AccordionSummary
       expandIcon={<ExpandMoreIcon />}
       aria-controls={`panel${index}a-content`}
       id={`panel${index}a-header`}
       sx={{ height: '70px' }}

     >
       <Typography variant="h6" sx={{ml:5}}>
         {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
       </Typography>
     </AccordionSummary>
     <AccordionDetails>
       <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Places userPlaces={itineraryPlaces[date] || []} 
            setUserPlaces={(places) => setItineraryPlaces({...itineraryPlaces, [date]: places})}
            date={date}
            isDateSpecific={true}
    />
       </Box>
     </AccordionDetails>
   </Accordion>
    ))}
    </>
  )
}

export default Itinerary