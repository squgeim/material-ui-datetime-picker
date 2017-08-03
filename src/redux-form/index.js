import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '../material';

const ReduxFormDateTimePicker = ({
  input: { onBlur, ...inputProps }, // eslint-disable-line no-unused-vars
  meta: { touched, error, warning },
  onChange,
  ...props
}) =>
  <DateTimePicker
    {...inputProps}
    {...props}
    {...(touched && { errorText: error || warning }) || {}}
    onChange={(e, val) => {
      if (typeof inputProps.onChange === 'function') {
        inputProps.onChange(val);
      }

      if (typeof onChange === 'function') {
        onChange(val);
      }
    }}
  />;

ReduxFormDateTimePicker.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }),
  onChange: PropTypes.func,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default ReduxFormDateTimePicker;
