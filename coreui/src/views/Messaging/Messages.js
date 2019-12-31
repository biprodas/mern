import React, { Component } from 'react';
import moment from 'moment';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { saveMessage, getMessages } from '../../services/messageService';

export default class Messages extends Component {

  state = {
    messages: []
  }

  async componentDidMount() {
    const { data: messages } = await getMessages();
    this.setState({ messages });
  }

  dateTemplate = ({ date }) => moment(date).format("DD/MM/YYYY");
  phoneTemplate = ({phone, isOC}) => {
  return isOC ? <span>{phone} , <span className="badge badge-warning ml-2">OC</span></span> : phone;
  }

  messageTemplate = ({message}) => <code>{message}</code>
  

  render(){

    const { messages } = this.state;
    
    const cities = [
      {label: 'New York', value: 'NY'},
      {label: 'Rome', value: 'RM'}
    ];
    
    let header = <div className="row">
                  <div className="col-md-8 row text-left">
                    <div className="col-md-4">
                      <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search..."/>
                    </div>
                  </div>
                  {/* <div className="col-md-4 text-right">
                    <span className="btn btn-sm px-2 btn-secondary" onClick={this.export}>
                    <i className="mr-1 fas fa-file-export"></i>Report
                    </span>
                  </div> */}
                </div>;

return (
  <div className="animated fadeIn">
        <DataTable 
          value={messages} 
          paginator={true} 
          responsive={true}
          rows={10} 
          rowsPerPageOptions={[10, 20, 50, 100]}
          sortMode="multiple"
          //resizableColumns={true} 
          columnResizeMode="expand"
          globalFilter={this.state.globalFilter} 
          emptyMessage="No records found"
          header={header}
          ref={(el) => { this.dt = el; }}
        >
          <Column field="date" header="তারিখ" sortable={true} body={this.dateTemplate} style={{width: "12%"}}/>
          <Column field="case" header="কেস নাম্বার" sortable={true} style={{width: "12%"}}/>
          <Column field="category" header="ধরন" style={{width: "15%"}}/>
          <Column field="phone" header="মোবাইল নাম্বার" style={{width: "20%"}} body={this.phoneTemplate}/>
          <Column field="message" header="মেসেজ কন্টেন্ট" body={this.messageTemplate}/>
        </DataTable>
      </div>
    )
  }
}
