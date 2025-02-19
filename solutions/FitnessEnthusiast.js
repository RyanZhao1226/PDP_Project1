// FitnessEnthusiast.js
import { User } from "./User.js";

/**
 * @module FitnessEnthusiast
 * @description Represents a fitness enthusiast, extends User.
 */
export class FitnessEnthusiast extends User {
  #workoutPreferences;
  #fitnessGoals;

  /**
   * Constructor
   * @param {string} userID
   * @param {string} name
   * @param {number} age
   * @param {string} gender
   * @param {string} contactInfo
   * @param {string} workoutPreferences - User's workout preferences
   * @param {string} fitnessGoals - User's fitness goals
   */
  constructor(userID, name, age, gender, contactInfo, workoutPreferences, fitnessGoals) {
    super(userID, name, age, gender, contactInfo);
    this.#workoutPreferences = workoutPreferences;
    this.#fitnessGoals = fitnessGoals;
  }

  get workoutPreferences() {
    return this.#workoutPreferences;
  }

  get fitnessGoals() {
    return this.#fitnessGoals;
  }

  /**
   * @param {WorkoutPreferences} prefs
   */
  setWorkoutPreferences(prefs) {
    this.#workoutPreferences = prefs;
    console.log(`Workout preferences updated for user ${this.userID}`);
  }

  /**
   * Update fitness goals
   * @param {FitnessGoals} goals
   */
  updateFitnessGoals(goals) {
    this.#fitnessGoals = goals;
    console.log(`Fitness goals updated for user ${this.userID}`);
  }

  /**
   * Record new workout data
   * @param {import("./HealthData.js").HealthData} data
   */
  recordWorkoutData(data) {
    console.log(`User ${this.userID} recorded workout data:`, data);
  }
}
