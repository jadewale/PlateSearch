import {
    FETCH_USERS,
    LOGIN_USER,
    SIGN_UP,
    READ_LICENSE,
    VIEW_LICENSE_SUCCESS,
    FACEBOOKSUCCESS,
    FETCH_ADMIN_DATA_SUCCESS,
    FETCH_USER_IMAGES_SUCCESS, GOOGLESUCCESS,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGE_SUCCESS,
    SHOWLOADER,
    HIDE_LOADER,
    CREATE_LICENSE_SUCCESS,
    OPEN_MODAL,
    CLOSE_MODAL,
    DEACTIVATED_ACCOUNT,
    DISPLAY_MESSAGES,
    OPEN_CHAT
} from "./constants";

const initialState = {
    userProfile: {},
    allUsers: [],
    licenses: [],
    adminData: [],
    userImages: [],
    messages:[],
    refresh: false,
    userLicense: [],
    modal: false,
    deactivatedAcc: [],
    messageDisplay: [],
    chat: 'none',
    chatId: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return state;

        case FETCH_USERS:
            return state;

        case SIGN_UP:
            return state;

        case DEACTIVATED_ACCOUNT:
            return { ...state, deactivatedAcc: action.accounts };

        case GOOGLESUCCESS:
            return { ...state, userProfile: action.user };

        case FACEBOOKSUCCESS:
            return { ...state, userProfile: action.user };

        case VIEW_LICENSE_SUCCESS:
            return { ...state, licenses: action.data };

        case FETCH_ADMIN_DATA_SUCCESS:
            return { ...state, adminData: action.data };

        case FETCH_USER_IMAGES_SUCCESS:
            return { ...state, userImages: action.images };

        case RECEIVE_MESSAGE:
            return {...state, messages: []};

      case RECEIVE_MESSAGE_SUCCESS:
            return {...state, messages: [action.msg] };

        case SHOWLOADER:
            return {...state, refresh: true};

        case HIDE_LOADER:
            return {...state, refresh: false};

        case CREATE_LICENSE_SUCCESS:
            return {...state, userLicense: [...state.userLicense, 1]};

        case OPEN_MODAL:
            return {...state, modal:true };

        case CLOSE_MODAL:
            return {...state, modal:false };

      case DISPLAY_MESSAGES:
          return { ...state, messageDisplay: action.messages };

      case OPEN_CHAT:
          return { ...state, chat: action.chat, chatId: action.user}

        default:
            return state;
    }
}