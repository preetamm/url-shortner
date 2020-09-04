import { UserActionType } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionType.SET_CURRENT_USER,
  payload: user,
});

//register user  actions
export const registerNewUser = (userCredentials) => ({
  type: UserActionType.REGISTER_NEW_USER,
  payload: userCredentials,
});

export const registrationSucceeded = (user) => ({
  type: UserActionType.REGISTRATION_SUCCEEDED,
  payload: user,
});

export const registrationFailed = (message) => ({
  type: UserActionType.REGISTRATION_FAILED,
  payload: message,
});

export const registrationDone = () => ({
  type: UserActionType.REGISTRATION_DONE,
});

//google sign in  action

export const googleSignInStart = () => ({
  type: UserActionType.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccess = (user) => ({
  type: UserActionType.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInFailed = (message) => ({
  type: UserActionType.GOOGLE_SIGN_IN_SUCCESS,
  payload: message,
});

export const googleSignInDone = (message) => ({
  type: UserActionType.GOOGLE_SIGN_IN_SUCCESS,
  payload: message,
});

export const setUserIdToken = (idToken) => ({
  type: UserActionType.SET_USER_ID_TOKEN,
  payload: idToken,
});

//emailsignin action

export const emailSignInStart = (userCredential) => ({
  type: UserActionType.EMAIL_SIGN_IN_START,
  payload: userCredential,
});

export const emailSignInSuccess = (user) => ({
  type: UserActionType.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const emailSignInFailed = (message) => ({
  type: UserActionType.EMAIL_SIGN_IN_FAILED,
  payload: message,
});

//user session actipns

export const checkUserSession = () => ({
  type: UserActionType.CHECK_USER_SESSION,
});

//SIGN out user

export const signOutUser = () => ({
  type: UserActionType.SIGN_OUT_USER,
});

export const signOutUserSuccess = () => ({
  type: UserActionType.SIGN_OUT_SUCCESS,
});

export const signOutUserFailed = (message) => ({
  type: UserActionType.SIGN_OUT_FAILED,
  payload: message,
});

//SHOTLINK ACTIONS

export const addNewShortLink = (object) => ({
  type: UserActionType.ADD_NEW_SHORT_LINK,
  payload: object,
});

export const inValidLink = (message) => ({
  type: UserActionType.INVALID_LINK,
  payload: message,
});

//user profile actions

export const toggleProfileLoadingState = () => ({
  type: UserActionType.TOGGLE_PROFILE_LOADING_STATE,
});
