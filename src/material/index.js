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

    this.handleChange = this.handleChange.bind(this);
    this.getDateFromDateTime = this.getDateFromDateTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (isNaN(Date.parse(nextProps.value))) {
      this.setState({
        time: nextProps.value,
        date: nextProps.value,
        value: nextProps.value,
      });

      return;
    }

    if (Date.parse(nextProps.value) !== Date.parse(this.props.value)) {
      const value = this.getDateFromDateTime({
        date: new Date(nextProps.value),
        time: new Date(nextProps.value),
      });
      this.setState({ value });
    }
  }

  getDateFromDateTime({ date = this.state.date, time = this.state.time }) {
    const dateArr = [];

    date && date.getFullYear() && dateArr.push(date.getFullYear());
    date && date.getMonth() && dateArr.push(date.getMonth());
    date && date.getDate() && dateArr.push(date.getDate());
    time && time.getHours() && dateArr.push(time.getHours());
    time && time.getMinutes() && dateArr.push(time.getMinutes());

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
