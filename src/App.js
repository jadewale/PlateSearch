import React, { Component } from 'react';
import { Overlay } from 'react-overlay';
import logo from './logo.svg';
import Modal from 'react-modal';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import '../src/css/_all-skins.css';
import '../src/css/dist/css/AdminLTE.css';
import '../src/css/bootstrap/dist/css/bootstrap.css';
import '../src/css/font-awesome/css/font-awesome.min.css';

class App extends Component {


  componentDidMount() {
    this.props.history.push('/login');

  }
  render() {
    return (
      <div className="App">
        <div style={{ display : this.props.refresh ? 'block' : 'none'}} className='overlay'></div>
          {this.props.refresh ? <i className="fa fa-refresh fa-spin"></i>: null}
          <Modal
              isOpen={this.props.modal}
              onAfterOpen={()=> {}}
              onRequestClose={()=> {}}
              closeTimeoutMS={30}
              contentLabel="Modal"
          >
              <h1>Modal Content</h1>
              <p>Etc.</p>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      refresh: state.user.refresh
    }
}

function mapDispatchToProps() {
    
}

export default withRouter(connect(mapStateToProps, null)(App));
