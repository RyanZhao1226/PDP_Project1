// Doctor.js
// Open-Closed Principle(OCP)
import { User } from "./User.js";
import { Report } from "./Report.js";

/**
 * @module Doctor
 * @description Represents a doctor, extends User.
 */
export class Doctor extends User {
  #specialization;
  #licenseNumber;
  #department;
// OOP - Inheritance

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string} specialization - Doctor's specialization
   * @param {string} licenseNumber - Doctor's license number
   * @param {string} department - Doctor's department
   */
  constructor(userID, name, age, gender, contactInfo, specialization, licenseNumber, department) {
    super(userID, name, age, gender, contactInfo);
    this.#specialization = specialization;
    this.#licenseNumber = licenseNumber;
    this.#department = department;
  }
  // Liskov Substitution Principle(LSP)

  /** @return {string} Specialization */
  get specialization() {
    return this.#specialization;
  }

  /** @return {string} License number */
  get licenseNumber() {
    return this.#licenseNumber;
  }

  /** @return {string} Department */
  get department() {
    return this.#department;
  }

  /**
   * OOP - Polymorphism
   * @override
   * @return {boolean}
   */
  login() {
    console.log(
      `Doctor ${this.userID} (specialization: ${this.#specialization}) logged in.`
    );
    return super.login();
  }

   /**
   * View a patient's health records
   * @param {string} patientID
   * @return {import("./HealthData.js").HealthData[]}
   */
   viewPatientRecords(patientID) {
    console.log(`Doctor ${this.userID} is viewing records for patient ${patientID}.`);
    return [];
  }

    /**
     * Generate a health report for a patient
     * @param {string} patientID
     * @return {Report}
     */
    generateReport(patientID) {
      console.log(`Doctor ${this.userID} generating report for patient ${patientID}.`);
      const report = new Report("R001", "2025-01-01 ~ 2025-01-31", "Initial Summary", false);
      return report;
    }

    /**
     * Update a patient's health record
     * @param {string} patientID
     * @param {import("./HealthData.js").HealthData} data
     */
    updatePatientRecord(patientID, data) {
      console.log(`Doctor ${this.userID} updating record for patient ${patientID} with data:`, data);
    }

    // Interface Segregation Principle(ISP) - Doctor class does not implement recordWorkoutData()
}