import { FC } from 'react';
import { Child } from './Child';

const Parent: FC = () => {
  const onClick = () => {
    console.log('click');
  };
  return (
    <Child color="red" onClick={onClick}>
      Hoge
    </Child>
  );
};

export default Parent;
