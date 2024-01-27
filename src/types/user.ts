export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
}

export interface IUserLogin {
  googleAuthToken: string;
}

export interface IRegisterUserReq {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUserReq {
  email: string;
  password: string;
}

export interface IInformationUpdateReq {
  name: string;
  surname: string;
}

export interface IPasswordUpdateReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DataUserInfo {
  creationTime: Date;
  emailAddress: string;
  surname: string;
  name: string;
  isActive: boolean;
  userName: string;
  password?: string;
  confirmPassword?: string;
}

export interface DataUserId {
  id: number;
}

export interface IUsersRes {
  data: DataUser[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  size: number;
}

export type DataUser = IUserProfileRes;

export interface DataUserChecked {
  name: string;
  value: number;
  isChecked: boolean;
}

export interface DataUserTab {
  name: string;
  value: string;
}

export type DataUserName =
  | "name"
  | "id"
  | "emailAddress"
  | "isActive"
  | "password"
  | "confirmPassword"
  | "surname"
  | "userName";

export interface DataUserFilters {
  search: string;
}

export enum UserTabsEnum {
  USER_DETAILS = "1",
  USER_ROLES = "2",
}

export enum UserRolesEnum {
  CLIENT = 1,
  ADMIN = 2,
}

export enum UserSelectActive {
  ALL = "All",
  ACTIVE = "Active",
  NO_ACTIVE = "No Active",
}

export enum USER_ROLES_NAME {
  ADMIN = "Admin",
  CLIENT = "Client",
}

export interface UserRoles {
  id: UserRolesEnum;
  name: USER_ROLES_NAME;
}

export interface IUserProfileRes {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  avatar: string;
  type: string;
}

export interface IUserInformationSelector {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  type: string;
}

export interface IUserRole {
  id: number;
  name: USER_ROLES_NAME;
}

interface IFullPermissions {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

export interface IUserRolePermissions {
  authorization: IFullPermissions;
  upload_file: Omit<IFullPermissions, "update">;
}

export interface IUpdateUserRolePermissions {
  rolePermissions: IUserRolePermissions;
  name: string;
}

export interface IUpdateUserRole {
  userId: number;
  roleNames: USER_ROLES_NAME[];
}

export interface IResetPassword {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ILoginGoogle {
  accessToken: string;
  refreshToken: string;
}
