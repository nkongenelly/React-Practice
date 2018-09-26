import React, { Component } from "react";
class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };
  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* {this.state.tags.length === 0 $$ <p>"Please add tags"</p>} */}
        {this.renderTags()}
      </React.Fragment>
    );
  }
  handleIncrement = () => {
    console.log("Increment", this);
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
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
