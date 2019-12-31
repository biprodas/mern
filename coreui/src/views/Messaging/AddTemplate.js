import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import { saveSmsTemplate } from '../../services/smsTemplateService';

export default class AddTemplate extends Component {

  state = {
    data: {},
    errors: {}
  }


  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    //const errorMessage = this.validateProperty(input);
    //errorMessage ? errors[input.name] = errorMessage : delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data, errors } = this.state;

    try{
      await saveSmsTemplate(data);
      toast.info("Template Added..");
      this.setState({ data: {}, errors: {} });
    }
    catch(err){
      if(err.response && err.response.status === 400){
        //const errors = {...this.state.errors };
        //errors.code = err.response.data;
        //this.setState({errors});
        toast.error(err.response.data);
      }
    }
  }

  render() {
    const {data, errors} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="animated fadeIn ">
        <h4 className="text-center my-3"><span className="badge badge-warning">টেম্পলেট যুক্ত করুন</span></h4>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <table className="table table-sm table-borderless h5">
              <tbody>
                <tr>
                  <td style={{width: "20%"}}>টাইটেল</td>
                  <td>
                    <InputText
                      name="title"
                      value={data.title || ""}
                      onChange={this.handleChange}
                      placeholder=''
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>বার্তা</td>
                  <td>
                    <InputTextarea 
                      name="content"
                      rows={6} 
                      //cols={50} 
                      style={{width: "100%"}}
                      value={data.content || ""} 
                      onChange={this.handleChange} 
                      autoResize={true} 
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button type="submit" className="btn  btn-success">যুক্ত করুন</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
