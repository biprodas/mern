import React, { Component } from 'react';
import {TabView,TabPanel} from 'primereact/tabview';
import { Tabs, Tab } from 'react-bootstrap';
import SendSms from './SendSms';
import Messages from './Messages';

export default class Message extends Component {
  state = {
    tabKey: 'all'
  }

  setTabKey = k => this.setState({tabKey: k})

  render() {
    const { tabKey } = this.state;
    return (
      <div className="animated fadeIn row">
        <h2 className="col-md-12 text-center my-3 border-bottom">মেসেজিং</h2>
        <div className='col-md-12'>
          <TabView activeIndex={this.state.activeIndex} className="" onTabChange={(e) => this.setState({activeIndex: e.index})} >
            <TabPanel header="বার্তা প্রেরণ করুন" leftIcon="pi pi-calendar">
              <div style={{ minHeight: "560px"}}>
                <SendSms />
              </div>
            </TabPanel>
            <TabPanel header="বার্তা সমূহ" rightIcon="pi pi-user" >
              <div style={{ minHeight: "560px"}}>
                <Messages />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    )
  }
}
