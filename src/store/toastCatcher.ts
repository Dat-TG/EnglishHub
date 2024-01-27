import { IToastError } from "../types/common";
import toast from "../utils/toast";

export function withToastCatcher<Returned>(
  payloadCreator: () => Promise<Returned>,
  message?: string
) {
  return async () => {
    try {
      const res = await payloadCreator();
      message && toast.success(message);
      return res;
    } catch (err) {
      const error = err as IToastError;
      toast.error(`${error.detail.message}`);
      throw error;
    }
  };
}

export function withParamsToastCatcher<ThunkArg, Returned>(
  payloadCreator: (args1: ThunkArg) => Promise<Returned>,
  message?: string
) {
  return async (args2: ThunkArg) => {
    try {
      const res = await payloadCreator(args2);
      console.log("toast:", message);
      message && toast.success(message);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("err:", err.message);
      toast.error(`${err.message}`);
      throw err;
    }
  };
}
