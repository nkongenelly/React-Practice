import React, { Component } from "react";
class Counter extends Component {
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDecrease(this.props.counter)}
          className="btn btn-primary btn-sm m-2"
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
        {/* {this.props.counter.tags.length === 0 $$ <p>"Please add tags"</p>} */}
      </div>
    );
  }

  // handleDecrement = product => {
  //   console.log(product);
  //   this.setState({ value: this.props.counter.value - 1 });
  //   this.setState({ product: this.props.counter.product - 1 });
  // };

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
