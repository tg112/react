import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const btn = screen.getByRole('button', { name: 'Confirm order' });

  expect(checkbox).not.toBeChecked();
  expect(btn).toBeDisabled();

  userEvent.click(checkbox);
  expect(btn).not.toBeDisabled();

  userEvent.click(checkbox);
  expect(btn).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
