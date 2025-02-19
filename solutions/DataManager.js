// DataManager.js
/**
 * @module DataManager
 * @description A singleton class to manage and store different entities in memory (Users, HealthData, Reports, etc.).
 */

import { User } from "./User.js";
import { HealthData } from "./HealthData.js";
import { Report } from "./Report.js";
import { HealthReminder } from "./HealthReminder.js";
import { HealthAdvice } from "./HealthAdvice.js";

/**
 * Demonstrates the Singleton design pattern for data management.
 */
export class DataManager {
  // Private static field to hold the single instance
  static #instance = null;

  // Private fields for storing entities
  #users;
  #healthDataRecords;
  #reports;
  #reminders;
  #advices;

  /**
   * Private constructor to prevent direct instantiation.
   */
  constructor() {
    if (DataManager.#instance) {
      throw new Error("Use DataManager.getInstance() to get the singleton instance.");
    }
    this.#users = new Map();
    this.#healthDataRecords = new Map();
    this.#reports = new Map();
    this.#reminders = new Map();
    this.#advices = new Map();
  }

  /**
   * Retrieve the single instance of DataManager.
   * @return {DataManager}
   */
  static getInstance() {
    if (!DataManager.#instance) {
      DataManager.#instance = new DataManager();
    }
    return DataManager.#instance;
  }

  /**
   * Add a user to the system.
   * @param {User} user
   */
  addUser(user) {
    this.#users.set(user.userID, user);
  }

  /**
   * Get a user by userID.
   * @param {string} userID
   * @return {User | undefined}
   */
  getUser(userID) {
    return this.#users.get(userID);
  }

  /**
   * Add a HealthData record.
   * @param {HealthData} data
   */
  addHealthData(data) {
    this.#healthDataRecords.set(data.dataID, data);
  }

  /**
   * Get a HealthData record by dataID.
   * @param {string} dataID
   * @return {HealthData | undefined}
   */
  getHealthData(dataID) {
    return this.#healthDataRecords.get(dataID);
  }

  /**
   * Add a Report.
   * @param {Report} report
   */
  addReport(report) {
    this.#reports.set(report.reportID, report);
  }

  /**
   * Get a Report by reportID.
   * @param {string} reportID
   * @return {Report | undefined}
   */
  getReport(reportID) {
    return this.#reports.get(reportID);
  }

  /**
   * Add a HealthReminder.
   * @param {HealthReminder} reminder
   */
  addReminder(reminder) {
    this.#reminders.set(reminder.reminderID, reminder);
  }

  /**
   * Get a HealthReminder by reminderID.
   * @param {string} reminderID
   * @return {HealthReminder | undefined}
   */
  getReminder(reminderID) {
    return this.#reminders.get(reminderID);
  }

  /**
   * Add a HealthAdvice.
   * @param {HealthAdvice} advice
   */
  addAdvice(advice) {
    this.#advices.set(advice.adviceID, advice);
  }

  /**
   * Get a HealthAdvice by adviceID.
   * @param {string} adviceID
   * @return {HealthAdvice | undefined}
   */
  getAdvice(adviceID) {
    return this.#advices.get(adviceID);
  }
}
