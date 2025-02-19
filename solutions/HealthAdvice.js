// HealthAdvice.js
/**
 * @module HealthAdvice
 * @description Represents a health advice item.
 */
export class HealthAdvice {
    #adviceID;
    #category;
    #content;
  
    /**
     * Constructor
     * @param {string} adviceID - Unique identifier for the advice
     * @param {string} category - Advice category
     * @param {string} content - Advice content
     */
    constructor(adviceID, category, content) {
      this.#adviceID = adviceID;
      this.#category = category;
      this.#content = content;
    }
  
    /** @return {string} Advice ID */
    get adviceID() {
      return this.#adviceID;
    }
  
    /** @return {string} Advice category */
    get category() {
      return this.#category;
    }
  
    /** @return {string} Advice content */
    get content() {
      return this.#content;
    }

    /**
     * Generate advice based on user health data
     * @param {HealthData} userData
     * @return {string}
     */
    generateAdvice(userData) {
      console.log(`Generating advice for dataID ${userData.dataID}`);
      return `Advice for user data ${userData.dataID}: Keep a balanced diet and regular exercise.`;
    }

    /**
     * Update advice content
     * @param {string} newContent
     */
    updateAdvice(newContent) {
      this.#content = newContent;
      console.log(`Advice ${this.#adviceID} updated.`);
    }

    /**
     * Display advice
     */
    displayAdvice() {
      console.log(`Advice [${this.#adviceID} - ${this.#category}]: ${this.#content}`);
    }
}
  