import React, { Component } from 'react';
import FloatInput from './FloatInput';
import Select from './Select';
import InputGroup from './InputGroup';
import InputText from './InputText';

export default class FormTest extends Component {
  render() {
    return (
      <div>
        <div className="container my-5">
          <div className="row bg-white p-3">
            <div className="col-md-6 mx-auto">
              <FloatInput 
                name="Biprodas"
                value=''
                placeholder='name'
                required
              />
              <Select 
                name="religion"
                value=''
                options={[
                  {label: 'Select religion *', value: ''},
                  {label: 'Islam', value: 'Islam'},
                  {label: 'Hinduism', value: 'Hinduism'},
                  {label: 'Buddhism', value: 'Buddhism'},
                  {label: 'Christianity', value: 'Christianity'},
                  {label: 'Other', value: 'Other'}
                ]}
              />
              <InputGroup 
                name="Biprodas"
                value=''
                placeholder='First name here'
                prepend="First Name"
              />
              <InputText
                label='First name'
                name="Biprodas"
                value=''
                placeholder='First name here'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}