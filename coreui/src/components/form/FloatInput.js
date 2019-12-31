import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './formStyle.css';

const FloatInput = ({
  placeholder,
  type,
  name,
  value,
  info,
  error,
  onChange,
  disabled,
  required,
  style
}) => {
  return (
    <div className="form-group">
      <input 
        className={classnames('form-control', {
          'is-invalid': error
        })}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={value==='' ? { opacity:'0.5'} : {borderColor: '#4dbd74'}}
      />
      <label className="form-control-placeholder" htmlFor={name}>{placeholder}</label>
      {info && <small className="form-text text-info">{info}</small>}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

InputFloat.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

InputFloat.defaultProps = {
  type: 'text'
}

export default FloatInput;