import React from 'react';
import PropTypes from 'prop-types';
import FormLicense from './FormLicense';
import SearchLicense from './SearchLicense';

const UnverifiedUser = () => (
  <span>Please hold on while we verify your account.</span>
);

const LicenseSection = ({
  verified, onChangeFields, onFile, error, onSubmit, email, name,
}) => (
  <section className="content" style={{ height: '80vh' }}>
    <div className="box">
      <div className="box-header with-border">
        <h3 className="box-title">Files</h3>

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
          <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="box-body">
        <div className="row">
          <div className="col-md-8">
            <FormLicense onChangeFields={onChangeFields} error={error} name={name} email={email} onFile={onFile} onSubmit={onSubmit} />
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

LicenseSection.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  onFile: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
};

export default LicenseSection;
