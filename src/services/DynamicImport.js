import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicImport extends Component {
  state = {
    component: null,
  };
  componentWillMount() {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component,
        }));
      });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

DynamicImport.propTypes = {
  load: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DynamicImport;
