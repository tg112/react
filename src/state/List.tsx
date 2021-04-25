import { FC, useState } from 'react';

const GuestList: FC = () => {
  const [name, setName] = useState<string>('');
  const [lists, setLists] = useState<string[]>([]);

  const onClick = () => {
    setName('');
    setLists([...lists, name]);
  };

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {lists.map((guest) => (
          <li>{guest}</li>
        ))}
      </ul>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={onClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;
