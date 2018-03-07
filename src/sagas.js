import { all } from 'redux-saga/effects';
import user from '../src/container/user/sagas';

export default function* () {
  yield all([].concat(
    user,
  ));
}
