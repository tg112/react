import { FC, useState, useRef, useEffect } from 'react';

const users = [
  { name: 'tom', age: 20 },
  { name: 'mike', age: 21 },
  { name: 'sam', age: 20 },
];

type User = {
  name: string;
  age: number;
};

const SearchRef: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  const onClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };

  return (
    <div>
      <h3>SearchRef</h3>
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
        ref={inputRef}
      />
      <button onClick={onClick}>SearchRef</button>
    </div>
  );
};

export default SearchRef;
