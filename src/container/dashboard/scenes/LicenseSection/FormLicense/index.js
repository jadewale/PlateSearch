import React from 'react';
import PropTypes from 'prop-types';


const FormGroup = ({
  onChangeFields, name, type, display,
}) => (
  <div className="form-group">
    <label htmlFor={`input${name}`} className="col-sm-2 control-label">{display}</label>
    <div className="col-sm-10">
      <input
        onChange={onChangeFields}
        name={name}
        required
        type={type}
        className="form-control"
        id={`input${name}`}
        placeholder={name}
      />
    </div>
  </div>
);

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
};

const ReadOnlyFormGroup = ({
  onChangeFields, name, type, display, email
}) => (
  <div className="form-group">
    <label htmlFor={`input${name}`} className="col-sm-2 control-label">{display}</label>
    <div className="col-sm-10">
      <input
        onChange={onChangeFields}
        name={name}
        required
        type={type}
        className="form-control"
        id={`input${name}`}
        placeholder={name}
        value={email}
        readOnly
      />
    </div>
  </div>
);


ReadOnlyFormGroup.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
};

const FormLicense = ({
  email, onChangeFields, onFile, onSubmit,
}) => (
  <div className="">
    <div className="box box-info">
      <div className="box-header with-border">
        <h3 className="box-title">Registration</h3>
      </div>
      <form onSubmit={onSubmit} className="form-horizontal">
        <div className="box-body">
          <FormGroup onChangeFields={onChangeFields} type="text" display="Name" name="name" />
          <ReadOnlyFormGroup onChangeFields={onChangeFields} type="email" email={email} display="Email" name="email" />
          <FormGroup onChangeFields={onChangeFields} type="text" display="License Plate" name="license" />
          <FormGroup onChangeFields={onChangeFields} type="text" display="Car Model" name="model" />
          <FormGroup onChangeFields={onFile} type="file" display="Upload License" name="upload" />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button type="submit" className="btn btn-info pull-right">Create</button>
        </div>
      </form>
    </div>
  </div>
);

FormLicense.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  onFile: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormLicense;
