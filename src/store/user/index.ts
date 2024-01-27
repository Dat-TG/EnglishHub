import {
  IInformationUpdateReq,
  ILoginGoogle,
  ILoginUserReq,
  IPasswordUpdateReq,
  IRegisterUserReq,
  IResetPassword,
  IUserProfileRes,
} from "../../types/user";

import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { userApi } from "../../config/api/base-client";
import { withParamsToastCatcher } from "../toastCatcher";
import { removeAllToken } from "../../utils/token";
import { IUserStore } from "./type";
import { userReducer } from "./reducer";
import i18next from "../../translation/i18next";

const fullPermissions = {
  create: false,
  update: false,
  read: false,
  delete: false,
};

const initialState: IUserStore = {
  token: "",
  refreshToken: "",
  users: {
    data: [],
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 0,
    size: 10,
  },
  errorMessage: "",
  userProfile: null,
  userRoles: [],
  userRolePermissions: {
    authorization: { ...fullPermissions },
    upload_file: {
      read: false,
      create: false,
      delete: false,
    },
  },
  hasLoadedProfile: false,
  roleName: "",
};

const loginUser = createAsyncThunk(
  "user/login",
  withParamsToastCatcher(async (params: ILoginUserReq) => {
    const result = await userApi.login(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);
const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const result = await userApi.getUserProfile();
  return result;
});

const logoutUser = createAsyncThunk("user/logout", async () => {
  const res = await userApi.logout();
  removeAllToken();
  return res;
});

const registerUser = createAsyncThunk(
  "user/register",
  withParamsToastCatcher(async (params: IRegisterUserReq) => {
    return await userApi.register(params);
  }, i18next.t("global:registerSuccessfully"))
);

const updateInformationUser = createAsyncThunk(
  "user/editInformation",
  withParamsToastCatcher(async (informationUpdate: IInformationUpdateReq) => {
    const res = await userApi.updateInformation(informationUpdate);
    return res;
  }, i18next.t("global:updateInformationSuccessfully"))
);

const updatePasswordUser = createAsyncThunk(
  "user/editPassword",
  withParamsToastCatcher(async (passwordUpdate: IPasswordUpdateReq) => {
    const res = await userApi.updatePassword(passwordUpdate);
    return res;
  }, i18next.t("global:changePasswordSuccessfully"))
);

const updateAvatar = createAsyncThunk(
  "user/avatar",
  withParamsToastCatcher(async (avatar: File) => {
    return await userApi.uploadAvatar(avatar);
  }, i18next.t("global:updateAvatarSuccessfully"))
);

const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  withParamsToastCatcher(async (emailAddress: string) => {
    await userApi.forgotPassword(emailAddress);
  }, i18next.t("global:pleaseCheckYourEmail"))
);

const resetPassword = createAsyncThunk(
  "user/resetPassword",
  withParamsToastCatcher(async (data: IResetPassword) => {
    await userApi.resetPassword(data);
  }, i18next.t("global:resetPasswordSuccessfully"))
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
  extraReducers(builder: ActionReducerMapBuilder<IUserStore>) {
    builder.addCase(
      loginUser.fulfilled,
      (state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        console.log("user login, save token to local storage");
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    );
    builder.addCase(
      getUserProfile.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    );
    builder.addCase(logoutUser.fulfilled, () => {});
    builder.addCase(registerUser.fulfilled, () => {});
    builder.addCase(
      updateInformationUser.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    );
    builder.addCase(updatePasswordUser.fulfilled, () => {});
    builder.addCase(updateAvatar.fulfilled, () => {});
    builder.addCase(forgotPassword.fulfilled, () => {});
    builder.addCase(resetPassword.fulfilled, () => {});
  },
});
const { actions, reducer } = userSlice;
export const { setRoleName, setAvatar } = actions;
export default reducer;
