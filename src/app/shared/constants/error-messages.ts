import {ErrorMessage} from '../entities/error-message.entity';

export const errorMessageCannotFindPage: ErrorMessage = {
  icon: 'error',
  headline: 'Cannot find this page.',
  button: 'Show me all countries',
  reloadApplication: false
};

export const errorMessageCannotFindCountry: ErrorMessage = {
  icon: 'flag',
  headline: 'Cannot find this country.',
  button: 'Show me all countries',
  reloadApplication: false
};

export const errorMessageCannotReachBackend: ErrorMessage = {
  icon: undefined,
  headline: 'Cannot reach backend.',
  button: 'Retry',
  reloadApplication: true
};
