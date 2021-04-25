import { FC } from 'react';

type Props = {
  color: string;
  onClick: () => void;
};

export const Child: FC<Props> = ({ color, onClick, children }) => {
  return (
    <div>
      <p>{color}</p>
      <p>{children}</p>
      <button onClick={onClick}>click me</button>
    </div>
  );
};
