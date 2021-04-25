import ReactDOM from 'react-dom';
import Parent from './props/Parent';
import List from './state/List';
import Search from './state/Search';

const App = () => {
  return (
    <div>
      <Parent />
      <List />
      <Search />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
