import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser,
  mSignOutUser,
} from "../firebase/firebase.utils";
import { UserActionType } from "./user/user.types";
import { DashBoardActionType } from "./dashboard/dashboard.type";
import urlExists from "url-exists";
import axios from "axios";
import { message } from "antd";
//registration actions
import {
  registrationSucceeded,
  registrationFailed,
  registrationDone,
} from "./user/user.sction";

//google signin actions
import {
  googleSignInStart,
  googleSignInSuccess,
  googleSignInFailed,
  setUserIdToken,
} from "./user/user.sction";
// email signin actions
import {
  emailSignInStart,
  emailSignInSuccess,
  emailSignInFailed,
  toggleProfileLoadingState,
} from "./user/user.sction";

//singout
import { signOutUserFailed, signOutUserSuccess } from "./user/user.sction";

//server error
import { setServerErrorResponse } from "./dashboard/dashboard.action";

//shorlink actions

import { inValidLink } from "./user/user.sction";

import {
  getUserShortlinksSuccess,
  getUserShortlinksFailed,
  removeLoaderFromTargetLink,
  addUserShortlinkTOstate,
  removeUserShortlinkFromState,
} from "./dashboard/dashboard.action";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* registerNewUser(action) {
  try {
    yield call(signUpWithEmailAndPassword, action);
    yield put(registrationSucceeded("success"));
    yield delay(2000);
    yield put(registrationDone());
  } catch (e) {
    yield put(registrationFailed("failed"));
    yield delay(2000);
    yield put(registrationDone());
  }
}

export function* signInWithGoogle(action) {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
    const idToken = yield auth.currentUser.getIdToken(true);
    yield put(setUserIdToken(idToken));
    yield put(toggleProfileLoadingState());
  } catch (error) {
    yield put(googleSignInFailed(error.message));
  }
}

export function* signInWithEmail(action) {
  const {
    payload: { email, password },
  } = action;

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
    const idToken = yield auth.currentUser.getIdToken(true);
    yield put(setUserIdToken(idToken));
    yield put(toggleProfileLoadingState());
  } catch (error) {
    put(emailSignInFailed(error.message));
  }
}

export function* isUserAunthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) {
      throw Error("user no authenticated");
    }
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    const idToken = yield auth.currentUser.getIdToken(true);
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
    yield put(setUserIdToken(idToken));
    yield put(toggleProfileLoadingState());
  } catch (error) {
    yield put(emailSignInFailed(error.message));
  }
}

export function* signOutUser() {
  try {
    yield mSignOutUser();
    yield put(signOutUserSuccess());
  } catch (error) {
    yield put(signOutUserFailed(error.message));
  }
}

export function* addNewShortlink(action) {
  try {
    const newLink = yield call(mAddNewLink, action.payload);

    if (newLink) {
      message.success("Added New link Successfully");

      yield put(addUserShortlinkTOstate(newLink));
      yield put(inValidLink(false));
    }
  } catch (e) {
    if (e.message == "bad request") {
      yield put(inValidLink(true));
      yield delay(2000);
      yield put(inValidLink(false));
    } else if (e.message == "server not responding") {
      //put a newtwork issue  action

      message.error("Somethiing went wrong! try again");
      yield put(setServerErrorResponse("Something went wrong"));
    }
  }
}

export function* getUserShortlinks(action) {
  const { payload } = action;
  try {
    const shortlinks = yield call(getShortlinks, action.payload);

    shortlinks.map((el) => {
      el["isSpinning"] = false;
    });

    yield put(getUserShortlinksSuccess(shortlinks));
  } catch (e) {
    yield put(getUserShortlinksFailed("error"));
  }
}

export function* deleteUserShortlinks(action) {
  try {
    const link = yield call(deleteLinks, action.payload);
    yield put(removeLoaderFromTargetLink(action.payload.shortlink));
    message.success("Deleted link successfully");
    yield put(removeUserShortlinkFromState(link));
  } catch (e) {
    message.error("something error occured");
  }
}

export function* _signInGoogle() {
  yield takeEvery(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* _registerUser() {
  yield takeEvery(UserActionType.REGISTER_NEW_USER, registerNewUser);
}

export function* _signInEmail() {
  yield takeEvery(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* _checkUserSession() {
  yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAunthenticated);
}

export function* _signOutUser() {
  yield takeLatest(UserActionType.SIGN_OUT_USER, signOutUser);
}

//dashborad actionss

export function* _addNewShortLink() {
  yield takeLatest(UserActionType.ADD_NEW_SHORT_LINK, addNewShortlink);
}

export function* _getUserShortlinks() {
  yield takeLatest(DashBoardActionType.GET_USER_SHORTLINK, getUserShortlinks);
}

export function* _deleteUserShortLinks() {
  yield takeLatest(
    DashBoardActionType.DELETE_USER_SHORTLINK,
    deleteUserShortlinks
  );
}

function* mySaga() {
  yield all([
    _signInGoogle(),
    _registerUser(),
    _signInEmail(),
    _signOutUser(),
    _addNewShortLink(),
    _checkUserSession(),
    _getUserShortlinks(),
    _deleteUserShortLinks(),
  ]);
}

const mcheckurl = async (url) => {
  var exist = "";
  try {
    await urlExists(url, (e, exists) => {
      exist = exists;
    });
  } catch (e) {
    throw Error(e.message);
  }
};

async function getShortlinks(idToken) {
  try {
    const result = await axios({
      method: "get",
      url: "  http://1f81131346a9.ngrok.io/user",
      headers: {
        Authorization: idToken,
      },
    });

    return result.data.shortlinks;
  } catch (e) {
    if (e.response) {
      throw Error("bad request");
    } else if (e.request) {
      throw Error("server not responding");
    } else {
      throw Error(e.message);
    }
  }
}

async function mAddNewLink(payload) {
  var data = {
    targetUrl: payload.link,
  };

  /*  var headers = {
          "Content-Type" : 'application/json',
          "Authorization" : "Bearer" + await GetAccessToken()
      }
      */

  try {
    const result = await axios({
      method: "post",
      url: "http://1f81131346a9.ngrok.io/user",
      data: {
        url: data.targetUrl,
      },
      headers: {
        Authorization: payload.idToken,
      },
    });

    if (result) {
      var shortLink = Object.keys(result.data)[0];
      var originalLink = result.data[shortLink];
      // console.log({shortLink, originalLink});
      return {
        shortLink: shortLink,
        originalLink: originalLink,
        isSpinning: false,
      };
    }
  } catch (e) {
    if (e.response) {
      throw Error("bad request");
    } else if (e.request) {
      throw Error("server not responding");
    } else {
      throw Error(e.message);
    }
  }
}

async function deleteLinks(payload) {
  try {
    const result = await axios({
      method: "post",
      url: "http://1f81131346a9.ngrok.io/user/delete ",
      data: {
        shortLink: payload.shortlink,
      },
      headers: {
        Authorization: payload.idToken,
      },
    });

    return payload.shortlink;
  } catch (e) {
    throw Error(e.message);
  }
}

async function signUpWithEmailAndPassword(action) {
  const { email, password, confirmPassword, displayName } = action.payload;

  if (password !== confirmPassword) {
    alert("password dont match");
    return;
  } else {
    if (password.length) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDocument(user, { displayName });
      } catch (error) {
        throw error.message;
      }
    } else {
      throw Error("password should be greater then 6");
    }
  }
}

export default mySaga;
