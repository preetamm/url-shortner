import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const SelectRegistration = createSelector(
  [selectUser],
  (user) => user.registrationStatus
);

export const SelectInvalidLink = createSelector(
  [selectUser],
  (user) => user.invalidLink
);

export const SelectIdToken = createSelector(
  [selectUser],
  (user) => user.idToken
);

export const SelectUserProfileLoadingState = createSelector(
  [selectUser],
  (user) => user.isUserProfileLoading
);
