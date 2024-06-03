import { resetIndex } from "./hooks";

let rootInstance = null;

function render(element, container) {
  resetIndex();
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(container, prevInstance, element) {
  if (!element) {
    return null;
  }

  if (prevInstance == null) {
    const newInstance = instantiate(element);
    container.appendChild(newInstance.dom);
    return newInstance;
  } else if (element == null) {
    container.removeChild(prevInstance.dom);
    return null;
  } else if (prevInstance.element.type === element.type) {
    updateDomProperties(
      prevInstance.dom,
      prevInstance.element.props,
      element.props
    );
    prevInstance.childInstance = reconcile(
      prevInstance.dom,
      prevInstance.childInstance,
      element.props.children[0]
    );
    prevInstance.element = element;
    return prevInstance;
  } else {
    const newInstance = instantiate(element);
    container.replaceChild(newInstance.dom, prevInstance.dom);
    return newInstance;
  }
}

function instantiate(element) {
  const { type, props } = element;
  const isTextElement = type === "TEXT_ELEMENT";

  const dom = isTextElement
    ? document.createTextNode(props.nodeValue)
    : typeof type === "function"
    ? createFunctionalComponent(type, props)
    : document.createElement(type);

  if (!isTextElement && typeof type !== "function") {
    updateDomProperties(dom, [], props);
  }

  const childElements = props.children || [];
  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map((childInstance) => childInstance.dom);
  childDoms.forEach((childDom) => dom.appendChild(childDom));

  const instance = { dom, element, childInstance: childInstances[0] };
  return instance;
}

function createFunctionalComponent(type, props) {
  const component = type(props);
  return instantiate(component).dom;
}

function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = (name) => name.startsWith("on");
  const isAttribute = (name) => !isEvent(name) && name !== "children";

  // Remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = null;
    });

  // Set new or changed attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

export { render };
