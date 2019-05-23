import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { HelloWorld } from "./HelloWorld";

// Needed when we want to bundle React ourselves, also make sure to use SetLoadReact(false) in the ReactConfig.cs file
(global as any).React = React;
(global as any).ReactDOM = ReactDOM;
(global as any).ReactDOMServer = ReactDOMServer;

// Components to expose
(global as any).HelloWorld = HelloWorld;
