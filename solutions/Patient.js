// Patient.js
import { User } from "./User.js";

/**
 * @module Patient
 * @description Represents a patient, extends User.
 */
export class Patient extends User {
  #medicalHistory;
  #conditions;
  #medications;
  #healthRecords;

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string[]} medicalHistory - Patient's medical history
   * @param {string[]} conditions - Patient's conditions
   * @param {string[]} medications - Patient's medications
   * @param {string[]} healthRecords - Patient's health records
   */
  constructor(userID, name, age, gender, contactInfo, medicalHistory = [], conditions = [], medications = []) {
    super(userID, name, age, gender, contactInfo);
    this.#medicalHistory = medicalHistory;
    this.#conditions = conditions;
    this.#medications = medications;
    this.#healthRecords = [];
  }

  /** @return {string[]} Medical history */
  get medicalHistory() {
    return this.#medicalHistory;
  }

  /** @return {string[]} Conditions */
  get conditions() {
    return this.#conditions;
  }

  /** @return {string[]} Medications */
  get medications() {
    return this.#medications;
  }

  /**
   * Record additional medical history
   * @param {MedicalHistory} history
   */
  recordMedicalHistory(history) {
    // Merge or push new history
    this.#medicalHistory = { ...this.#medicalHistory, ...history };
    console.log(`Patient ${this.userID} medical history updated.`);
  }

  /**
   * Update conditions
   * @param {Condition[]} conditions
   */
  updateConditions(conditions) {
    this.#conditions = conditions;
    console.log(`Patient ${this.userID} conditions updated.`);
  }

  /**
   * Update medications
   * @param {Medication[]} meds
   */
  updateMedications(meds) {
    this.#medications = meds;
    console.log(`Patient ${this.userID} medications updated.`);
  }

  /**
   * View health records
   * @return {import("./HealthData.js").HealthData[]}
   */
  viewHealthRecords() {
    // Return all health data stored for this patient
    return this.#medicalHistory;
  }

  /**
   * Optionally, a method to add a new HealthData record
   * @param {import("./HealthData.js").HealthData} data
   */
  addHealthRecord(data) {
    this.#healthRecords.push(data);
    console.log(`New health record added for patient ${this.userID}`);
  }
}
