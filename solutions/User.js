// User.js
// Single Responsibility Principle(SRP)
/**
 * @module User
 * @description Abstract class representing a generic user.
 */

/**
 * @abstract
 */
export class User {
    // Private fields (OOP - Encapsulation)
    #userID;
    #name;
    #age;
    #gender;
    #contactInfo;
  
    /**
     * Constructor
     * @param {string} userID - Unique user identifier
     * @param {string} name - User's name
     * @param {number} age - User's age
     * @param {string} gender - User's gender
     * @param {string} contactInfo - User's contact info
     */
    constructor(userID, name, age, gender, contactInfo) {
      if (new.target === User) {
        throw new Error("Cannot instantiate abstract class User directly.");
      }
    // OOP - Abstract class
      this.#userID = userID;
      this.#name = name;
      this.#age = age;
      this.#gender = gender;
      this.#contactInfo = contactInfo;
    }
  
    /** @return {string} User ID */
    get userID() {
      return this.#userID;
    }
  
    /** @return {string} User name */
    get name() {
      return this.#name;
    }
  
    /** @return {number} User age */
    get age() {
      return this.#age;
    }
  
    /** @return {string} User gender */
    get gender() {
      return this.#gender;
    }
  
    /** @return {string} User contact info */
    get contactInfo() {
      return this.#contactInfo;
    }
  
    /**
   * User login
   * @return {boolean}
   */
  login() {
    // Minimal example: just return true
    console.log(`User ${this.#userID} logged in.`);
    return true;
  }

  /**
   * User logout
   * @return {void}
   */
  logout() {
    console.log(`User ${this.#userID} logged out.`);
  }

  /**
   * Update user profile info
   * @param {ContactInfo} newInfo
   * @return {void}
   */
  updateProfile(newInfo) {
    this.#contactInfo = newInfo;
    console.log(`User ${this.#userID} profile updated.`);
  }

  /**
   * View user profile
   * @return {UserProfile}
   */
  viewProfile() {
    return {
      userID: this.#userID,
      name: this.#name,
      age: this.#age,
      gender: this.#gender,
      contactInfo: this.#contactInfo
    };
  }
}