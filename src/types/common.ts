
export interface IFulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

export interface IRequestParams {
  page?: number;
  size?: number;
  order?: SORT_ENUM;
  orderBy?: string;
  search?: string;
  subCategoryId?: number;
  isActive?: boolean;
}

export interface IActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export enum SORT_ENUM {
  asc = 'asc',
  desc = 'desc',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ISelectData {
  id: string | number;
  name: string;
  value: string;
}

export const DEFAULT_ALL = 0;

export interface IToastError {
  detail:{
    statusCode: number;
    message: string;
    error: string;
  };
}

export enum TOAST_TYPE {
  SUCCESS = 1,
  FAIL = 2,
}

export interface IResponseError {
  detail: string,
  path: string,
  timestamp: Date
}