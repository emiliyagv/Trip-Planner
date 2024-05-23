import React from 'react';
import { render, fireEvent, window, findAllByRole, queryAllByText, getByTestId, within, screen, waitFor, queryByText, getByRole, getAllByLabelText } from '@testing-library/react';

import Budget from '../Budgeting';
import { createTheme, ThemeProvider } from '@mui/material/styles';

describe('Budget component', () => {
    const theme = createTheme();

  test('renders without crashing', () => {
    render(
        <ThemeProvider theme={theme}>
        <Budget budgetData={{}} setBudgetData={() => {}} expenses={[]} setExpenses={() => {}} />
        </ThemeProvider>

        );
  });

  test('renders with initial budget and spent values', () => {
    const budgetData = { budget: 1000, spent: 500 };
    const { getByText } = render(
        <ThemeProvider theme={theme}>
        <Budget budgetData={budgetData} setBudgetData={() => {}} expenses={[]} setExpenses={() => {}} />
        </ThemeProvider>
    );

    const budgetElement = getByText('Budget: $1000');
    const spentElement = getByText('$500');

    expect(budgetElement).toBeInTheDocument();
    expect(spentElement).toBeInTheDocument();
  });

  test('adds an expense ', async () => {
    const budgetData = { budget: 1000, spent: 500 };
    const setExpenses = jest.fn();
    const { getByLabelText, getByText } = render(
        <ThemeProvider theme={theme}>

      <Budget budgetData={budgetData} setBudgetData={() => {}} expenses={[]} setExpenses={setExpenses} />
      </ThemeProvider>

    );

    const addButton = screen.getByRole('button',  { name: 'Add expense'});
    await waitFor(() => {
        fireEvent.click(addButton);
    });
    const dialogs = await screen.findAllByRole('dialog');
    const expenseDialog = dialogs.find(dialog => dialog.textContent.includes('Add New Expense'));


    const categoryElement = await waitFor(() => getByText('Food'));
    const amountInput = within(expenseDialog).getByLabelText('Amount');
    fireEvent.change(amountInput , { target: { value: '50' } });
    expect(categoryElement ).toBeInTheDocument();
    fireEvent.click(categoryElement)

    const addExpense = within(expenseDialog).getByRole('button',  { name: 'Add'});

    fireEvent.click(addExpense);
    await waitFor(() => {
        
      });  });
  test('adds an expense without adding category', async () => {
    const budgetData = { budget: 1000, spent: 500 };
    const setExpenses = jest.fn();
    
    const { getByLabelText, getByText } = render(
        <ThemeProvider theme={theme}>

      <Budget budgetData={budgetData} setBudgetData={() => {}} expenses={[]} setExpenses={setExpenses} />
      </ThemeProvider>

    );
    const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    const addButton = screen.getByRole('button',  { name: 'Add expense'});
    await waitFor(() => {
        fireEvent.click(addButton);
    });
    const dialogs = await screen.findAllByRole('dialog');
    const expenseDialog = dialogs.find(dialog => dialog.textContent.includes('Add New Expense'));


    const categoryElement = await waitFor(() => getByText('Food'));
    const amountInput = within(expenseDialog).getByLabelText('Amount');
    fireEvent.change(amountInput , { target: { value: '50' } });
    expect(categoryElement ).toBeInTheDocument();
    const addExpense = within(expenseDialog).getByRole('button',  { name: 'Add'});

    fireEvent.click(addExpense);
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Please choose a category.'));

    
      alertMock.mockRestore();
  });

  test('deletes an expense',async () => {
    const budgetData = { budget: 1000, spent: 500 };
    const expenses = [{ category: 'Food', amount: '50' }];
    const setExpenses = jest.fn();
  const setSpent = jest.fn();
  const setBudgetData = jest.fn();
  render(

        <ThemeProvider theme={theme}>
      <Budget budgetData={budgetData}
    expenses={expenses}
    setExpenses={setExpenses}
    setSpent={setSpent}
    setBudgetData={setBudgetData}
 />
      </ThemeProvider>

    );

    const deleteButton = screen.getByTestId('button-0');
    fireEvent.click(deleteButton)
    await waitFor(() => {
         expect(setExpenses).toHaveBeenCalledWith(expect.any(Function));
         expect(setBudgetData).toHaveBeenCalledWith({ budget: 1000, spent: 550 });
      });  });
});