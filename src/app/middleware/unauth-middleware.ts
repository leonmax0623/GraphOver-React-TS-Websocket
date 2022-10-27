import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

const exludeEndpoint = ["getUserData", "flow", "getBookmarks"];

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 403) {
      if (!exludeEndpoint.includes(action.meta.arg.endpointName)) {
        // @ts-ignore
        localStorage.setItem("access_token", null);
        window.location.reload();
      }
    }

    return next(action);
  };
