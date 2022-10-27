import compose from 'compose-function';
import { withRouter } from './with-router';
import { withSnackbar } from './with-snackbar';
import { withRedux } from './with-redux';

export const withProviders = compose(withRouter, withSnackbar, withRedux);
