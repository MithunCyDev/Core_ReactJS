import { render } from "./render";

let state = [];
let setters = [];
let stateIndex = 0;

function useState(initialValue) {
  const currentIndex = stateIndex;
  state[currentIndex] = state[currentIndex] || initialValue;
  const setState = (newValue) => {
    state[currentIndex] = newValue;
    render(); // Re-render the component
  };
  stateIndex++;
  return [state[currentIndex], setState];
}

function resetIndex() {
  stateIndex = 0;
}

export { useState, resetIndex };
