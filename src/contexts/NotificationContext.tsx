import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from "react";

import {
  Alert,
  AlertColor,
  AlertTitle,
  Slide,
  Snackbar,
  SnackbarOrigin,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

type NotificationContextData = {
  showNotification: (props: NotificationProps) => void;
};

export interface NotificationProps {
  title?: string | ReactNode;
  message: string | ReactNode;
  type: AlertColor;
  anchorOrigin?: SnackbarOrigin;
}

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationContext = createContext({} as NotificationContextData);

const desktopAnchorOrigin: SnackbarOrigin = {
  horizontal: "right",
  vertical: "bottom"
};

const mobileAnchorOrigin: SnackbarOrigin = {
  horizontal: "center",
  vertical: "bottom"
};

function NotificationProvider({ children }: NotificationProviderProps) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [notificationProps, setNotificationProps] = useState<NotificationProps>(
    {
      message: "",
      title: "",
      type: "info",
      anchorOrigin: desktopAnchorOrigin
    }
  );

  const showNotification = useCallback(
    function showNotification({
      title,
      message,
      type,
      anchorOrigin
    }: NotificationProps) {
      if (anchorOrigin) {
        setNotificationProps({ title, message, type, anchorOrigin });
      } else {
        setNotificationProps({
          title,
          message,
          type,
          anchorOrigin: matches ? mobileAnchorOrigin : desktopAnchorOrigin
        });
      }

      setOpen(true);
    },
    [matches]
  );

  const NotificationProviderValue = useMemo(
    () => ({ showNotification }),
    [showNotification]
  );
  return (
    <NotificationContext.Provider value={NotificationProviderValue}>
      {children}

      <Snackbar
        open={open}
        TransitionComponent={Slide}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={notificationProps.anchorOrigin}
      >
        <Alert onClose={() => setOpen(false)} severity={notificationProps.type}>
          {notificationProps.title && (
            <AlertTitle>
              <Typography fontSize={16} fontWeight={500}>
                {notificationProps.title}
              </Typography>
            </AlertTitle>
          )}
          <Typography fontSize={14}>{notificationProps.message}</Typography>
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
