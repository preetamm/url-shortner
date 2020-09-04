import { UserActionType } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  registrationStatus: null,
  googleSignInStatus: null,
  emailSignInStatus: null,
  invalidLink: null,
  isUserProfileLoading: true,
  idToken: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionType.REGISTRATION_SUCCEEDED:
      return {
        ...state,
        currentUser: action.payload,
        registrationStatus: action.payload,
      };
    case UserActionType.REGISTRATION_FAILED:
      return {
        ...state,
        registrationStatus: action.payload,
      };
    case UserActionType.REGISTRATION_DONE:
      return {
        ...state,
        registrationStatus: null,
      };
    case UserActionType.GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        googleSignInStatus: "success",
      };

    case UserActionType.GOOGLE_SIGN_IN_FAILED:
      return {
        ...state,
        googleSignInStatus: "failed",
      };

    case UserActionType.GOOGLE_SIGN_IN_DONE:
      return {
        ...state,
        googleSignInStatus: null,
      };
    case UserActionType.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionType.EMAIL_SIGN_IN_FAILED:
      return {
        ...state,
        emailSignInStatus: "failed",
      };

    case UserActionType.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };

    case UserActionType.SIGN_OUT_FAILED:
      return {
        ...state,
        emailSignInStatus: "failed",
      };

    case UserActionType.INVALID_LINK:
      return {
        ...state,
        invalidLink: action.payload,
      };

    case UserActionType.SET_USER_ID_TOKEN:
      return {
        ...state,
        idToken: action.payload,
      };

    case UserActionType.TOGGLE_PROFILE_LOADING_STATE:
      return {
        ...state,
        isUserProfileLoading: !state.isUserProfileLoading,
      };

    default:
      return state;
  }
};

export default userReducer;
