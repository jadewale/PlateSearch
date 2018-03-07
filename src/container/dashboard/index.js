import React, { Component } from 'react';
import DashboardSection from '../dashboard/scenes/DashboardSection';
import Header from '../../component/header';
import Sidebar from '../../component/sideNav';
import Footer from '../../component/footer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: '',
    };
  }
  onToggleDashboard = () => {
    if (this.state.collapse === '') {
      this.setState({ collapse: 'collapse' });
    } else {
      this.setState({ collapse: '' });
    }
  };

  render() {
    return (
      <div className={`skin-blue sidebar-mini wrapper sidebar-${this.state.collapse}`}>
        <Header toggle={this.onToggleDashboard} />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Welcome
            </h1>
            Please Upload your License for Approval
          </section>
          <DashboardSection />
        </div>
        <Footer />
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
}

export default Dashboard;
