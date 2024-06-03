import { createElement } from "../JSX";
import { render } from "../render";
import { act } from "react-dom/test-utils";
import App from "../App";

describe("App Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders correctly and increments count", () => {
    act(() => {
      render(createElement(App), container);
    });

    const h1 = container.querySelector("h1");
    expect(h1.textContent).toBe("Count: 0");

    const button = container.querySelector("button");
    expect(button.textContent).toBe("Increment");

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(h1.textContent).toBe("Count: 1");
  });
});
