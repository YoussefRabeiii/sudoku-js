import React, { Component } from "react";

export class SudokuField extends Component {
  handleChange = e => {
    const value = e === "" ? null : parseInt(e.target.value, 10);

    this.props.onChange({ ...this.props.field, value });
  };

  render() {
    const { field } = this.props;

    return (
      <input
        className="field"
        value={field.value || ""}
        maxlength="1"
        readOnly={field.readonly}
        onChange={this.handleChange}
      />
    );
  }
}

export default SudokuField;
