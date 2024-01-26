import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  import { withParamsToastCatcher } from "../toastCatcher";
  import { userApi } from "../../api/axios";
  import {
    IRegisterUserReq,
    IInformationUpdateReq,
    IPasswordUpdateReq,
    IUpdateUserRole,
    ILoginGoogle,
    IUsersRes,
    IUserProfileRes,
    ILoginUserReq,
    IResetPassword,
  } from "../../types/user";
  import { removeAllToken } from "../../utils/token";
  import { IUserStore } from "./type";
import i18next from "i18next";
  
  export const loginUser = createAsyncThunk(
    "user/login",
    withParamsToastCatcher(async (params: ILoginUserReq) => {
      const result = await userApi.login(params);
      return result;
    }, i18next.t("global:loginSuccessfully"))
  );
  
  export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async () => {
      const result = await userApi.getUserProfile();
      return result;
    }
  );
  
  export const registerUser = createAsyncThunk(
    "user/register",
    withParamsToastCatcher(async (params: IRegisterUserReq) => {
      return await userApi.register(params);
    }, i18next.t("global:registerSuccessfully"))
  );
  
  export const logoutUser = createAsyncThunk("user/logout", async () => {
    const res = await userApi.logout();
    removeAllToken();
    return res;
  });
  
  export const updateInformationUser = createAsyncThunk(
    "user/editInformation",
    withParamsToastCatcher(async (informationUpdate: IInformationUpdateReq) => {
      const res = await userApi.updateInformation(informationUpdate);
      return res;
    }, i18next.t("global:updateInformationSuccessfully"))
  );
  
  export const updatePasswordUser = createAsyncThunk(
    "user/editPassword",
    withParamsToastCatcher(async (passwordUpdate: IPasswordUpdateReq) => {
      const res = await userApi.updatePassword(passwordUpdate);
      return res;
    }, i18next.t("global:changePasswordSuccessfully"))
  );
  
  export const getAllUsers = createAsyncThunk("user", async () => {
    const res = await userApi.getAll();
    return res;
  });
  
  export const updateUser = createAsyncThunk(
    "user/roles",
    withParamsToastCatcher(async (userRoles: IUpdateUserRole) => {
      await userApi.updateUserRole(userRoles);
    }, "Update user roles successfully")
  );
  
  export const updateAvatar = createAsyncThunk(
    "user/avatar",
    withParamsToastCatcher(async (avatar: File) => {
      await userApi.uploadAvatar(avatar);
    }, i18next.t("global:updateAvatarSuccessfully"))
  );
  
  export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    withParamsToastCatcher(async (emailAddress: string) => {
      await userApi.forgotPassword(emailAddress);
    }, i18next.t("global:pleaseCheckYourEmail"))
  );
  
  export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    withParamsToastCatcher(async (data: IResetPassword) => {
      await userApi.resetPassword(data);
    }, i18next.t("global:resetPasswordSuccessfully"))
  );
  
  export const extraReducers = (
    builders: ActionReducerMapBuilder<IUserStore>
  ) => {
    builders
      .addCase(
        registerUser.fulfilled,
        (_state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      )
      .addCase(logoutUser.fulfilled, () => {
        removeAllToken();
      })
      .addCase(
        getAllUsers.fulfilled,
        (state: IUserStore, action: PayloadAction<IUsersRes>) => {
          state.users = action.payload;
        }
      )
      .addCase(updateUser.fulfilled, () => {
        return;
      })
      .addCase(
        updateInformationUser.fulfilled,
        (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
          state.userProfile = action.payload;
          state.hasLoadedProfile = true;
        }
      )
      .addCase(forgotPassword.fulfilled, () => {})
      .addCase(resetPassword.fulfilled, () => {});
  };
  