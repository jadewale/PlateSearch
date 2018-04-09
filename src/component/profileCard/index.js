import React from 'react';
import PropTypes from 'prop-types';


const OffencesCard = ({ onChangeOffence, id }) => (
  <div className="form-group">
    <label>Traffic Offence</label>
    <select onChange={(event) => onChangeOffence(event, id)} className="form-control select2 select2-hidden-accessible" style={{ width: '100%' }} tabIndex="-1" aria-hidden="true">
      <option>Drunk Driving</option>
      <option>One Way</option>
      <option>WrecklessNess</option>
      <option>Fugitive</option>
      <option>--clear--</option>
    </select>
  </div>
);

OffencesCard.propTypes = {
  onChangeOffence: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const ProfileCard = ({
  data, onClose, approve, reject, onChangeOffence,
}) => (
  <div
    style={{
      position: 'fixed',
      top: '8px',
      right: '16px',
      zIndex: 10000,
      width: '300px',
    }}
  >
    <div className="box box-widget widget-user">
      <div className={`widget-user-header ${(data.offence) ? 'bg-red-active' : 'bg-aqua-active'}`}>
        <h3 className="widget-user-username">{ data.displayName || data.email }</h3>
        <h5 className="widget-user-desc">{ data.status || 'No Status' }</h5>
        <p className="widget-user-desc">  { data.licenseMessage} </p>
        <p className="widget-user-desc">  { data.offence} </p>
        <div className="box-tools pull-right">
          <button type="button" onClick={onClose} className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="widget-user-image">
        <img
          className="img-circle"
          src={data.photoURL ||
        'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'}
          alt="User Avatar"
        />
      </div>
      <div className="box-footer">
        <div className="row">
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <a onClick={(evt) => approve(evt, data)} href="/" className="link-black text-sm">
                <i className="fa fa-thumbs-o-up margin-r-5"></i>
                Approve
              </a>
            </div>
          </div>
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className={`description-header ${(data.verified) ? 'hide' : ''}`}>Status</h5>
              <span className="description-text">
                { (data.verified) ? <OffencesCard id={data.email} onChangeOffence={onChangeOffence} /> : 'Not Verified' }
              </span>
              <a target="_blank" href={data.file}> <span>View License</span></a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="description-block">
              <a onClick={(evt) => reject(evt, data)} href="/" className="link-black text-sm">
                <i className="fa fa-thumbs-o-down margin-r-5"></i>
                Reject
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfileCard.propTypes = {
  approve: PropTypes.func.isRequired,
  data: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    licenseMessage: PropTypes.string,
    photoURL: PropTypes.string,
    status: PropTypes.bool,
    visible: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeOffence: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
};

export default ProfileCard;
