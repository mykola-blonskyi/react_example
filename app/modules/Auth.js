class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static setUser(first_name, last_name) {
    localStorage.setItem('full_name', `${first_name} ${last_name}`);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserLoggedIn() {
    return localStorage.getItem('full_name') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static logoutUser() {
    localStorage.removeItem('full_name');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getFullName() {
    return localStorage.getItem('full_name');
  }
}

export default Auth;
