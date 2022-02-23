import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const cherriesCheckBox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.clear(cherriesCheckBox);
  userEvent.click(cherriesCheckBox);

  // find and click order btn
  const orderSummaryBtn = screen.getByRole('button', {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryBtn);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toopingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toopingsHeading).toBeInTheDocument();

  // check summary Item
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries'));

  // accept terms and conditions and click btn to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);
  const confirmBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmBtn);
  // confirm order number on confirmation page
  const thxHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });

  expect(thxHeader).toBeInTheDocument();
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order btn on confirmation page
  const newOrderBtn = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderBtn);
  // check that scoops and toppings subtotals have been reser

  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
  // do we neee to await anything to avoid test errors?
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
