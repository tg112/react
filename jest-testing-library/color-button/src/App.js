import React, { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

const App = () => {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const newButtonColor =
    buttonColor === 'MidnightBlue' ? 'MediumVioletRed' : 'MidnightBlue';
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div>
      <button
        style={{ backgroundColor: isDisabled ? 'gray' : buttonColor }}
        disabled={isDisabled}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        id="disable-button-checkbox"
        type="checkbox"
        onClick={() => setIsDisabled(!isDisabled)}
        onChange={(e) => setIsDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
};

export default App;
