import { createElement } from "./index";
import { useState } from "./hooks";

function App() {
  const [count, setCount] = useState(0);

  return createElement(
    "div",
    null,
    createElement("h1", null, "Count: ", count),
    createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      "Increment+"
    )
  );
}

export default App;
