import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';

const InputPrepend = ({
  placeholder,
  prepend,
  icon,
  name,
  value,
  type,
  error,
  info,
  onChange,
  disabled,
  style
}) => {
  return (
      <FormGroup className="my-2">
        <InputGroup>
          <InputGroupAddon addonType="prepend"> <InputGroupText style={style}>{<i className={icon}></i>}{prepend}</InputGroupText></InputGroupAddon>
          <Input 
            className={classnames('form-control', {
              'is-invalid': error
            })}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          <FormFeedback >{error}</FormFeedback>
        </InputGroup>
          {info && <small className="form-text text-primary">{info}</small>}
      </FormGroup>
  );
};

InputPrepend.propTypes = {
  placeholder: PropTypes.string,
  prepend: PropTypes.string,
  prepend: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

InputPrepend.defaultProps = {
  type: 'text'
}

export default InputPrepend;