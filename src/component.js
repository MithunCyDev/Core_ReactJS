class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    // Re-render the component
    render();
  }
}

export default Component;
