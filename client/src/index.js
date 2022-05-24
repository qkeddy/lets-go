// React is a javaScript library for building user interfaces.
import React from "react";

// The react module is an entry point to the React library, while react-dom provides access to DOM-specific methods.
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"
import Header from './components/header'
import Footer from './components/footer'

// ReactDOM.render takes a React component, or tree of React components and (eventually) renders them to the DOM.
// The first argument is the component we want to render (<App/>), and second is the target element to render to (#root)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </React.StrictMode>,
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();