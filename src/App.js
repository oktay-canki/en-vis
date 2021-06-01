import './App.css';
import HomePage from './pages/Home';
import MainContextProvider from './contexts/MainContext';

function App() {
  return (
    <MainContextProvider>
      <HomePage />
    </MainContextProvider>
  );
}

export default App;
