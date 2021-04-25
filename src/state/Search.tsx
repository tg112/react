import React, { FC, useState } from 'react';

const users = [
  { name: 'tom', age: 20 },
  { name: 'mike', age: 21 },
  { name: 'sam', age: 20 },
];

type User = {
  name: string;
  age: number;
};

const Search: FC = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState<User | undefined>();
  const onClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };
  return (
    <div>
      <h3>Search</h3>
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.age}</p>
        </>
      )}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Search</button>
    </div>
  );
};

export default Search;
