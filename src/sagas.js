import { all } from 'redux-saga/effects';
import user from '../src/container/user/sagas';
import dashboard from '../src/container/dashboard/sagas';

export default function* () {
  yield all([].concat(
    dashboard,
    user,
  ));
}
