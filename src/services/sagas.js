import { call, put, take,  takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
    googleSignIn as googleAPI, facebookSignIn as facebookAPI,
    createLicenseData as createLicenseAPI, viewLicenses as viewLicenseAPI,
    viewUserData as viewUserAPI, approveUser as approveUserAPI,
    sendMessage as sendMessageAPI,
    receiveMessage as receiveMessageAPI,
    deactivateUser as deactivateUserAPI,
} from '../api/user';
import {GOOGLE_SIGN, FACEBOOKSUCCESS, FACEBOOK_SIGN,
    GOOGLESUCCESS,
    CREATE_LICENSE, READ_LICENSE, VIEW_LICENSE_SUCCESS, FETCH_ADMIN_DATA, APPROVE_USER,
    SEND_MESSAGE, RECEIVE_MESSAGE,RECEIVE_MESSAGE_SUCCESS, DEACTIVATE_ACCOUNT,
} from "../actions/constants";
import {viewLicenseSuccess,
    fetchAdminDataSuccess,
    receiveMessageSuccess,
    showLoader, hideLoader,
    createLicenseSuccess, deactivatedAccounts} from "../actions/userActions";

function*  googleSign() {
    try {
        yield put(showLoader());
        const google = yield call(googleAPI);
        yield put({type: GOOGLESUCCESS, user: google});
        yield put(hideLoader());
    } catch (e) {
        yield put(hideLoader());
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function*  facebookSign() {
    try {
        yield put(showLoader());
        const facebook = yield call(facebookAPI);
        yield put({type: FACEBOOKSUCCESS, user: facebook});
        yield put(hideLoader());
    } catch (e) {
        yield put(hideLoader());
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* createLicense (action) {
    try {
        yield put(showLoader());
        const createLicenseResponse = yield call(createLicenseAPI, action.obj, action.files);
        yield put(createLicenseSuccess());
        yield put(hideLoader());
    } catch (e) {
        console.log(e);
        yield put(hideLoader());
    }
}

function* viewLicense() {
    try {
        yield put(showLoader());
        const viewLicenseResponse = yield call(viewLicenseAPI);
        yield put(hideLoader());
        if(!viewLicenseResponse.empty) {
            yield put(viewLicenseSuccess(viewLicenseResponse.docs));
        }
        yield put(hideLoader());

    } catch (e) {
        console.log(e);
    }
}

function* fetchUserDocuments() {
    try {
        yield put(showLoader());
        const fetchUserData = yield call(viewUserAPI);
        yield put(fetchAdminDataSuccess(fetchUserData.nonVerified));
        yield put(deactivatedAccounts(fetchUserData.deactivatedUsers));
        yield put(hideLoader());
    } catch (e) {
        console.log(e);
    }
}

function* approveUser (action) {
    try {
        yield put(showLoader());
        const approveUserMethod = yield call(approveUserAPI, action.id);
        yield put(hideLoader());
    } catch (e) {

    }
}

function* sendMessageSaga(action) {
    try {
        const sendMessage = yield call(sendMessageAPI, action.id, action.msg);
    } catch (e) {

    }
}


function* receiveMessageSaga(action) {
    try {
            const receiveMessage = yield call(receiveMessageAPI, action.id);

            while(true) {
                const value = yield take(receiveMessage);
                yield put(receiveMessageSuccess(value));
            }


    } catch (e) {

    }
}

function* deactivateAccount(action) {
    try {
        yield put(showLoader());
        const deactivateccount = yield call(deactivateUserAPI, action.id);
        const fetchUserData = yield call(viewUserAPI);
        yield put(fetchAdminDataSuccess(fetchUserData));
        yield put(hideLoader());
    } catch (e) {
        console.log(e);
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
/*
function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
} */





/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/



function* mySaga() {
    yield takeLatest(GOOGLE_SIGN, googleSign);
    yield takeLatest(FACEBOOK_SIGN, facebookSign);
    yield takeLatest(CREATE_LICENSE, createLicense);
    yield takeLatest(READ_LICENSE, viewLicense);
    yield takeLatest(FETCH_ADMIN_DATA, fetchUserDocuments);
    yield takeLatest(APPROVE_USER, approveUser);
    yield takeEvery(SEND_MESSAGE, sendMessageSaga);
    yield takeEvery(RECEIVE_MESSAGE, receiveMessageSaga);
    yield takeLatest(DEACTIVATE_ACCOUNT, deactivateAccount);
}

export default mySaga;