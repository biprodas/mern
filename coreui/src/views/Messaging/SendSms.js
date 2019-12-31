import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import { saveMessage } from '../../services/messageService';
import { getSmsTemplates } from '../../services/smsTemplateService';

export default class SendSms extends Component {

  state = {
    data: {},
    templates: [],
    errors: {}
  }

  async componentDidMount() {
    const { data: templates } = await getSmsTemplates();
    this.setState({templates});
  }
  

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    //const errorMessage = this.validateProperty(input);
    //errorMessage ? errors[input.name] = errorMessage : delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { data, errors } = this.state;

    try{
      await saveMessage(data);
      toast.info("Message Sent..");
      this.setState({ data: {}, errors: {} });
    }
    catch(err){
      if(err.response && err.response.status === 400){
        //const errors = {...this.state.errors };
        //errors.code = err.response.data;
        //this.setState({errors});
        //toast.error(err.response.data);
        toast.error("Can not send message, try again..");
      }
    }
  }

  render() {
    const {data, errors, templates} = this.state;
    
    // const categories = [
    //   {label: '১ম শুনানির নোটিশ', value: '১ম শুনানির নোটিশ'},
    //   {label: '২য় শুনানির নোটিশ', value: '২য় শুনানির নোটিশ'},
    //   {label: '৩য় শুনানির নোটিশ', value: '৩য় শুনানির নোটিশ'},
    //   {label: 'এরেস্ট ওয়ারেন্ট', value: 'এরেস্ট ওয়ারেন্ট'},
    //   {label: 'অন্যান্য', value: 'অন্যান্য'}
    // ];
    const categories = [];
    templates.forEach(category=> {
      let obj = {
        label: category.title,
        value: category.title,
        content: category.content
      };
      categories.push(obj);
    })

    return (
      <div className="animated fadeIn">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h4 className="text-center my-3"><span className="badge badge-warning">এসএমএস পাঠান</span></h4>
              <table className='table table-sm table-borderless h5'>
                <tbody>
                  <tr>
                    <td style={{width: "20%"}}>কেস নং</td>
                    <td>
                      <InputText 
                        name="case"
                        value={data.case || ""} 
                        onChange={this.handleChange} 
                        className={`${errors.case ? 'p-error' : ''}`}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ফোন নং</td>
                    <td>
                      <InputText 
                        name="phone"
                        value={data.phone || ""} 
                        onChange={this.handleChange} 
                        className={`${errors.phone ? 'p-error' : ''}`}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ধরন</td>
                    <td>
                      <Dropdown 
                        value={data.category} 
                        options={categories} 
                        onChange={ e => {
                          data['category'] = e.value;
                          let [message] = categories.filter(cat=>cat.value===e.value);
                          data['message'] = message && message.content;
                          this.setState({ data });
                        }} 
                        placeholder="এসএমএস এর ধরন" 
                        className={`${errors.category ? 'p-error' : ''}`}
                        style={{width: "60%"}}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>মেসেজ</td>
                    <td>
                      <InputTextarea 
                        name="message"
                        rows={5} 
                        //cols={50} 
                        style={{width: "100%"}}
                        value={data.message || ""} 
                        onChange={this.handleChange} 
                        autoResize={true} 
                        placeholder="বার্তা লিখুন..."
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <button type="submit" className="btn btn-primary h4 px-3">প্রেরণ করুন</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
