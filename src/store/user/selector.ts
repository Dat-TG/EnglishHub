import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { IUserInformationSelector, IUserProfileRes } from "../../types/user";

const getUserProfile = (state: AppState) => state.user.userProfile;

export const sGetUserInfo = createSelector(
  getUserProfile,
  (state: IUserProfileRes | null) =>
    state != null
      ? ({
          name: state.name,
          avatar: state.avatar,
          email: state.email,
          _id: state._id,
          type: state.type,
        } as IUserInformationSelector)
      : null
);
