import ReactDOM from 'react-dom';
import EventComponent from './events/EventComponent';
import Parent from './props/Parent';
import SearchRef from './refs/SearchRef';
import List from './state/List';
import Search from './state/Search';

const App = () => {
  return (
    <div>
      <Parent />
      <List />
      <Search />
      <EventComponent />
      <SearchRef />
      <p>---- Redux -----</p>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
