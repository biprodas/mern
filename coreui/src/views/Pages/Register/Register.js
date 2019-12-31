import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 
import _ from 'lodash';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';
import {InputText} from 'primereact/inputtext';
import { register } from '../../../services/userService';
import auth from '../../../services/authService';


import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  state = {
    data: {
      name: "",
      username: "",
      password: "",
      repeat_password: ""
    },
    errors: {}
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    if(user) this.props.history.push('/');
  }
  

  schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label("Password"),
    repeat_password: Joi.string().required().label("Confirm Password"),
  };

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log(error);
    if(!error) return null;

    const errors = {};
    for(let item of error.details){
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //console.log(input);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    errorMessage ? errors[input.name] = errorMessage : delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate() || {};
    if(data.password !== data.repeat_password) errors.repeat_password = "Password did not matched";
    this.setState({ errors });
    if(Object.keys(errors).length !== 0) return;
    //console.log(data);
    try{
      const user = _.pick(this.state.data, ["name", "username", "password", "repeat_password"]);
      const response = await register(user);
      //console.log(response);
      auth.loginWithJWT(response.headers['x-auth-token']);
      window.location = '/';
      toast.success('Registration successful');
    }
    catch(err){
      if(err.response && err.response.status === 400){
        const errors = {...this.state.errors };
        errors.username = err.response.data;
        //toast.error('Username already exits');
        toast.error(errors.username);
        this.setState({errors});
      }
    }
  }

  render() {

    const {data, errors } = this.state;

    return (
      <div className="row mt-4">
        <div className="col-md-3"></div>
        <div className="col-md-6 h5">
          <div className="card shadow-sm">
            <div className="h3 my-3 text-center">
              <span className="badge badge-warning">ইউজার নিবন্ধন ফর্ম</span>
            </div>
              <form onSubmit={this.handleSubmit}>
                <div className="card-body px-5 row">
                  <label className="col-md-3 mr-3">নাম</label>
                  <InputText 
                    name='name'
                    placeholder="সম্পূর্ণ নাম"
                    value={data.name} 
                    onChange={this.handleChange} 
                    className={`col-md-7 ${errors.name ? 'p-error' : 'mb-3'}`}
                  />
                  { errors.name && <span className="col-md-12 text-center mb-2 text-danger">{errors.name}</span>}
                  
                  <div className="col-md-3 mr-3"><label>ইউজারনেম</label> </div>
                  <InputText 
                    name='username'
                    placeholder="সিস্টেমে ব্যবহারিক নাম"
                    value={data.username} 
                    onChange={this.handleChange} 
                    className={`col-md-7 ${errors.username ? 'p-error' : 'mb-3'}`}
                  />
                  { errors.username && <span className="col-md-12 text-center mb-2 text-danger">{errors.username}</span>}
                  
                  <div className="col-md-3 mr-3"><label>পাসওয়ার্ড</label> </div>
                  <InputText 
                    name='password'
                    type="password"
                    placeholder="পাসওয়ার্ড"
                    value={data.password} 
                    onChange={this.handleChange} 
                    className={`col-md-7 ${errors.password ? 'p-error' : 'mb-3'}`}
                  />
                  { errors.password && <span className="col-md-12 text-center mb-2 text-danger">{errors.password}</span>}

                  <div className="col-md-3 mr-3"><label>কনফার্ম পাসওয়ার্ড</label> </div>
                  <InputText 
                    name='repeat_password'
                    type="password"
                    placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                    value={data.repeat_password} 
                    onChange={this.handleChange} 
                    className={`col-md-6 mb-3 ${errors.repeat_password ? 'p-error' : ''}`}
                  />
                  { errors.repeat_password && <span className="col-md-12 text-center mb-2 text-danger">{errors.repeat_password}</span>}

                  <div className="col-md-12 text-center">
                    <button disabled={this.validate()}  className="btn btn-primary font-weight-bold px-5 my-4">নিবন্ধন সম্পন্ন করুন</button>
                  <div>নিবন্ধিত আছেন? <NavLink to="/login">লগ ইন</NavLink> করুন</div>
                  </div>
                </div>
              </form>
          </div>
        </div>

      </div>

    );
  }
}

export default Register;
