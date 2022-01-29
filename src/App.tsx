import { Main } from './layout/Main';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <main className="app-main">
        <Main />
      </main>
    </div>
  );
};

export default App;
