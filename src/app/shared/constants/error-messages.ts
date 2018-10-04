import {ErrorMessage} from '../entities/error-message.entity';

/**
 * Cannot find page - error message
 *
 * use case:
 * * wrong link
 *
 * displayed in {@link ErrorMessageComponent}
 */
export const errorMessageCannotFindPage: ErrorMessage = {
  icon: 'error',
  headline: 'Cannot find this page.',
  button: 'Show me all countries',
  reloadApplication: false
};

/**
 * Cannot find country - error message
 *
 * use case:
 * * wrong link to country
 *
 * displayed in {@link ErrorMessageComponent}
 */
export const errorMessageCannotFindCountry: ErrorMessage = {
  icon: 'flag',
  headline: 'Cannot find this country.',
  button: 'Show me all countries',
  reloadApplication: false
};

/**
 * Cannot reach backend - error message
 *
 * use cases:
 * * user is offline
 * * issues at backend service
 *
 * displayed in {@link ErrorMessageComponent}
 */
export const errorMessageCannotReachBackend: ErrorMessage = {
  icon: undefined,
  headline: 'Cannot reach backend.',
  button: 'Retry',
  reloadApplication: true
};
