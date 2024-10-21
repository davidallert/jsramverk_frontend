import logo from './logo.svg'
import './style/App.css';
import Navigation from './components/Navigation';
import { io } from "socket.io-client";

let socket;
// let SERVER_URL = "https://jsramverk-editor-daae23-cucfhygme0ete5ea.swedencentral-01.azurewebsites.net/"

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