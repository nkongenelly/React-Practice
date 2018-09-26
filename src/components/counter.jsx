import React, { Component } from "react";
class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: ["tag1", "tag2", "tag3"],
    product: 1
  };
  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.handleIncrement({ id: this.state.product })}
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>
        <button
          onClick={() => this.handleDecrement({ id: this.state.product })}
          className="btn btn-secondary btn-sm m-2"
        >
          Decreament
        </button>
        <button
          onClick={() => {
            this.props.onDelete(this.props.counter.id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
        {/* {this.state.tags.length === 0 $$ <p>"Please add tags"</p>} */}
        {this.renderTags()}
      </React.Fragment>
    );
  }
  handleIncrement = product => {
    console.log(product);
    this.setState({ value: this.state.value + 1 });
    this.setState({ product: this.state.product + 1 });
  };
  handleDecrement = product => {
    console.log(product);
    this.setState({ value: this.state.value - 1 });
    this.setState({ product: this.state.product - 1 });
  };

  renderTags() {
    if (this.state.tags.length === 0) {
      return <p>There is no tag</p>;
    } else {
      return (
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      );
    }
  }

  formatCount() {
    const { value } = this.state;
    return value === 0 ? "Zero" : value;
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
