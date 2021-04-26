import { FC, useState } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

const RepositoriesList: FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );
  console.log(data);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>loading...</h3>}
      <ul>
        {!error &&
          !loading &&
          data.map((name) => {
            return <li key={name}>{name}</li>;
          })}
      </ul>
    </div>
  );
};

export default RepositoriesList;
