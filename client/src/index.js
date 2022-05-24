// React is a javaScript library for building user interfaces.
import React from "react";

// The react module is an entry point to the React library, while react-dom provides access to DOM-specific methods.
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render takes a React component, or tree of React components and (eventually) renders them to the DOM.
// The first argument is the component we want to render (<App/>), and second is the target element to render to (#root)
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();