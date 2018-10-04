/**
 * Data structure: Error message
 */
export interface ErrorMessage {

  /**
   * Appropriate icon - in Google Icon Font naming
   */
  icon: string;

  /**
   * Headline
   */
  headline: string;

  /**
   * Button name
   */
  button: string;

  /**
   * Need to refresh the application, if the user press the button.
   * * <code>true</code> Angular application will reloaded.
   * * <code>false</code> No reload.
   */
  reloadApplication: boolean;
}
