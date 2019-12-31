import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputGroup from '../../../components/form/InputGroup';

import auth from '../../../services/authService';


class Login extends Component {

  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    if(user) this.props.history.push('/');
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label("Password")
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
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors: {} });
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if(errors) return;

    try{
      await auth.login(this.state.data);
      window.location = "/";
      // this.props.history.push("/");
    }
    catch(err){
      if(err.response && err.response.status === 400){
        const errors = {...this.state.errors };
        errors.username = err.response.data;
        errors.password = err.response.data;
        this.setState({errors});
        //toast.error(errors.username);
      }
    }
  }

  render() {

    const { data, errors } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            {/* <div className="col-md-12 text-center my-3">
              <h3>উপজেলা সার্টিফিকেট আদালত</h3>
              <p>মনিরামপুর, যশোর</p>
            </div> */}
            <Col md="8">
              <CardGroup>
                <Card className="p-3">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="h3 text-center">
                        <span className="badge badge-warning">লগইন ফর্ম</span>
                      </div>
                      <p className="text-center text-muted">আপনার একাউন্টে লগইন করুন</p>
                      <InputGroup className="mb-3" 
                        icon="icon-user"
                        name="username"
                        value={data.username}
                        onChange={this.handleChange}
                        placeholder="ইউজারনেম"
                      />
                      <InputGroup className="mb-3" 
                        icon="icon-lock"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={this.handleChange}
                        placeholder="পাসওয়ার্ড"
                      />
                      <Row>
                        <Col xs="12" className="text-center my-3">
                          <Button type="submit" color="primary" className="px-4">লগইন করুন</Button>
                        </Col>
                        <Col xs="12" className="text-center">
                          {Object.keys(errors).length > 0 && <span className="text-center text-danger my-3">ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়</span>}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h3>উপজেলা সার্টিফিকেট আদালত</h3>
                      <h5>মনিরামপুর, যশোর</h5>
                      <hr />
                      <p>মামলা ব্যবস্থাপনা সফটওয়্যারে স্বাগতম</p>
                      {/* <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>রেজিস্ট্রেশন !</Button>
                      </Link> */}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
