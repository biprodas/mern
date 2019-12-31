import React, { Component} from 'react';
import {toast} from 'react-toastify';
import { Modal } from 'react-bootstrap';
import {Accordion,AccordionTab} from 'primereact/accordion';
import {InputTextarea} from 'primereact/inputtextarea';
import { getSmsTemplates, deleteSmsTemplate, saveSmsTemplate } from '../../services/smsTemplateService';

class Templates extends Component {

  state = {
    templates: [],
    show: false
  }

  handleShow = template => this.setState({show: true, template });
  handleClose = () => this.setState({show: false, template: {} });


  async componentDidMount() {
    const { data: templates } = await getSmsTemplates();
    this.setState({templates});
  }

  handleChange = ({ currentTarget: input }) => {
    const templates = [ ...this.state.templates ];
    const [template] = templates.filter(temp=>temp._id===input.id)
    templates[templates.indexOf(template)].content = input.value;
    //console.log(templates);
    //data[input.name] = input.value;
    this.setState({ templates });
  }

  handleSave = async template => {
    console.log(template);
    try{
      await saveSmsTemplate(template);
      const { data: templates } = await getSmsTemplates();
      this.setState({ templates });
      toast.info(`Saved...`);
    }
    catch(err){
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data);
      }
    }
  }

  handleDelete = async template => {
    try{
      await deleteSmsTemplate(template._id);
      const { data: templates } = await getSmsTemplates();
      this.setState({ templates, show: false });
      toast.info(`Template has been deleted...`);
    }
    catch(err){
      if (err.response && err.response.status === 404) {
        toast.error("This Template has already been deleted");
      }
    }
  }

  render() {
    const {templates, template, show} = this.state;
    return (
      <div className="animated fadeIn">
        <Accordion multiple={true}>
          {
            templates.map(temp => 
              <AccordionTab key={temp._id} header={temp.title}>
                <div className="row">
                  <div className="col-md-10">
                    <InputTextarea 
                      id={temp._id}
                      name="content"
                      rows={4}
                      //cols={50}
                      value={temp.content || ""} 
                      onChange={this.handleChange} 
                      style={{width: "100%"}}
                      autoResize={true} 
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-sm btn-success m-2" onClick={e=>this.handleSave(temp)}>Save</button>
                    <button className="btn btn-sm btn-danger" onClick={e=>this.handleShow(temp)}>Delete</button>
                  </div>
                </div>
              </AccordionTab>
            )
          }
          </Accordion>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger text-center">টেমপ্লেট মুছুন</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p>Are you sure to delete this SMS Template ?</p>
                {/* <InputText 
                  value={this.state.deleteItem}
                  placeholder="Code"
                  className="ml-5"
                  onChange={e=> this.setState({ disabled: Number(e.target.value)===item.code? false : true })}
                /> */}
              </div>
              <div className="col-md-12 text-right mt-3">
                <button className="btn btn-sm btn-light border border-secondary mr-2" onClick={this.handleClose}>CANCEL</button>
                <button className="btn btn-sm btn-danger border border-danger" onClick={()=>this.handleDelete(template)}>DELETE</button>            
              </div>
            </Modal.Body>
          </Modal>
      </div>
    )
  }
}

export default Templates;