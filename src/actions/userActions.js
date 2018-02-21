import {
    FACEBOOK_SIGN, GOOGLE_SIGN,
    FACEBOOKSUCCESS, GOOGLESUCCESS,
    CREATE_LICENSE, READ_LICENSE, VIEW_LICENSE_SUCCESS,
    FETCH_ADMIN_DATA,
    FETCH_ADMIN_DATA_SUCCESS,
    FETCH_USER_IMAGES,
    FETCH_USER_IMAGES_SUCCESS,
    APPROVE_USER,
    APPROVE_USER_SUCCESS,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGE_SUCCESS,
    SHOWLOADER,
    HIDE_LOADER, CREATE_LICENSE_SUCCESS,
    OPEN_MODAL,
    CLOSE_MODAL,
    DEACTIVATE_ACCOUNT,
    DEACTIVATED_ACCOUNT,
    DISPLAY_MESSAGES,
} from "./constants";

export function displayMessages (messages) {
  return {
      type: DISPLAY_MESSAGES,
      messages,
  }
}

export function showLoader() {
    return {
        type: SHOWLOADER,
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER,
    }
}

export function googleSignIn() {
    return {
        type: GOOGLE_SIGN
    }
}

export function facebookSignIn() {
    return {
        type: FACEBOOK_SIGN
    }
}

export function facebookSuccess(user) {
    return {
        type: FACEBOOKSUCCESS,
        user
    }
}

export function googleSuccess(user) {
    return {
        type: GOOGLESUCCESS,
        user,
    }
}

export function createLicense(obj, files) {
    return {
        type: CREATE_LICENSE,
        obj,
        files,
    }
}

export function createLicenseSuccess() {
    return {
        type: CREATE_LICENSE_SUCCESS,
    }
}

export function viewLicense() {
    return {
        type: READ_LICENSE,
    }
}

export function viewLicenseSuccess(data) {
    return {
        type: VIEW_LICENSE_SUCCESS,
        data
    }
}

export function fetchAdmin() {
    return {
        type: FETCH_ADMIN_DATA,
    }
}

export function fetchAdminDataSuccess(data) {
    return {
        type: FETCH_ADMIN_DATA_SUCCESS,
        data,
    }
}

export function approveUser(id) {
    return {
        type:  APPROVE_USER,
        id,
    }
}

export function approveUserSuccess(status) {
    return {
        type: APPROVE_USER_SUCCESS,
        status
    }
}

export function sendMessage(msg, id) {
    return {
        type: SEND_MESSAGE,
        msg,
        id
    }
}

export function receiveMessage(id) {
    return {
        type: RECEIVE_MESSAGE,
        id,
    }
}

export function receiveMessageSuccess(msg) {
    return {
        type: RECEIVE_MESSAGE_SUCCESS,
        msg
    }
}

export function openModal() {
    return {
        type: OPEN_MODAL
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    }
}

export function deactivateAccount(id) {
    return {
        type: DEACTIVATE_ACCOUNT,
        id
    }
}

export function deactivatedAccounts(accounts) {
    return {
        type: DEACTIVATED_ACCOUNT,
        accounts,
    }
}