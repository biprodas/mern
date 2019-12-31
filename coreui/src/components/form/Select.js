import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({ name, value, error, info, onChange, options, required, disabled }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}> 
      {option.label} 
    </option>
  ));

  return (
    <div className="form-group">
      <select 
        className={classnames('form-control', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
        style={value==='' ? { opacity:'0.5'} : {borderColor: '#4dbd74'}}
      >
        {selectOptions}
      </select>
      <label 
        className="form-control-placeholder" 
        htmlFor={name}
        style={{paddingLeft: '17px'}} 
      >
      {options[0].label}
      </label>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

export default Select;

// const Select = ({ name, label, options, error, info, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <select name={name} id={name} {...rest} className="form-control">
//         <option value="" />
//         {options.map(option => (
//           <option key={option._id} value={option._id}>{option.name}</option>
//         ))}
//       </select>
//       {error && <span className="text-danger">{error}</span>}
//     </div>
//   );
// };