import React, { Component } from 'react';

class PageSelectorComponent extends Component {
  state = {
    value: this.props.defafultValue,
    name: this.props.name || 'name',
  };

  render() {
    return (
      <div>
        <p>select page</p>
        {this.props.values?.map((item) => (
          <label>
            {item.label}
            <input
              type="radio"
              name={this.state.name}
              value={item.value}
              checked={this.state.value === item.value}
              onChange={() => this.setState({ value: item.value })}
            />
          </label>
        ))}
      </div>
    );
  }
}

export default PageSelectorComponent;
