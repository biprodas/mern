import React, { Component } from 'react';
import {TabView,TabPanel} from 'primereact/tabview';
import AddTemplate from './AddTemplate';
import Templates from './Templates';


export default class SmsTemplate extends Component {
  state = {
    tabKey: 'all'
  }

  setTabKey = k => this.setState({tabKey: k})

  render() {
    const { tabKey } = this.state;
    return (
      <div className="animated fadeIn row">
        <h2 className="col-md-12 text-center my-3 border-bottom">এসএমএস টেম্পলেট</h2>
        <div className='col-md-12'>
          <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})} >
            <TabPanel header="টেম্পলেট সমূহ" leftIcon="pi pi-calendar" >
              <div className="row" style={{ minHeight: "550px"}}>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <Templates />
                </div>
              </div>
            </TabPanel>
            <TabPanel header="যুক্ত করুন" rightIcon="pi pi-user">
              <div style={{ minHeight: "550px"}}>
                <AddTemplate />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    )
  }
}
