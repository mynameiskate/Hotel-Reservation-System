import React from 'react';

class Checkbox extends React.Component {
  state = {
    isChecked: false,
  }

  onChange = (callback) => {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    callback();
  }

  render() {
    const { label, addItem, removeItem } = this.props;
    const { isChecked } = this.state;
    const callback = isChecked  ? removeItem : addItem;

    return (
      <div id={label} className='checkbox'>
        <label>
          <input
            type='checkbox'
            value={label}
            checked={isChecked}
            onChange={() => this.onChange(callback)}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;