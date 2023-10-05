import { useContext } from "react";

import { SnackbarOrigin } from "@mui/material";
import {
  NotificationContext,
  NotificationProps
} from "../contexts/NotificationContext";

type UseNotificationResult = (props: NotificationProps) => void


const mobileAnchorOrigin: SnackbarOrigin = {
  horizontal: "right",
  vertical: "bottom"
};

function useNotification(): UseNotificationResult {
  const { showNotification: showNotificationProvider } =
    useContext(NotificationContext);

  function showNotification({
    title,
    message,
    type,
    anchorOrigin
  }: NotificationProps) {
    showNotificationProvider({
      title,
      message,
      type,
      anchorOrigin: anchorOrigin || mobileAnchorOrigin
    });
  }

  return showNotification;
}

export default useNotification;
