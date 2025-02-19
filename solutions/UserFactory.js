// UserFactory.js
/**
 * @module UserFactory
 * @description Factory class to create different types of User objects.
 */

import { FitnessEnthusiast } from "./FitnessEnthusiast.js";
import { Patient } from "./Patient.js";
import { Doctor } from "./Doctor.js";

/**
 * Demonstrates the Factory design pattern.
 * Creates user objects based on a type string.
 */
// Dependency Inversion Principle(DIP)
export class UserFactory {
  /**
   * Create a user object of the specified type.
   * @param {string} type - "fitness", "patient", or "doctor"
   * @param {object} options - An object containing constructor parameters
   * @return {FitnessEnthusiast | Patient | Doctor}
   */
  static createUser(type, options) {
    switch (type.toLowerCase()) {
      case "fitness":
        return new FitnessEnthusiast(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.workoutPreferences,
          options.fitnessGoals
        );

      case "patient":
        return new Patient(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.medicalHistory,
          options.conditions,
          options.medications
        );

      case "doctor":
        return new Doctor(
          options.userID,
          options.name,
          options.age,
          options.gender,
          options.contactInfo,
          options.specialization,
          options.licenseNumber,
          options.department
        );

      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}
