import React from 'react';
import PropTypes from 'prop-types';


const FormGroup = ({
  onChangeFields, name, type, display, pattern,
}) => (
  <div className="form-group">
    <label htmlFor={`input${name}`} className="col-sm-2 control-label">{display}</label>
    <div className="col-sm-10">
      <input
        onChange={onChangeFields}
        name={name}
        type={type}
        className="form-control"
        id={`input${name}`}
        required
        placeholder={name}
        pattern={pattern}
      />
    </div>
  </div>
);

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  type: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
};

const ReadOnlyFormGroup = ({
  onChangeFields, name, type, display, email, styleProp,
}) => (
  <div className="form-group">
    <label htmlFor={`input${name}`} className="col-sm-2 control-label">{display}</label>
    <div className="col-sm-10">
      <input
        onChange={onChangeFields}
        name={name}
        type={type}
        required
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
  email, error, name, onChangeFields, onFile, onSubmit,
}) => (
  <div className="">
    <div className="box box-info">
      <div className="box-header with-border">
        <h3 className="box-title">Registration</h3>
      </div>
      <form onSubmit={onSubmit} className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <div className="col-sm-10">
              <span className="text-red"> {error.message}</span>
            </div>
          </div>
          <ReadOnlyFormGroup onChangeFields={onChangeFields} type="text" email={name} display="Name" name="name" />
          <ReadOnlyFormGroup onChangeFields={onChangeFields} type="email" email={email} display="Email" name="email" />
          <FormGroup onChangeFields={onChangeFields} type="text"  pattern={'^[A-Z]{3}[-]\\d{3}[A-Z]{2}$'} display="License Plate" name="license" />
          <FormGroup onChangeFields={onChangeFields} type="text" display="Car Model" name="model" />
          <FormGroup onChangeFields={onFile} type="file" display="Upload License" name="upload" />
          <FormGroup onChangeFields={onChangeFields} type="date" display="Expiration Date" name="expiration" />
          <FormGroup name="phoneNumber" onChangeFields={onChangeFields} type="number" display="Phone Number" />
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
          <button type="submit" disabled={error.message} className="btn btn-info pull-right">Create</button>
        </div>
      </form>
    </div>
  </div>
);

FormLicense.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChangeFields: PropTypes.func.isRequired,
  onFile: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormLicense;
