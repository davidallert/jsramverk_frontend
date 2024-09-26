import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import './style/index.css';

// Pages etc.
import App from './App';
import Documents from './pages/Documents';
import Document from './pages/Document';
import CreateDocument from './pages/CreateDocument';
import HelloWorld from './pages/HelloWorld'

// Utils.
import reportWebVitals from './reportWebVitals';

export default function MyApp() {
  return (
    // Only works locally.
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<App />} />
    //     <Route path="/hello" element={<HelloWorld />} />
    //     <Route path="/documents" element={<Documents />} />
    //     <Route path="/document/:id" element={<Document />} />
    //     <Route path="/create" element={<CreateDocument />} />
    //   </Routes>
    // </BrowserRouter>

    <HashRouter>
      <Routes>
        <Route path="/" element={ <App />} />
        <Route path="/hello" element={ <HelloWorld />} />
        <Route path="/documents" element={ <Documents />} />
        <Route path="/document/:id" element={ <Document />} />
        <Route path="/create" element={ <CreateDocument />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
