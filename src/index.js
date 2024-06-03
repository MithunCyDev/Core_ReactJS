import { createElement } from "./JSX";
import Component from "./Component";
import { render } from "./render";
import App from "./App";

export { createElement, Component, render, rootElement };
const rootElement = document.getElementById("root");
render(createElement(App), rootElement);
