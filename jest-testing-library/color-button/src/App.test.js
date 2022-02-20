import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  // Virtual DOMをレンダーする。(参照先：https://www.w3.org/TR/wai-aria/#role_definitions)
  render(<App />);
  // find an element with a role of button and text
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  // expect the background to be red. assertion (参照: https://github.com/testing-library/jest-dom)
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('toggle checkbox', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable Button' });
  expect(colorButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(checkbox).toBeEnabled();
});

test('disabled button has gray background and reverts to MediumVioletRed', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');

  fireEvent.click(checkbox);
  expect(button).toHaveStyle('backgroundColor: gray');

  fireEvent.click(checkbox);
  expect(button).toHaveStyle('backgroundColor: MediumVioletRed');
});

test('disabled button has gray background and reverts to Midnight Blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle('backgroundColor: gray');

  fireEvent.click(checkbox);
  expect(button).toHaveStyle('backgroundColor: Midnight Blue');
});

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('GreenBlueRed')).toBe('Green Blue Red');
  });
});
