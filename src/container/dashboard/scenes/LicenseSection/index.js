import React from 'react';
import PropTypes from 'prop-types';
import FormLicense from './FormLicense';
import SearchLicense from './SearchLicense';

const UnverifiedUser = () => (
  <span className="card-tasks">Please hold on while we verify your account.</span>
);

class LicenseSection extends React.Component {
  componentDidMount() {
    const steps = [
      {
        title: 'Form Submit',
        text: 'Please Fill form and submit. An sms will be sent to an Administrator and your license will be reviewed and verified. <br/> ' +
        'Then you can see more wonderful features',
        selector: '.first-step',
        position: 'right',
        type: 'hover',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Search Users',
        text: 'Search for users via license. Only Verified users can use this feature.<br/> Hit Next for tip',
        selector: '.card-tasks',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Visible',
        text: 'You can toggle your visibility display on the map. Only Verified users can use benefit from this feature.<br/> Hit Next for tip',
        selector: '.third-step',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Status',
        text: 'You can update your status for other users to see. Only Verified users can use benefit from this feature.<br/> Hit Next for tip',
        selector: '.fourth-step',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      }, {
        title: 'Logout',
        text: 'Logout. Congratulations you have completed the tour',
        selector: '.fifth-step',
        position: 'left',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },

    ];


    this.props.addSteps(steps);
  }

  handleClick = (e) => {
    e.preventDefault();
    const { next } = this.props;

    next();
  };


  render() {
    const {
      addTooltip, verified, onChangeFields, onFile, error, onSubmit, email, name,
    } = this.props;

    return (
      <section className="content">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Files</h3>
            <span className="first-step" ></span>
            <div className="box-tools pull-right">
              <button
                type="button"
                className="btn btn-box-tool"
                data-widget="collapse"
                data-toggle="tooltip"
                title="Collapse"
              >
                <i className="fa fa-minus"></i>
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                data-widget="remove"
                data-toggle="tooltip"
                title="Remove"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="box-body card-comments">
            <div className="row">
              <div className="col-md-8 card-tickets">
                <FormLicense
                  onChangeFields={onChangeFields}
                  error={error}
                  name={name}
                  email={email}
                  onFile={onFile}
                  onSubmit={onSubmit}
                />
              </div>
              <div className="col-md-4">
                {verified ? <SearchLicense /> : <UnverifiedUser />}
              </div>
              <div className="col-md-6">
              </div>
            </div>
          </div>
          <div className="box-footer">
          </div>
        </div>
      </section>
    );
  }
}

LicenseSection.propTypes = {
  addSteps: PropTypes.func.isRequired,
  addTooltip: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  selector: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  onFile: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
};

export default LicenseSection;
