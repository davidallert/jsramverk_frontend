import logo from './logo.svg'
import './style/App.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Navigation />
    </div>
  );
}

export default App;