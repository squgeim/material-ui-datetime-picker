import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class DateTimePicker extends React.Component {
  componentWillMount() {
    this.state = {
      date: this.props.value,
      time: this.props.value,
      value: this.props.value,
    };
  }

  getDateFromDateTime({ date = this.state.date, time = this.state.time }) {
    return new Date(
      date && date.getFullYear(),
      date && date.getMonth(),
      date && date.getDate(),
      time && time.getHours(),
      time && time.getMinutes()
    );
  }

  handleChange({ date = undefined, time = undefined }) {
    const value = this.getDateFromDateTime({ date, time });
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(undefined, value);
    }
  }

  render() {
    const { onChange, ...props } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div>
        <DatePicker
          id="datefield"
          {...props}
          value={this.state.date}
          formatDate={date =>
            `${date.toLocaleDateString()} ${(this.state.time &&
              this.state.time.toLocaleTimeString()) ||
              ''}`}
          onChange={(_, date) => {
            this.setState({ date });
            this.handleChange({ date });
            this.timepicker.openDialog();
          }}
        />
        <TimePicker
          id="timefield"
          ref={elem => (this.timepicker = elem)}
          style={{ display: 'none' }}
          onChange={(_, time) => {
            time.setSeconds(0, 0);
            this.setState({ time });
            this.handleChange({ time });
          }}
          value={this.state.time}
        />
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default DateTimePicker;
