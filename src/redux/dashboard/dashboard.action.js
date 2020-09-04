import { DashBoardActionType } from "./dashboard.type";

export const setServerErrorResponse = (message) => ({
  type: DashBoardActionType.SET_SERVER_ERROR_REPONSE,
  payload: message,
});

export const getUserShortlinks = (object) => ({
  type: DashBoardActionType.GET_USER_SHORTLINK,
  payload: object,
});

export const getUserShortlinksSuccess = (shortlinks) => ({
  type: DashBoardActionType.GET_USER_SHORTLINK_SUCCCESS,
  payload: shortlinks,
});

export const getUserShortlinksFailed = (message) => ({
  type: DashBoardActionType.GET_USER_SHORTLINK_FAILED,
  payload: message,
});

export const deleteUserShortlinks = (key) => ({
  type: DashBoardActionType.DELETE_USER_SHORTLINK,
  payload: key,
});

export const showLoaderOnTargetlink = (key) => ({
  type: DashBoardActionType.SHOW_LOADER_ON_TARGET_LINK,
  payload: key,
});

export const deleteUserShortlinkSuccess = (message) => ({
  type: DashBoardActionType.DELETE_USER_SHORTLINK_SUCCESS,
  payload: message,
});

export const deleteUserShortlinkFailed = (message) => ({
  type: DashBoardActionType.DELETE_USER_SHORTLINK_FAILED,
  payload: message,
});

export const removeLoaderFromTargetLink = (key) => ({
  type: DashBoardActionType.REMOVE_LOADER_FROM_TARGET_LINK,
  payload: key,
});

export const addUserShortlinkTOstate = (link) => ({
  type: DashBoardActionType.ADD_TARGET_SHORTLINK_TO_STATE,
  payload: link,
});

export const removeUserShortlinkFromState = (link) => ({
  type: DashBoardActionType.REMOVE_TARGET_SHORTLINK_FROM_STATE,
  payload: link,
});
