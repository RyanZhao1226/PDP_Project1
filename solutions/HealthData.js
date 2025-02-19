// HealthData.js
/**
 * @module HealthData
 * @description Represents a health data record.
 */
export class HealthData {
    #dataID;
    #date;
    #weight;
    #bloodPressure;
    #heartRate;
    #exercise;
    #sleep;
    #remarks;
  
    /**
     * Constructor
     * @param {string} dataID - Unique identifier for the health data record
     * @param {Date} date - Date of the record
     * @param {number} weight - User's weight
     * @param {string} bloodPressure - Blood pressure (e.g., "120/80")
     * @param {number} heartRate - Heart rate
     * @param {string} exercise - Exercise info
     * @param {number} sleep - Sleep duration (hours)
     * @param {string} remarks - Additional notes
     */
    constructor(dataID, date, weight, bloodPressure, heartRate, exercise, sleep, remarks = "") {
      this.#dataID = dataID;
      this.#date = date;
      this.#weight = weight;
      this.#bloodPressure = bloodPressure;
      this.#heartRate = heartRate;
      this.#exercise = exercise;
      this.#sleep = sleep;
      this.#remarks = remarks;
    }
  
    /** @return {string} Health data record ID */
    get dataID() {
      return this.#dataID;
    }
  
    /** @return {Date} Date of the record */
    get date() {
      return this.#date;
    }
  
    /** @return {number} Weight */
    get weight() {
      return this.#weight;
    }
  
    /** @return {string} Blood pressure */
    get bloodPressure() {
      return this.#bloodPressure;
    }
  
    /** @return {number} Heart rate */
    get heartRate() {
      return this.#heartRate;
    }
  
    /** @return {string} Exercise info */
    get exercise() {
      return this.#exercise;
    }
  
    /** @return {number} Sleep duration (hours) */
    get sleep() {
      return this.#sleep;
    }
  
    /** @return {string} Additional remarks */
    get remarks() {
      return this.#remarks;
    }

    set remarks(newRemarks) {
      this.#remarks = newRemarks;
    }

     /**
     * Validate data
     * @return {boolean}
     */
    validateData() {
      console.log(`Validating HealthData: ${this.#dataID}`);
      return true;
    }

    /**
     * Update data fields from another HealthData object
     * @param {HealthData} newData
     */
    updateData(newData) {
      this.#weight = newData.weight;
      this.#bloodPressure = newData.bloodPressure;
      this.#heartRate = newData.heartRate;
      this.#exercise = newData.exercise;
      this.#sleep = newData.sleep;
      this.#remarks = newData.remarks;
      console.log(`HealthData ${this.#dataID} updated.`);
    }

    /**
     * Generate a trend analysis
     * @return {TrendAnalysis}
     */
    getTrendAnalysis() {
      console.log(`Generating trend analysis for ${this.#dataID}`);
      return {
        trendGraph: null,
        analysisText: "No real analysis - placeholder."
      };
    }
}
  