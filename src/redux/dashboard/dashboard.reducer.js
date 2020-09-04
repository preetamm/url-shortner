import { setServerErrorResponse, getUserShortlinks } from "./dashboard.action";
import { DashBoardActionType } from "./dashboard.type";
import {
  showLoaderOntheTargetlink,
  removeLoaderFromtheTargetlink,
  addNewLinkToState,
  removeTargetLinkFromState,
} from "./dashBoard.utils";

const INITIAL_STATE = {
  serverError: null,
  userShortlinks: null,
};

const dashBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DashBoardActionType.SET_SERVER_ERROR_REPONSE:
      return {
        ...state,
        serverError: action.payload,
      };

    case DashBoardActionType.GET_USER_SHORTLINK_SUCCCESS:
      return {
        ...state,
        userShortlinks: action.payload,
      };

    case DashBoardActionType.GET_USER_SHORTLINK_FAILED:
      return {
        ...state,
        userShortlinks: action.payload,
      };

    case DashBoardActionType.SHOW_LOADER_ON_TARGET_LINK:
      return {
        ...state,
        userShortlinks: showLoaderOntheTargetlink(
          state.userShortlinks,
          action.payload
        ),
      };

    case DashBoardActionType.DELETE_USER_SHORTLINK_SUCCESS:
      return {
        ...state,
        userShortlinks: action.payload,
      };

    case DashBoardActionType.DELETE_USER_SHORTLINK_FAILED:
      return {
        ...state,
        userShortlinks: action.payload,
      };

    case DashBoardActionType.REMOVE_LOADER_FROM_TARGET_LINK:
      return {
        ...state,
        userShortlinks: removeLoaderFromtheTargetlink(
          state.userShortlinks,
          action.payload
        ),
      };

    case DashBoardActionType.ADD_TARGET_SHORTLINK_TO_STATE:
      return {
        ...state,
        userShortlinks: addNewLinkToState(state.userShortlinks, action.payload),
      };

    case DashBoardActionType.REMOVE_TARGET_SHORTLINK_FROM_STATE:
      return {
        ...state,
        userShortlinks: removeTargetLinkFromState(
          state.userShortlinks,
          action.payload
        ),
      };

    default:
      return state;
  }
};

export default dashBoardReducer;
