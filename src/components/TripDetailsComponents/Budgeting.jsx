

import React,{ useState } from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText, List, Box, IconButton, Grid, InputLabel, Paper, Button, Dialog, DialogActions, DialogContent, Accordion, AccordionSummary, AccordionDetails, DialogTitle, TextField, LinearProgress } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/system';
import { useEffect } from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Buttons from '../Buttons/Buttons';
import alertify from 'alertifyjs';
import { icon } from 'leaflet';

const CategoryItem = styled(Grid)(({ theme, selected }) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    transition: '0.3s',
    backgroundColor: selected ? '#e0e0e0' : 'transparent',
    borderRadius: '4px',
    
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    role: 'button',

  }));
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
  }));

const Budget = ({budgetData, setBudgetData, expenses, setExpenses}) => {
  const [spent, setSpent] = useState(budgetData.spent || 0);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(budgetData.budget || 0)
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { icon: <FlightIcon />, name: 'Flights' },
    { icon: <HotelIcon />, name: 'Lodging' },
    { icon: <DriveEtaIcon />, name: 'Car rental' },
    { icon: <DirectionsTransitIcon />, name: 'Transit' },
    { icon: <FastfoodIcon />, name: 'Food' },
    { icon: <LocalBarIcon />, name: 'Drinks' },
    { icon: <VisibilityIcon />, name: 'Sightseeing' },
    { icon: <EventIcon />, name: 'Activities' },
    { icon: <ShoppingBasketIcon />, name: 'Shopping' },
    { icon: <LocalGasStationIcon />, name: 'Gas' },
    { icon: <LocalGroceryStoreIcon />, name: 'Groceries' },
    { icon: <MoreHorizIcon />, name: 'Other' },
  ];


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAmountChange = (event) => setAmount(event.target.value);


  const addExpense = () => {
    const deductionAmount = parseFloat(amount);
    console.log("is it")
    if (deductionAmount && category && spent >= deductionAmount) {
      const newSpent = spent - deductionAmount
      setSpent(newSpent);
      setBudgetData({budget, spent: newSpent})
      console.log(`Adding ${amount} to ${category}`);
      setExpenses(prev => [...prev, { category, amount }]);
      handleClose();
      setAmount(''); 
      setCategory(''); 
      handleClose();
    } else if(!category){
      alert("Please choose a category.");

    }else if(!deductionAmount){
      alert("Please input the amount.");
    }
    else{
        console.log(`spent ${spent} budget ${budget} deduction ${deductionAmount}`)
      alert("Cannot deduct more than the remaining budget.");
      
    }
  
  };


  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
    setSpent(event.target.value)

  };

  const handleDeleteExpense = (index) => {
    setExpenses(prevExpenses => prevExpenses.filter((_, i) => i !== index));
    const newSpent = spent + parseFloat(expenses[index].amount)
    setSpent(newSpent);
    setBudgetData({budget, spent: newSpent})


  };

  useEffect(() => {
    setBudgetData({budget, spent})
  }, [budget, spent])




  const progress = (spent / budget) * 100;

  return (
  <Grid container spacing={10} width="90%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
   <Grid item xs={12} lg={11} xl={11}>
     
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4em' }}>
      <Paper style={{ padding: '20px', width: '70%' }}>
        <Typography variant="h5" gutterBottom>Budgeting</Typography>
        <Typography variant="h4" gutterBottom>
          ${spent}
        </Typography>

        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body1" style={{ textAlign: 'right', marginTop: '5px' }}>
          Budget: ${budget}
        </Typography>


        <Buttons title="Add expense" color="primary" onclick={handleOpen}/>
        <Dialog role="dialog" open={open} onClose={handleClose}>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmountChange} />
            </FormControl>
            <Typography component="div" variant="h6" sx={{ mt: 2 }}>Select Category</Typography>
            <Grid container spacing={1}>
              {categories.map((item, index) => (
                <CategoryItem
                  key={index}
                  item
                  xs={4}
                  selected={category === item.name}
                  onClick={() => setCategory(item.name)}
                >
                  {item.icon}
                  <Typography variant="body2">{item.name}</Typography>
                </CategoryItem>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addExpense} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
  
      </Paper>
      <Item elevation={3} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 38,
        paddingBottom: 38,
        backgroundColor: '#fff',  
        width: '28%', 
      }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Budgeting
        </Typography>
        <FormControl sx={{ m: 20, width: "65%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={handleBudgetChange} />
        </FormControl>

      </Item>
    </Box>
    </Grid>

     <Grid item xs={12} lg={11} >
            <Accordion width="90%" >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {expenses.map((expense, index) => (
              <ListItem key={index}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                      {categories.filter(category => category.name == expense.category)[0].icon}
                    </ListItemIcon>
                    <ListItemText primary={expense.category.name} />
                   
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">${expense.amount}</Typography>
                    <IconButton role="button" data-testid={`button-${index}`} edge="end" onClick={() => handleDeleteExpense(index)}>
                 {console.log(`button-${index}`)}
                  <DeleteIcon />
                </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      </Grid>
      </Grid>
  );
};

export default Budget;