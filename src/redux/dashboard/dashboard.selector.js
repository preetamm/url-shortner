import { createSelector } from "reselect";

const selectDashBoard = (state) => state.dashBoard;

export const selectUserShortlinks = createSelector(
  [selectDashBoard],
  (dashBoard) => dashBoard.userShortlinks
);
