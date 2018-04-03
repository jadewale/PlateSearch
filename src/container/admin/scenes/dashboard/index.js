import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../../component/header';
import Sidebar from '../../../../component/sideNav';
import DashboardSection from '../../../dashboard/scenes/DashboardSection';
import Footer from '../../../../component/footer';
import ProfileCard from '../../../../component/profileCard';

const Admin = (props) => (
  <div className="skin-blue sidebar-mini wrapper sidebar-collapse">
    <Header toggle={props.func.onToggleDashboard} prompt={props.func.onLogout} />
    <Sidebar
      photoUrl=""
      onSubmit={() => {}}
      onChange={() => {}}
      status="Admin User"
    />
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          Welcome
        </h1>
        Admin Section
      </section>
      <DashboardSection
        users={props.variables.users.allUsers}
        openChat={props.func.onOpenChat}
        admin
        coords={{
          latitude: props.variables.weather.lat,
          longitude: props.variables.weather.lon,
        }}
      />
      <div>
        {props.variables.chatOrder.map((obj, index) => (<ProfileCard
          approve={props.func.approveUser}
          reject={props.func.rejectUser}
          key={index.toString()}
          data={props.variables.users.allUsers[obj]}
          onClose={props.func.onRemove}
          onChangeOffence={props.func.onChangeOffence}
        />))}
      </div>
    </div>
    <Footer />
    <div className="control-sidebar-bg"></div>
  </div>
);

Admin.propTypes = {
  func: PropTypes.shape({
    approveUser: PropTypes.func.isRequired,
    rejectUser: PropTypes.func.isRequired,
    onOpenChat: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onToggleDashboard: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChangeOffence: PropTypes.func.isRequired,
  }).isRequired,
  variables: PropTypes.shape({
    users: PropTypes.object.isRequired,
    weather: PropTypes.object,
    chatOrder: PropTypes.array.isRequired,
  }).isRequired,
};


export default Admin;
