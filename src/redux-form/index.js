import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '../material';

const ReduxFormDateTimePicker = ({
  input, // eslint-disable-line no-unused-vars
  label, // eslint-disable-line no-unused-vars
  meta: { touched, error }, // eslint-disable-line no-unused-vars
  ...rest
}) =>
  <DateTimePicker
    onChange={(e, val) => input.onChange(val)}
    {...rest}
    value={input.value}
  />;

ReduxFormDateTimePicker.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  label: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.error,
  }),
};

export default ReduxFormDateTimePicker;
