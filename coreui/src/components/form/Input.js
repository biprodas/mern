import React from 'react';

const Input = ({ name, label, error, info, ...rest }) => {
  return (
    <div className="form-group">
      <label className="text-muted" htmlFor={name}>{label}</label>
      <input 
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <span className="text-danger">{error}</span>}
      {info && <span className="text-info">{info}</span>}
    </div>
  )
}

export default Input;