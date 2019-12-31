import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './formStyle.css';

const InputText = ({
  placeholder,
  type,
  name,
  value,
  info,
  error,
  onChange,
  disabled,
  required
}) => {
  return (
    <div className="form-group">
      <input 
        className={classnames('form-control expand', {
          'is-invalid': error,
          'is-valid': !error && value
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {info && <small className="form-text text-info">{info}</small>}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

InputText.propTypes = {
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

InputText.defaultProps = {
  type: 'text'
}

export default InputText;



// const InputText = ({ name, label, error, info, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label className="text-muted" htmlFor={name}>{label}</label>
//       <input 
//         {...rest}
//         name={name}
//         id={name}
//         className="form-control"
//       />
//       {error && <span className="text-danger">{error}</span>}
//       {info && <span className="text-info">{info}</span>}
//     </div>
//   )
// }

