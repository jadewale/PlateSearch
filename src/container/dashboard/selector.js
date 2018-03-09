export const makeSelector = (state) => (
  { ...state.userData.toJS(), ...state.dashboardData.toJS() }
);
