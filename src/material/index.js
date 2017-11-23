import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class DateTimePicker extends React.Component {
  componentWillMount() {
    const value = this.getValue(this.props.value);

    this.state = {
      date: value,
      time: value,
      value: value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getDateFromDateTime = this.getDateFromDateTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const value = this.getValue(nextProps.value);

    if (value === undefined) {
      this.setState({
        time: nextProps.value,
        date: nextProps.value,
        value: nextProps.value,
      });

      return;
    }

    if (Date.parse(nextProps.value) !== Date.parse(this.props.value)) {
      const date = new Date(nextProps.value);
      const time = new Date(nextProps.value);
      const value = this.getDateFromDateTime({ date, time });
      this.setState({ date, time, value });
    }
  }

  getValue(value) {
    if (isNaN(Date.parse(value))) {
      return;
    }

    return new Date(value);
  }

  getDateFromDateTime({ date = this.state.date, time = this.state.time }) {
    const dateArr = [];

    if (!isNaN(Date.parse(date))) {
      dateArr[0] = date.getFullYear();
      dateArr[1] = date.getMonth();
      dateArr[2] = date.getDay();
    }

    if (!isNaN(Date.parse(time))) {
      dateArr[3] = date.getHours();
      dateArr[4] = date.getMinutes();
    }

    return new Date(...dateArr);
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
