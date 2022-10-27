import { SnackbarProvider } from 'notistack';

export const withSnackbar = component => () =>
  (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {component()}
    </SnackbarProvider>
  );
